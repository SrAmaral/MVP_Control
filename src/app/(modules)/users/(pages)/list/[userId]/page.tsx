"use client";
import { useParams } from "next/navigation";
import UsersFormCreate from "~/components/Users/form";
import { api } from "~/core/trpc/callers/react";

export default function Page() {
  const { userId } = useParams();

  const { data: user } = api.users.listUserById.useQuery(userId as string);

  return (
    <>
      <UsersFormCreate user={user} />
    </>
  );
}
