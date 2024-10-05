"use client";
import { useParams } from "next/navigation";
import ClientsFormCreate from "~/components/Clients/form";
import { api } from "~/core/trpc/callers/react";

export default function Page() {
  const { clientId } = useParams();

  const { data: client } = api.clients.listClientById.useQuery(
    clientId as string,
  );

  return (
    <>
      <ClientsFormCreate client={client} />
    </>
  );
}
