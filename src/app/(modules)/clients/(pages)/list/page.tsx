"use client";
import { DataTable } from "~/components/ui/dataTable";
import { api } from "~/core/trpc/callers/react";
import ColumnClient from "../../utils/columns/Client";
import { use, useEffect, useState } from "react";
import GenericConfirmDialog from "~/components/genericConfirmDialog";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const clients = api.clients.listClient.useQuery();
  const erase = api.clients.deleteClient.useMutation();
  const [open, setOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const router = useRouter();

  const handleErase = async () => {
    if (selectedClientId) {
      await erase.mutate(selectedClientId);
      await clients.refetch();
      setOpen(false);
    }
  };

  return (
    <>
      <GenericConfirmDialog
        open={open}
        setOpen={setOpen}
        title={"Excluir cliente"}
        description={"Tem certeza que deseja excluir o cliente?"}
        textConfirm={"Excluir"}
        onCancel={() => {
          setOpen(false);
        }}
        onConfirm={handleErase}
      />
      <DataTable
        columns={ColumnClient({
          erase: (id) => {
            setSelectedClientId(id);
            setOpen(true);
          },
          edit: (id) => {
            router.push(`/clients/list/${id}`);
          },
        })}
        data={clients.data || []}
        loading={clients.isLoading}
        redirecyCreate={"/clients/create"}
      />
    </>
  );
}
