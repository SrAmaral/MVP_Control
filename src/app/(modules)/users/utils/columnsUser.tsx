"use client";
import { User } from "@prisma/client";
import { CaretSortIcon, InfoCircledIcon, Pencil1Icon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";

function ColumnUser(): ColumnDef<User>[] {
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "Ações",
      enableHiding: true,
      header: () => (
        <div className="text-center">Ações</div>
      ),
      cell: ({ row }) => (
        <div className="flex justify-between space-x-2">
          <TrashIcon className="h-5 w-5 cursor-pointer" onClick={() => {}} />
          <Pencil1Icon className="h-5 w-5 cursor-pointer" onClick={() => {}} />
          <Pencil2Icon className="h-5 w-5 cursor-pointer" onClick={() => {}} />
          <InfoCircledIcon className="h-5 w-5 cursor-pointer" onClick={() => {}} />
        </div>
      ),
    },
  ];

  return columns;
}

export default ColumnUser;