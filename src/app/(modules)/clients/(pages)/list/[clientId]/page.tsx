"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import ClientsFormCreate from "~/components/Clients/form";
import LoadingSpinner from "~/components/ui/loading";
import { api } from "~/core/trpc/callers/react";
import { useToast } from "~/hooks/use-toast";
import { type ClientType } from "../../../module/types";

export default function Page() {
  const { clientId } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const {
    data: client,
    isLoading,
    isError,
  } = api.clients.listClientById.useQuery(clientId as string);

  useEffect(() => {
    if (!isLoading && (isError || !client)) {
      toast({
        title: "Cliente não encontrado ou não existe",
        variant: "error",
      });

      router.push("/clients/list");
    }
  }, [isLoading, isError, client, toast, router]);

  if (isLoading) {
    return <LoadingSpinner className="h-[calc(100vh-70px)]" />;
  }

  return <ClientsFormCreate client={client as ClientType} />;
}
