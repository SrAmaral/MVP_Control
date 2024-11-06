"use client";

import { type Role, type User } from "@prisma/client";
import {
  CaretSortIcon,
  InfoCircledIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { type ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
interface UserWithRole extends User {
  role: Role;
}

interface columnUserProps {
  erase?: (id: string) => void;
  edit?: (id: string) => void;
  info?: (id: string) => void;
}

function ColumnUser({
  erase,
  edit,
  info,
}: columnUserProps = {}): ColumnDef<User>[] {
  const columns: ColumnDef<UserWithRole>[] = [
    {
      accessorKey: "firstName",
      header: () => <div>Nome</div>,
      cell: ({ row }) => {
        const firstName = row.getValue("firstName") ?? "";
        const lastName = row
          .getAllCells()
          .some((cell) => cell.column.id === "lastName")
          ? (row.getValue("lastName") ?? "")
          : ""; // Se não existir, retorna uma string vazia

        const name = firstName + " " + lastName;
        return <div>{name}</div>;
      },
    },
    {
      accessorKey: "role",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="text-left"
        >
          Cargo
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const role = row.original.role?.name ?? " - ";
        return <div className="flex items-center">{role}</div>;
      },
    },

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
      accessorKey: "contactNumber",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Telefone
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue("contactNumber") || " - "}
        </div>
      ),
    },
    {
      accessorKey: "Ações",
      enableHiding: true,
      header: () => <div className="text-center">Ações</div>,
      cell: ({ row }) => (
        <div className="flex justify-between space-x-2">
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

  return columns as ColumnDef<User>[];
}

export default ColumnUser;
