"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { ServiceReportView } from "~/components/Os/service-report-view";
import LoadingSpinner from "~/components/ui/loading";
import { api } from "~/core/trpc/callers/react";
import { useToast } from "~/hooks/use-toast";

export default function Page() {
  const { osId } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const {
    data: os,
    isLoading,
    isError,
  } = api.os.listOsById.useQuery(osId as string);

  useEffect(() => {
    if (!isLoading && (isError || !os)) {
      toast({
        title: "OS não encontrada ou não existe",
        variant: "error",
      });

      router.push("/os/list");
    }
  }, [isLoading, isError, os, toast, router]);

  if (isLoading) {
    return <LoadingSpinner className="h-[calc(100vh-70px)]" />;
  }

  const inNewApprove = os?.approverName === "" && os.signatureImage === "";

  return <ServiceReportView os={os} isNewApprove={inNewApprove} />;
}
