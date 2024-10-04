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

export default function ClientsFormCreate() {
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      cnpj: "",
      fantasyName: "",
      companyName: "",
      cnaeCode: "",
      cnaeDescription: "",
      contactNumber: "",
      contactEmail: "",
      openedData: "",
      clientAddress: {
        streetType: "",
        street: "",
        number: "",
        complement: "",
        neighborhood: "",
        city: "",
        state: "",
        zipCode: "",
      },
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
    if (cnpjWatch.replace(/\D/g, "").length === 14) {
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
            setFindingCNPJ("CNPJ encontrado!");
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

  function onSubmit(values: z.infer<typeof clientSchema>) {
    createClient.mutate(values);
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="companyInfos" className="">
            <TabsList>
              <TabsTrigger value="companyInfos">
                <InfoIcon className="mr-2 h-4 w-4" />
                Informações da Empresa
              </TabsTrigger>
              <TabsTrigger value="address">
                <MapPinnedIcon className="mr-2 h-4 w-4" /> Endereço
              </TabsTrigger>
              <TabsTrigger value="contacts">
                <PhoneCallIcon className="mr-2 h-4 w-4" /> Contatos
              </TabsTrigger>
            </TabsList>
            <TabsContent value="companyInfos">
              <div className="mt-10 grid grid-cols-12 gap-x-5 gap-y-6">
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
                  <FormField
                    control={form.control}
                    name="fantasyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Fantasia</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome Fantasia" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-6 grid">
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome da Empresa</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome da Empresa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-6 grid">
                  <FormField
                    control={form.control}
                    name="cnaeCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNAE Codigo</FormLabel>
                        <FormControl>
                          <Input placeholder="CNAE Codigo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-6 grid">
                  <FormField
                    control={form.control}
                    name="cnaeDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CNAE Descrição</FormLabel>
                        <FormControl>
                          <Input placeholder="CNAE Descrição" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-6 grid">
                  <FormField
                    control={form.control}
                    name="contactNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numero para Contato</FormLabel>
                        <FormControl>
                          <Input placeholder="Numero para Contato" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-6 grid">
                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email para Contato</FormLabel>
                        <FormControl>
                          <Input placeholder="Email para Contato" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-6 grid">
                  <FormField
                    control={form.control}
                    name="openedData"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Abertura</FormLabel>
                        <FormControl ref={withMask("99/99/9999")}>
                          <Input placeholder="Data de Abertura" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="address">
              <div className="mt-10 grid grid-cols-12 gap-x-5 gap-y-6">
                <div className="col-span-2 grid">
                  <FormField
                    control={form.control}
                    name="clientAddress.streetType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Fantasia</FormLabel>
                        <FormControl>
                          <Input placeholder="Tipo de Longradouro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-10 grid">
                  <FormField
                    control={form.control}
                    name="clientAddress.street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome Fantasia</FormLabel>
                        <FormControl>
                          <Input placeholder="Tipo de Longradouro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-2 grid">
                  <FormField
                    control={form.control}
                    name="clientAddress.number"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Numero</FormLabel>
                        <FormControl>
                          <Input placeholder="Numero" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-5 grid">
                  <FormField
                    control={form.control}
                    name="clientAddress.complement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Complemento</FormLabel>
                        <FormControl>
                          <Input placeholder="Complemento" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-5 grid">
                  <FormField
                    control={form.control}
                    name="clientAddress.neighborhood"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bairro</FormLabel>
                        <FormControl>
                          <Input placeholder="Bairro" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4 grid">
                  <FormField
                    control={form.control}
                    name="clientAddress.city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cidade</FormLabel>
                        <FormControl>
                          <Input placeholder="Cidade" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4 grid">
                  <FormField
                    control={form.control}
                    name="clientAddress.state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estado</FormLabel>
                        <FormControl>
                          <Input placeholder="Estado" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4 grid">
                  <FormField
                    control={form.control}
                    name="clientAddress.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl>
                          <Input placeholder="Numero" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="contacts">
              <div className="mt-10 grid grid-cols-12 gap-x-5 gap-y-6">
                {contacts.map(
                  (contact: (typeof contacts)[0], index: number) => (
                    <div
                      key={`contact-${index}`}
                      className="col-span-12 grid grid-cols-12 gap-x-5 gap-y-6"
                    >
                      <div
                        className="col-span-4 grid"
                        key={`contact-name-${index}`}
                      >
                        <FormField
                          control={form.control}
                          name={`contacts.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input placeholder="Nome" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div
                        className="col-span-4 grid"
                        key={`contact-email-${index}`}
                      >
                        <FormField
                          control={form.control}
                          name={`contacts.${index}.email`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="Email" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div
                        className="col-span-3 grid"
                        key={`contact-phone-${index}`}
                      >
                        <FormField
                          control={form.control}
                          name={`contacts.${index}.phoneNumber`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Telefone</FormLabel>
                              <FormControl ref={withMask("(99) 99999-9999")}>
                                <Input placeholder="Telefone" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        className="3 col-span-1 mt-8 gap-3"
                        variant="destructive"
                        key={`contact-remove-${index}`}
                        onClick={() => {
                          const newContacts = [...form.watch("contacts")];
                          newContacts.splice(index, 1);
                          form.setValue("contacts", newContacts);
                        }}
                      >
                        <TrashIcon />
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
                        id: form.watch("contacts").length,
                        name: "",
                        email: "",
                        phoneNumber: "",
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
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
