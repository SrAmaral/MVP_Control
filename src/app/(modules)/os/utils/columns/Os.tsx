import { Client, OS, User } from "@prisma/client";
import {
  CaretSortIcon,
  InfoCircledIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";

interface CompleteOs extends OS {
  client: Client;
  users: User[];
}

interface columnOsProps {
  erase?: (id: string) => void;
  edit?: (id: string) => void;
  info?: (id: string) => void;
}

function ColumnOs({
  erase,
  edit,
  info,
}: columnOsProps = {}): ColumnDef<CompleteOs>[] {
  const columns: ColumnDef<CompleteOs>[] = [
    {
      accessorKey: "scheduleDate",
      header: () => <div>Data Agendada</div>,
      cell: ({ row }) => (
        <div className="text-left">
          {new Date(row.getValue("scheduleDate")).toLocaleDateString()}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: () => <div>Descrição</div>,
      cell: ({ row }) => (
        <div className="text-left">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "realizedDate",
      header: () => <div>Data Realizada</div>,
      cell: ({ row }) => (
        <div className="text-left">
          {row.getValue("realizedDate")
            ? new Date(row.getValue("realizedDate")).toLocaleDateString()
            : "Pendente"}
        </div>
      ),
    },
    {
      accessorKey: "deadline",
      header: () => <div>Prazo</div>,
      cell: ({ row }) => (
        <div className="text-left">
          {new Date(row.getValue("deadline"))
            ? new Date(row.getValue("deadline")).toLocaleDateString()
            : "Pendente"}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: () => <div>Status</div>,
      cell: ({ row }) => (
        <div className="text-left">
          {row.getValue("status") || "Não Definido"}
        </div>
      ),
    },
    {
      accessorKey: "client",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Cliente
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-left">{row.original?.client?.fantasyName}</div>
      ),
    },
    {
      accessorKey: "users",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Funcionários
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-left">
          {row.original?.users
            .map((user) => `${user.firstName} ${user.lastName}`)
            .join(", ")}
        </div>
      ),
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

export default ColumnOs;
