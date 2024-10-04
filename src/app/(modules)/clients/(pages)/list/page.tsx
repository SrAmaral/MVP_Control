 
import { DataTable } from "~/components/ui/dataTable";
import { api } from "~/core/trpc/callers/react"; 
import ColumnClient from "../../utils/columns/Client";

export default function Page() {
  const users = api.clients.listClient.useQuery();
 

    return (
      <DataTable columns={ColumnClient()} data={users.data ?? []} loading={users.isLoading} />
    );
  }