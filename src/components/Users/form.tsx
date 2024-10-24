"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BookUser, KeyRound, MapPinnedIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { withMask } from "use-mask-input";
import {
  type CreateUserData,
  CreateUserSchema,
  type UpdateUserData,
} from "~/app/(modules)/users/module/types";
import { api } from "~/core/trpc/callers/react";
import { Button } from "../ui/button";
import { ComboBoxComponent } from "../ui/combo-box/comboBox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";

type UpdateUserFormProps = {
  user?: UpdateUserData;
};
export default function UsersFormCreate({ user }: UpdateUserFormProps) {
  const form = useForm<CreateUserData>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      id: user?.id ?? "",
      address: user?.address,
    },
  });

  const createUsers = api.users.createUser.useMutation();
  const updateUser = api.users.updateUser.useMutation();
  function onSubmit(values: CreateUserData) {
    if (user !== undefined) {
      updateUser.mutate({ ...values, id: user.id });
    } else {
      createUsers.mutate(values);
    }
  }

  const roles = api.users.listRoles.useQuery();
  const rolesOptions = roles.data?.map((role) => {
    return {
      id: role.id,
      value: role.name,
      label: role.name,
    };
  });

  useEffect(() => {
    if (user !== undefined) {
      form.reset(user);
    }
  }, [form, user]);

  useEffect(() => {
    if (Object.keys(form.formState.errors).length !== 0) {
      console.group("Form Errors");
      console.log(form.formState.errors);
      console.groupEnd();
    }
  }, [form.formState.errors]);

  const [hiringType, setHiringType] = useState("");
  const [roleType, setRoleType] = useState();
  const [positionType, setPositionType] = useState();

  useEffect(() => {
    form.setValue("typeHiring", hiringType);
    if (roleType !== undefined) {
      form.setValue("role.id", roleType);
    }
    if (positionType !== undefined) {
      form.setValue("position", positionType);
    }
  }, [form, hiringType, roleType, positionType]);

  const hiringTypeOptions = [
    {
      id: "CLT",
      value: "CLT",
      label: "CLT",
    },
    {
      id: "PJ",
      value: "PJ",
      label: "PJ",
    },
    {
      id: "Intermitente",
      value: "Intermitente",
      label: "Intermitente",
    },
    {
      id: "Estagiário",
      value: "Estagiário",
      label: "Estagiário",
    },
    {
      id: "Freelancer",
      value: "Freelancer",
      label: "Freelancer",
    },
    {
      id: "Outros",
      value: "Outros",
      label: "Outros",
    },
  ];

  const positionOptions = [
    {
      id: "Gerente",
      value: "Gerente",
      label: "Gerente",
    },
    {
      id: "Vendedor",
      value: "Vendedor",
      label: "Vendedor",
    },
    {
      id: "Financeiro",
      value: "Financeiro",
      label: "Financeiro",
    },
    {
      id: "Tecnico",
      value: "Tecnico",
      label: "Tecnico",
    },
    {
      id: "Outros",
      value: "Outros",
      label: "Outros",
    },
  ];

  return (
    <div className="p-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Tabs defaultValue="employeeInfos" className="">
            <TabsList>
              <TabsTrigger value="employeeInfos">
                <BookUser className="mr-2 h-4 w-4" />
                Informações do Funcionario
              </TabsTrigger>
              <TabsTrigger value="hiringInfos">
                <MapPinnedIcon className="mr-2 h-4 w-4" /> Dados da Contratação
              </TabsTrigger>
              <TabsTrigger value="address">
                <MapPinnedIcon className="mr-2 h-4 w-4" /> Endereço
              </TabsTrigger>
              <TabsTrigger value="accountInfos">
                <KeyRound className="mr-2 h-4 w-4" /> Dados de acesso
              </TabsTrigger>
            </TabsList>
            <TabsContent value="employeeInfos">
              <div className="mt-10 grid grid-cols-12 gap-x-5 gap-y-6">
                <div className="col-span-6 grid">
                  <FormField
                    control={form.control}
                    name="firstName"
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
                <div className="col-span-6 grid">
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sobrenome</FormLabel>
                        <FormControl>
                          <Input placeholder="Sobrenome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-6 grid">
                  <FormField
                    control={form.control}
                    name="rg"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>RG</FormLabel>
                        <FormControl ref={withMask("99.999.999-9")}>
                          <Input placeholder="RG" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-6 grid">
                  <FormField
                    control={form.control}
                    name="cpf"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CPF</FormLabel>
                        <FormControl ref={withMask("999.999.999-99")}>
                          <Input placeholder="CPF" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-6 grid">
                  <FormField
                    control={form.control}
                    name="pis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PIS</FormLabel>
                        <FormControl ref={withMask("999.99999.99-9")}>
                          <Input placeholder="PIS" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-6 grid">
                  <FormField
                    control={form.control}
                    name="ctps"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CTPS</FormLabel>
                        <FormControl ref={withMask("999.99999.999-99")}>
                          <Input placeholder="CTPS" {...field} />
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
                        <FormControl ref={withMask("(99) 99999-9999")}>
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
              </div>
            </TabsContent>
            <TabsContent value="hiringInfos">
              <div className="mt-10 grid grid-cols-12 gap-x-5 gap-y-6">
                <div className="text col-span-4 grid">
                  <FormField
                    control={form.control}
                    name="hiringDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Contratação</FormLabel>
                        <FormControl ref={withMask("99/99/9999")}>
                          <Input placeholder="Data de Contratação" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4 grid">
                  <ComboBoxComponent
                    options={hiringTypeOptions}
                    className="mt-8"
                    placeholder="Tipo de Contratação"
                    setState={setHiringType}
                    state={hiringType}
                  />
                </div>
                <div className="col-span-4 grid">
                  <ComboBoxComponent
                    options={positionOptions}
                    className="mt-8"
                    placeholder="Area de Atuação"
                    setState={setPositionType}
                    state={positionType}
                  />
                </div>
                <div className="col-span-4 grid">
                  <FormField
                    control={form.control}
                    name="salary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salario</FormLabel>
                        <FormControl ref={withMask("brl-currency")}>
                          <Input
                            placeholder="Salario"
                            className="!text-left"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-5 grid">
                  <FormField
                    control={form.control}
                    name="workLoad"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Horas de Trabalho</FormLabel>
                        <FormControl ref={withMask("99:99")}>
                          <Input placeholder="Horas de Trabalho" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-12 grid">
                  <Textarea
                    placeholder="Digite a descrição aqui!"
                    className="h-40"
                    value={form.watch("comment")}
                    onChange={(event) => {
                      form.setValue("comment", event.target.value);
                    }}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="address">
              <div className="mt-10 grid grid-cols-12 gap-x-5 gap-y-6">
                <div className="col-span-2 grid">
                  <FormField
                    control={form.control}
                    name="address.0.streetType"
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
                    name="address.0.street"
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
                    name="address.0.number"
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
                    name="address.0.complement"
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
                    name="address.0.neighborhood"
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
                    name="address.0.city"
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
                    name="address.0.state"
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
                    name="address.0.zipCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CEP</FormLabel>
                        <FormControl ref={withMask("99999-999")}>
                          <Input placeholder="Numero" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="accountInfos">
              <div className="mt-10 grid grid-cols-12 gap-x-5 gap-y-6">
                <div className="col-span-6 grid">
                  <FormField
                    control={form.control}
                    name="email"
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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Senha"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="col-span-4 grid">
                  <ComboBoxComponent
                    options={rolesOptions}
                    className="mt-8"
                    placeholder="Nivel de acesso"
                    setState={setRoleType}
                    state={roleType}
                  />
                </div>
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
