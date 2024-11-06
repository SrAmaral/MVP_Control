"use client";

import { DataTable } from "~/components/ui/dataTable";
import { api } from "~/core/trpc/callers/react";
import ColumnOs from "../../utils/columns/Os";
import GenericConfirmDialog from "~/components/genericConfirmDialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "~/hooks/use-toast";

export default function Page() {
  const os = api.os.listOs.useQuery();
  const erase = api.os.deleteOs.useMutation();
  const [open, setOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleErase = async () => {
    if (selectedClientId) {
      erase.mutate(selectedClientId);
      await os.refetch().then(() => {
        setOpen(false);
        toast({
          title: "OS excluída com sucesso",
          variant: "success",
        });
      });
    }
  };

  return (
    <>
      <GenericConfirmDialog
        open={open}
        setOpen={setOpen}
        title={"Excluir OS"}
        description={"Tem certeza que deseja excluir a OS?"}
        textConfirm={"Excluir"}
        onCancel={() => {
          setOpen(false);
        }}
        onConfirm={handleErase}
      />

      <DataTable
        data={os.data ?? []}
        loading={os.isLoading}
        columns={ColumnOs({
          erase: (id) => {
            setSelectedClientId(id);
            setOpen(true);
          },
          edit: (id) => {
            router.push(`/os/list/${id}`);
          },
        })}
        redirecyCreate={"/os/create"}
      />
    </>
  );
}
