"use client" 
import { DataTable } from "~/components/ui/dataTable";
import { api } from "~/core/trpc/callers/react"; 
import ColumnClient from "../../utils/columns/Client";
import { useState } from "react";
import GenericConfirmDialog from "~/components/genericConfirmDialog";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";

export default function Page() {
  const clients = api.clients.listClient.useQuery();
  const [open, setOpen] = useState(false);
  const router =  useRouter()

    return (<>
    <GenericConfirmDialog 
      open={open} 
      setOpen={setOpen} 
      title={"Ecluir cliente"} 
      description={"Tem certeza que deseja excluir o cliente?"} 
      textConfirm={"Excluir"}  />
      <DataTable columns={ColumnClient({erase: (id) => {
          setOpen(true);
        }, 
        edit: (id) => {
          router.push(`/clients/list/${id}`)
            
        },
      })
      } data={clients.data ?? []} loading={clients.isLoading} />
      </>
    );
  }