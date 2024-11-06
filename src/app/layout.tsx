import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { Toaster } from "~/components/ui/toaster";
import { TRPCReactProvider } from "~/core/trpc/callers/react";
import AdminPanelLayout from "../components/ui/admin-panel-layout";
import { ThemeProvider } from "./ui/providers/theme-provider";

export const metadata: Metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Toaster />
        <TRPCReactProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AdminPanelLayout>{children}</AdminPanelLayout>
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
