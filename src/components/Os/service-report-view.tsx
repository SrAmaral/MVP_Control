import { zodResolver } from "@hookform/resolvers/zod";
import { PanelsTopLeft } from "lucide-react";
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
import { formatDate, resolveOsStatus } from "~/lib/utils";
import GenericConfirmDialog from "../genericConfirmDialog";
import { Button } from "../ui/button";
import { Form } from "../ui/form";
import FormFieldBase from "../ui/form-field";
import { Separator } from "../ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import UploadedFileComponent from "../ui/uploadedFiles";
import AddressComponent from "./address-details";
import Signature from "./signature";

type OsUserViewProps = {
  os?: OSType;
  isNewApprove?: boolean;
};

export const ServiceReportView = ({ os, isNewApprove }: OsUserViewProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [approverName, setApproverName] = useState<string | null>(null);
  const [filesList, setFilesList] = useState<FileList | null>(null);
  const form = useForm<z.infer<typeof osSchema>>({
    resolver: zodResolver(osSchema),
    defaultValues: {
      approverDate: new Date().toISOString(),
    },
  });

  useEffect(() => {
    form.setValue("approverDate", new Date().toISOString());
  });

  useEffect(() => {
    form.setValue("signatureImage", signature ?? "");
  }, [signature, form]);

  useEffect(() => {
    form.setValue("status", status);
  }, [status, form]);

  const updateOs = api.os.updateOs.useMutation();
  function onSubmit(values: OSType) {
    setOpen(false);
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
      <GenericConfirmDialog
        open={open}
        setOpen={setOpen}
        title={`${status == "approved" ? "Aprovar" : "Reprovar"} OS`}
        description={`Tem certeza que deseja ${status == "approved" ? "Aprovar" : "Reprovar"} esta ordem de serviço?`}
        textConfirm={status == "approved" ? "Aprovar" : "Reprovar"}
        onCancel={() => {
          setOpen(false);
        }}
        onConfirm={() => onSubmit(form.getValues())}
        buttonConfirmStyle={
          status == "approved" ? "bg-green-500" : "bg-red-500"
        }
      />
      <div className="mb-10 flex flex-row justify-between">
        <div className="flex flex-col">
          <PanelsTopLeft className="mb-4 mr-1 h-12 w-12" />
          <span className="mb-4 text-2xl font-extrabold">Zeld Brasil LTDA</span>
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
          <div className="flex w-[300px] justify-between">
            <span className="text-1 font-semibold">Status da OS</span>
            <span className="text-1 font-extralight">
              {resolveOsStatus(os?.status ?? "")}
            </span>
          </div>
        </div>
      </div>
      <Separator />
      <div className="mb-10 mt-10 w-[450px]">
        <span className="text-2xl font-bold">Dados do cliente</span>
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex justify-between gap-5">
            <span className="text-1 font-semibold">Nome Fantasia</span>
            <span className="text-1 font-light">{os?.client.fantasyName}</span>
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
              {" "}
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
        <div className="mt-10 flex justify-between">
          <span className="text-2xl font-bold">Relatorio do Serviço</span>
          <span>Data de realização: {formatDate(os?.realizedDate ?? "")}</span>
        </div>
        <div className="col-span-12 grid">
          <p className="mb-5 mt-5">{os?.serviceDescription}</p>
          <Separator />
          <div className="mb-5">
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
          </div>
        </div>
        <Separator className="mt-10" />
        <div className="mt-10">
          <div className="flex justify-between">
            {}
            <span className="text-2xl font-bold">
              {isNewApprove ? "Aprovar Serviço" : "Dados da aprovação"}
            </span>
            <span>
              Data de aprovação:{" "}
              {formatDate(
                isNewApprove
                  ? new Date().toISOString()
                  : (form.getValues("approverDate") ?? ""),
              )}
            </span>
          </div>

          {isNewApprove ? (
            <>
              <div className="mt-10">
                <FormFieldBase
                  label="Nome completo do assinante"
                  formControl={form.control}
                  name="approverName"
                  placeholder="Insira o nome completo do assinante"
                  classNameInput="w-[300px]"
                />
              </div>
              <Signature
                width={500}
                height={150}
                setSignature={setSignature}
                clasName="mt-10"
              />
            </>
          ) : (
            <div className="mt-20">
              <div className="flex flex-row gap-5">
                <span className="text-1 font-semibold">
                  Nome completo do assiante:
                </span>
                <p className="text-1 font-light">
                  {form.getValues("approverName")}
                </p>
              </div>
              <Image
                src={form.watch("signatureImage") ?? ""}
                alt="Assinatura"
                width={500}
                height={300}
              />
              <Separator className="mb-3 w-[500px] bg-black" />
              <h2>Assinatura do assinante</h2>
            </div>
          )}

          {isNewApprove && (
            <div className="flex justify-end gap-10">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      disabled={
                        (form.watch("approverName") ?? "").length < 1 ||
                        (form.watch("signatureImage") ?? "").length < 1
                      }
                      onClick={() => {
                        setStatus("approved");
                        setOpen(true);
                      }}
                      className="mt-10 w-[100px] bg-green-500"
                    >
                      Aprovar OS
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Para aprovar é necessario preencher o nome completo e
                      gerar a assinatura
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      type="button"
                      disabled={
                        (form.watch("approverName") ?? "").length < 1 ||
                        (form.watch("signatureImage") ?? "").length < 1
                      }
                      onClick={() => {
                        setStatus("repproved");
                        setOpen(true);
                      }}
                      className="mt-10 w-[100px] bg-red-500"
                    >
                      Reprovar OS
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      Para reprovar é necessario preencher o nome completo e
                      gerar a assinatura
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </Form>
    </div>
  );
};
