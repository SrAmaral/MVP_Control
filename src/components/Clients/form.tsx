"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  InfoIcon,
  MapPinnedIcon,
  PhoneCallIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { withMask } from "use-mask-input";
import { type z } from "zod";
import {
  clientSchema,
  type ClientType,
  type CNPJRequestType,
} from "~/app/(modules)/clients/module/types";
import { api } from "~/core/trpc/callers/react";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useToast } from "~/hooks/use-toast";
import FormFieldBase from "../ui/form-field";
import LoadingSpinner from "../ui/loading";

type UpdateClientFormProps = {
  client?: ClientType;
};

export default function ClientsFormCreate({ client }: UpdateClientFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      id: client?.id ?? "",
      contacts: [
        {
          name: "",
          email: "",
          phoneNumber: "",
        },
      ],
    },
  });

  const cnpjWatch = form.watch("cnpj");
  const [findingCNPJ, setFindingCNPJ] = useState("");

  const contacts = form.watch("contacts");

  useEffect(() => {
    if (client !== undefined) {
      form.reset(client);
    }
  }, [form, client]);

  useEffect(() => {
    if (cnpjWatch?.replace(/\D/g, "").length === 14 && !client?.id) {
      setFindingCNPJ("Buscando CNPJ...");
      fetch(
        `https://api-publica.speedio.com.br/buscarcnpj?cnpj=${cnpjWatch.replace(/\D/g, "")}`,
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data: CNPJRequestType) => {
          if (Object.keys(data).length !== 1) {
            setFindingCNPJ("");
            form.setValue("fantasyName", data["NOME FANTASIA"]);
            form.setValue("companyName", data["RAZAO SOCIAL"]);
            form.setValue("cnaeCode", data["CNAE PRINCIPAL CODIGO"]);
            form.setValue("cnaeDescription", data["CNAE PRINCIPAL DESCRICAO"]);
            form.setValue("openedData", data["DATA ABERTURA"]);
            form.setValue("clientAddress.streetType", data["TIPO LOGRADOURO"]);
            form.setValue("clientAddress.street", data.LOGRADOURO);
            form.setValue("clientAddress.number", data.NUMERO);
            form.setValue("clientAddress.complement", data.COMPLEMENTO);
            form.setValue("clientAddress.neighborhood", data.BAIRRO);
            form.setValue("clientAddress.city", data.MUNICIPIO);
            form.setValue("clientAddress.state", data.UF);
            form.setValue("clientAddress.zipCode", data.CEP);
            form.setValue(
              "contactNumber",
              `(${data.DDD}) ${data.TELEFONE.slice(0, 4)}-${data.TELEFONE.slice(4)}`,
            );
            form.setValue("contactEmail", data.EMAIL);
          } else {
            setFindingCNPJ("CNPJ não encontrado na base do governo!");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setFindingCNPJ("");
    }
  }, [cnpjWatch, form]);

  const createClient = api.clients.createClient.useMutation();
  const updateClient = api.clients.updateClient.useMutation();
  function onSubmit(values: z.infer<typeof clientSchema>) {
    setLoading(true);
    if (client !== undefined) {
      updateClient.mutate(values, {
        onSuccess: () => {
          toast({
            title: "Cliente atualizado com sucesso!",
            variant: "success",
          });
        },
        onError: (error) => {
          toast({
            title: "Erro ao atualizar cliente!",
            variant: "error",
          });
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    } else {
      createClient.mutate(values, {
        onSuccess: () => {
          toast({
            title: "Cliente criado com sucesso!",
            variant: "success",
          });
        },
        onError: (error) => {
          toast({
            title: "Erro ao criar cliente!",
            variant: "error",
          });
        },
        onSettled: () => {
          setLoading(false);
        },
      });
    }
  }

  useEffect(() => {
    if (Object.keys(form.formState.errors).length !== 0) {
      console.group("Form Errors");
      console.log(form.formState.errors);
      console.groupEnd();
    }
  }, [form.formState.errors]);

  return (
    <div className="p-10">
      {!loading ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="companyInfos" className="">
              <TabsList className="flex flex-col space-y-2 rounded-md bg-gray-100 p-2 md:flex-row md:space-x-4 md:space-y-0">
                <TabsTrigger
                  value="companyInfos"
                  className="flex items-center justify-center md:justify-start"
                >
                  <InfoIcon className="mr-2 h-4 w-4" />
                  Informações da Empresa
                </TabsTrigger>
                <TabsTrigger
                  value="address"
                  className="flex items-center justify-center md:justify-start"
                >
                  <MapPinnedIcon className="mr-2 h-4 w-4" />
                  Endereço
                </TabsTrigger>
                <TabsTrigger
                  value="contacts"
                  className="flex items-center justify-center md:justify-start"
                >
                  <PhoneCallIcon className="mr-2 h-4 w-4" />
                  Contatos
                </TabsTrigger>
              </TabsList>

              <TabsContent value="companyInfos">
                <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-12">
                  <div className="col-span-6 grid">
                    <FormField
                      control={form.control}
                      name="cnpj"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CNPJ</FormLabel>
                          <FormControl ref={withMask("99.999.999/9999-99")}>
                            <Input placeholder="CNPJ" {...field} />
                          </FormControl>
                          <FormDescription
                            className={`text-sm ${
                              findingCNPJ === "CNPJ encontrado!"
                                ? "text-green-600"
                                : findingCNPJ ===
                                    "CNPJ não encontrado na base do governo!"
                                  ? "text-red-600"
                                  : null
                            }`}
                          >
                            {findingCNPJ}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-6" />
                  <div className="col-span-6 grid">
                    <FormFieldBase
                      label="Nome Fantasia"
                      formControl={form.control}
                      name="fantasyName"
                      placeholder="Nome Fantasia"
                    />
                  </div>
                  <div className="col-span-6 grid">
                    <FormFieldBase
                      label="Nome da Empresa"
                      formControl={form.control}
                      name="companyName"
                      placeholder="Nome da Empresa"
                    />
                  </div>
                  <div className="col-span-6 grid">
                    <FormFieldBase
                      label="CNAE Codigo"
                      formControl={form.control}
                      name="cnaeCode"
                      placeholder="CNAE Codigo"
                      formControlRef={withMask("99999-9/99")}
                    />
                  </div>
                  <div className="col-span-6 grid">
                    <FormFieldBase
                      label="CNAE Descrição"
                      formControl={form.control}
                      name="cnaeDescription"
                      placeholder="CNAE Descrição"
                    />
                  </div>
                  <div className="col-span-6 grid">
                    <FormFieldBase
                      label="Número para Contato"
                      formControl={form.control}
                      name="contactNumber"
                      placeholder="Número para Contato"
                      formControlRef={withMask("(99) 99999-9999")}
                    />
                  </div>
                  <div className="col-span-6 grid">
                    <FormFieldBase
                      label="Email para Contato"
                      formControl={form.control}
                      name="contactEmail"
                      placeholder="Email para Contato"
                    />
                  </div>
                  <div className="col-span-6 grid">
                    <FormFieldBase
                      label="Data de Abertura"
                      formControl={form.control}
                      name="openedData"
                      placeholder="Data de Abertura"
                      formControlRef={withMask("99/99/9999")}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="address">
                <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-12">
                  <div className="col-span-2 grid">
                    <FormFieldBase
                      label="Tipo de Longradouro"
                      formControl={form.control}
                      name="clientAddress.streetType"
                      placeholder="Tipo de Longradouro"
                    />
                  </div>
                  <div className="col-span-10 grid">
                    <FormFieldBase
                      label="Longradouro"
                      formControl={form.control}
                      name="clientAddress.street"
                      placeholder="Longradouro"
                    />
                  </div>
                  <div className="col-span-2 grid">
                    <FormFieldBase
                      label="Numero"
                      formControl={form.control}
                      name="clientAddress.number"
                      placeholder="Numero"
                    />
                  </div>
                  <div className="col-span-5 grid">
                    <FormFieldBase
                      label="Complemento"
                      formControl={form.control}
                      name="clientAddress.complement"
                      placeholder="Complemento"
                    />
                  </div>
                  <div className="col-span-5 grid">
                    <FormFieldBase
                      label="Bairro"
                      formControl={form.control}
                      name="clientAddress.neighborhood"
                      placeholder="Bairro"
                    />
                  </div>
                  <div className="col-span-4 grid">
                    <FormFieldBase
                      label="Cidade"
                      formControl={form.control}
                      name="clientAddress.city"
                      placeholder="Cidade"
                    />
                  </div>
                  <div className="col-span-4 grid">
                    <FormFieldBase
                      label="Estado"
                      formControl={form.control}
                      name="clientAddress.state"
                      placeholder="Estado"
                    />
                  </div>
                  <div className="col-span-4 grid">
                    <FormFieldBase
                      label="CEP"
                      formControl={form.control}
                      name="clientAddress.zipCode"
                      placeholder="Número"
                      formControlRef={withMask("99999-999")}
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="contacts">
                <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-12">
                  {contacts?.map(
                    (contact: (typeof contacts)[0], index: number) => (
                      <div
                        key={`contact-${index}`}
                        className="col-span-12 grid grid-cols-12 gap-x-5 gap-y-6"
                      >
                        <div
                          className="col-span-4 grid"
                          key={`contact-name-${index}`}
                        >
                          <FormFieldBase
                            label="Nome"
                            formControl={form.control}
                            name={`contacts.${index}.name`}
                            placeholder="Nome"
                          />
                        </div>
                        <div
                          className="col-span-4 grid"
                          key={`contact-email-${index}`}
                        >
                          <FormFieldBase
                            label="Email"
                            formControl={form.control}
                            name={`contacts.${index}.email`}
                            placeholder="Email"
                          />
                        </div>
                        <div
                          className="col-span-3 grid"
                          key={`contact-phone-${index}`}
                        >
                          <FormFieldBase
                            label="Telefone"
                            formControl={form.control}
                            name={`contacts.${index}.phoneNumber`}
                            placeholder="Telefone"
                            formControlRef={withMask("(99) 99999-9999")}
                          />
                        </div>
                        <Button
                          type="button"
                          className="col-span-1 mt-8 min-w-[52px]"
                          variant="destructive"
                          key={`contact-remove-${index}`}
                          onClick={() => {
                            const newContacts = [...form.watch("contacts")];
                            newContacts.splice(index, 1);
                            form.setValue("contacts", newContacts);
                          }}
                        >
                          <TrashIcon className="h-10 w-10" />
                        </Button>
                      </div>
                    ),
                  )}

                  <Button
                    type="button"
                    className="col-span-3 mt-10 gap-3"
                    variant="outline"
                    onClick={() => {
                      const newContacts = [
                        ...form.watch("contacts"),
                        {
                          id: form.watch("contacts").length.toString(),
                          name: "",
                          email: "",
                          phoneNumber: "",
                          logicalDeleted: false,
                        },
                      ];
                      form.setValue("contacts", newContacts);
                    }}
                  >
                    <PlusIcon />
                    Adicionar Contato
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
            <Button type="submit" className="mt-10">
              Salvar
            </Button>
          </form>
        </Form>
      ) : (
        <div className="flex h-[calc(100vh-300px)] items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
