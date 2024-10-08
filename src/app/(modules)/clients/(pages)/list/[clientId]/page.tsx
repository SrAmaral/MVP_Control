"use client";
import { useParams, useRouter } from "next/navigation";
import ClientsFormCreate from "~/components/Clients/form";
import { api } from "~/core/trpc/callers/react";
import { ClientType } from "../../../module/types";
import LoadingSpinner from "~/components/ui/loading";
import { useToast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";

export default function Page() {
  const { clientId } = useParams();
  const { toast } = useToast()
  const { data: client, isLoading, isError } = api.clients.listClientById.useQuery(clientId as string);
  const router =  useRouter()


  if (isError) {
    toast({
      title: "Cliente não encontrado ou não existe",
      variant: "error",
    });

    router.push("/clients/list");
  }

  if (isLoading) {
    return <LoadingSpinner className="h-[calc(100vh-70px)]" />;
  }

  return (
  <ClientsFormCreate client={client as ClientType} />
  );
}
