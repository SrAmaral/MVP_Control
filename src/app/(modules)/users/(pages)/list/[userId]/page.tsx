"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingSpinner from "~/components/ui/loading";
import UsersFormCreate from "~/components/Users/form";
import { api } from "~/core/trpc/callers/react";
import { useToast } from "~/hooks/use-toast";
import { type CreateUserData } from "../../../module/types";

export default function Page() {
  const { userId } = useParams();
  const router = useRouter();
  const { toast } = useToast();

  const {
    data: user,
    isLoading,
    isError,
  } = api.users.listUserById.useQuery(userId as string, {
    staleTime: 0,
  } );

  useEffect(() => {
    if (!isLoading && (isError || !user)) {
      toast({
        title: "Usuário não encontrado ou não existe",
        variant: "error",
      });

      router.push("/users/list");
    }
  }, [isLoading, isError, user, toast, router]);

  if (isLoading) {
    return <LoadingSpinner className="h-[calc(100vh-70px)]" />;
  }

  return (
    <>
      <UsersFormCreate user={user as CreateUserData} />
    </>
  );
}
