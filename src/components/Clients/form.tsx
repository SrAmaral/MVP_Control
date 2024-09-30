"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { withMask } from "use-mask-input";
import { type z } from "zod";
import {
  clientSchema,
  type CNPJRequestType,
} from "~/app/(modules)/clients/module/types";
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

export default function ClientsFormCreate() {
  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      cnpj: "",
    },
  });

  console.log(`teste `, form.getValues());

  const cnpjWatch = form.watch("cnpj");
  const [findingCNPJ, setFindingCNPJ] = useState("");
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

  function onSubmit(values: z.infer<typeof clientSchema>) {
    console.log(values);
  }
  return (
    <div className="p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-12"
        >
          <div className="col-span-6 grid">
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CNPJ</FormLabel>
                  <FormControl ref={withMask("99.999.999/9999-99")}>
                    <Input placeholder="cnpj" {...field} />
                  </FormControl>
                  <FormDescription
                    className={`text-sm ${
                      findingCNPJ === "CNPJ encontrado!"
                        ? "text-green-600"
                        : "text-red-600"
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
          <Button type="submit" className="mt-10">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
