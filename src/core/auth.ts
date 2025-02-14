import bcrypt from "bcrypt";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { usersService } from "~/app/(loggedArea)/(modules)/users/module/service";
import { db } from "./db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string | null;
      // ...other properties
      // role: UserRole;
    }
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: async ({ session, token }) => {
      const userId = token.sub ?? "";
      const userData = await usersService.listUserById(userId, db);
      if (session?.user) {
        session.user.id = token.sub ?? "";
        session.user.name = userData?.firstName ?? "";
        session.user.email = userData?.email ?? "";
        session.user.role = userData?.role?.name ?? "";
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const user = await usersService.checkCredentials(credentials.email, db);
        if (!user?.password) {
          return null;
        }
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (passwordMatch) {
          return { ...user };
        }
        
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  }
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
