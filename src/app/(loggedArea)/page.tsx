import { getServerAuthSession } from "~/core/auth";
import { HydrateClient } from "~/core/trpc/callers/server";
export default async function Home() {
  const session = await getServerAuthSession();
  return (
    <HydrateClient>
      <main className="">{JSON.stringify(session)}</main>
    </HydrateClient>
  );
}
