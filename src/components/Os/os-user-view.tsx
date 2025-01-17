import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import {
  osSchema,
  type OSType,
} from "~/app/(loggedArea)/(modules)/os/module/types";
import { api } from "~/core/trpc/callers/react";
import { useToast } from "~/hooks/use-toast";
import { formatDate } from "~/lib/utils";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import UploadedFileComponent from "../ui/uploadedFiles";
import UploadFilesComponent from "../ui/uploadFiles";
import AddressComponent from "./address-details";

type OsUserViewProps = {
  os?: OSType;
};

export const OsUserView = ({ os }: OsUserViewProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [filesList, setFilesList] = useState<FileList | null>(null);
  const form = useForm<z.infer<typeof osSchema>>({
    resolver: zodResolver(osSchema),
    defaultValues: {},
  });

  useEffect(() => {
    form.setValue("status", "pendingApproval");
    form.setValue("realizedDate", new Date().toISOString());
  });

  const updateOs = api.os.updateOs.useMutation();
  function onSubmit(values: OSType) {
    updateOs.mutate(values, {
      onSuccess: () => {
        toast({
          title: "OS atualizado com sucesso!",
          variant: "success",
        });
      },
      onError: (error) => {
        toast({
          title: "Erro ao atualizar OS!",
          variant: "error",
        });
      },
      onSettled: () => {
        setLoading(false);
        router.push("/os/list");
      },
    });
  }
  useEffect(() => {
    form.reset(os);
  }, [os, form]);

  const principalContact = os?.client.contacts.find(
    (contact) => contact.id === os.principalContact,
  );
  return (
    <div className="p-[70px]">
      <div className="mb-10 flex flex-row justify-between">
        <div className="flex flex-col">
          <Image
            src="/logo_marca.png"
            width={200}
            height={100}
            alt="Logo Marca da empresa"
          />
          <span className="text-1 font-extralight">Endereço da empresa</span>
          <span className="text-1 font-extralight">Colocado aqui</span>
        </div>
        <div className="mt-5 flex flex-col">
          <span className="flexmb-4 mb-4 self-end text-2xl font-bold">
            Ordem de Serviço
          </span>
          <div className="flex w-[300px] justify-between">
            <span className="text-1 font-semibold">Data programada</span>
            <span className="text-1 font-extralight">
              {!!os?.scheduleDate
                ? formatDate(os?.scheduleDate)
                : "Não informado"}
            </span>
          </div>
          <div className="flex w-[300px] justify-between">
            <span className="text-1 font-semibold">Data Limite</span>
            <span className="text-1 font-extralight">
              {!!os?.scheduleDate ? formatDate(os?.deadline) : "Não informado"}
            </span>
          </div>
          <div className="flex w-[300px] justify-between">
            <span className="text-1 font-semibold">OS ID#</span>
            <span className="text-1 font-extralight">{os?.id}</span>
          </div>
        </div>
      </div>
      <Separator />
      <div className="mb-10 mt-10 w-[450px]">
        <span className="text-2xl font-bold">Dados do cliente</span>
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex justify-between gap-5">
            <span className="text-1 font-semibold">Nome Fantasia</span>
            <span className="text-1 font-light">
              {os?.client.fantasyName && os.client.fantasyName.length > 0
                ? os?.client.fantasyName
                : os?.client.companyName}
            </span>
          </div>
          <div className="flex justify-between gap-5">
            <span className="text-1 font-semibold">Endereço</span>
            <span className="text-1 font-light">
              {os?.client?.clientAddress ? (
                <AddressComponent address={os.client.clientAddress} />
              ) : (
                <span>Endereço não informado</span>
              )}
            </span>
          </div>
          <div className="flex justify-between gap-5">
            <span className="text-1 font-semibold">Contato</span>
            <span className="text-1 font-light">
              {principalContact?.name} - {principalContact?.email} -{" "}
              {principalContact?.phoneNumber}
            </span>
          </div>
        </div>
      </div>
      <Separator />
      <div className="mb-10 mt-10 w-[450px]">
        <span className="text-2xl font-bold">Descrição do Serviço</span>
        <p className="mt-5">{os?.description}</p>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-7 flex flex-col"
        >
          <span className="mb-10 text-2xl font-bold">Relatorio do Serviço</span>
          <div className="col-span-12 grid">
            <Label className="mb-4">Descrição do serviço prestado</Label>
            <Textarea
              placeholder="Digite o que foi feito no serviço aqui!!"
              className="h-40"
              value={form.watch("serviceDescription")}
              onChange={(event) => {
                form.setValue("serviceDescription", event.target.value);
              }}
            />
          </div>
          <UploadFilesComponent
            filesList={filesList}
            setFilesList={setFilesList}
            getFormValue={form.getValues}
            setFormValue={(name, value) =>
              form.setValue(
                name as keyof z.infer<typeof osSchema>,
                value as keyof z.infer<typeof osSchema>,
              )
            }
            anyData={os ?? {}}
          />
          <UploadedFileComponent
            files={form.getValues("files") ?? []}
            filesList={filesList}
            setFilesList={setFilesList}
            getFormValue={form.getValues}
            setFormValue={(name, value) =>
              form.setValue(
                name as keyof z.infer<typeof osSchema>,
                value as keyof z.infer<typeof osSchema>,
              )
            }
          />
          <Button
            type="button"
            onClick={() => onSubmit(form.getValues())}
            className="mt-10 w-[100px] bg-green-500"
          >
            Salvar OS
          </Button>
        </form>
      </Form>
    </div>
  );
};
