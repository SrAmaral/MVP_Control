"use client";

import { DataTable } from "~/components/ui/dataTable";
import { api } from "~/core/trpc/callers/react";
import ColumnUser from "../../utils/columns/User";
import { useRouter } from "next/navigation";

export default function Page() {
  const users = api.users.listUsers.useQuery();
  const router = useRouter();

  return (
    <DataTable
      columns={ColumnUser({
        edit: (id) => {
          router.push(`/users/list/${id}`, {

          });
        },
      })}
      data={users.data ?? []}
      loading={users.isLoading}
      redirecyCreate="/users/create"
    />
  );
}
