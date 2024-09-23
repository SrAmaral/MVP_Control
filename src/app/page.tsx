import { api, HydrateClient } from "~/core/trpc/callers/server";
export default async function Home() {
  const users = await api.users.listUsers();
  return (
    <HydrateClient>
      <main className="">
        {JSON.stringify(users)}
      </main>
    </HydrateClient>
  );
}
