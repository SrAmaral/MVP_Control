"use client";

import { type Client } from "@prisma/client";
import {
  CaretSortIcon,
  InfoCircledIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";

interface columnUserProps {
  erase?: (id: string) => void;
  edit?: (id: string) => void;
  info?: (id: string) => void;
}

function ColumnClient({
  erase,
  edit,
  info,
}: columnUserProps = {}): ColumnDef<Client>[] {
  const columns: ColumnDef<Client>[] = [
    {
      accessorKey: "companyName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Nome da Empresa
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-left">{row.getValue("companyName")}</div>
      ),
    },
    {
      accessorKey: "cnpj",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          CNPJ
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => <div className="text-left">{row.original.cnpj}</div>,
    },
    {
      accessorKey: "Ações",
      enableHiding: true,
      header: () => <div className="text-left">Ações</div>,
      cell: ({ row }) => (
        <div className="flex justify-start space-x-2">
          {erase && (
            <TrashIcon
              className="h-5 w-5 cursor-pointer"
              onClick={() => erase?.(row.original.id)}
            />
          )}
          {edit && (
            <Pencil2Icon
              className="h-5 w-5 cursor-pointer"
              onClick={() => edit?.(row.original.id)}
            />
          )}
          {info && (
            <InfoCircledIcon
              className="h-5 w-5 cursor-pointer"
              onClick={() => info?.(row.original.id)}
            />
          )}
        </div>
      ),
    },
  ];

  return columns;
}

export default ColumnClient;
