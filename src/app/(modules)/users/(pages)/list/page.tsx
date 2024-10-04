"use client";

import { DataTable } from "~/components/ui/dataTable";
import { api } from "~/core/trpc/callers/react";
import ColumnUser from "../../utils/columns/User";

export default function Page() {
  const users = api.users.listUsers.useQuery();
 

    return (
      <DataTable columns={ColumnUser()} data={users.data ?? []} loading={users.isLoading} />
    );
  }