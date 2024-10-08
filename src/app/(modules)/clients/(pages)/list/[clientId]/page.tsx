"use client";
import { useParams, useRouter } from "next/navigation";
import ClientsFormCreate from "~/components/Clients/form";
import { api } from "~/core/trpc/callers/react";
import { ClientType } from "../../../module/types";
import LoadingSpinner from "~/components/ui/loading";
import { useToast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import { use, useEffect } from "react";

export default function Page() {
  const { clientId } = useParams();
  const { toast } = useToast()
  const { data: client, isLoading, isError, error  } = api.clients.listClientById.useQuery("dsdsadas");
  const router =  useRouter()

  useEffect(() => {
    if (!client || isError) {
      toast({
        title: "Cliente não encontrado ou não existe",
        variant: "error",
      });
  
      router.push("/clients/list");
    }
  }, [isError, client]);

  if (isLoading) {
    return <LoadingSpinner className="h-[calc(100vh-70px)]" />;
  }

  return (
  <ClientsFormCreate client={client as ClientType} />
  );
}
