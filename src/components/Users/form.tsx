"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BookUser, Files, KeyRound, MapPinnedIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { withMask } from "use-mask-input";
import {
  type CreateUserData,
  CreateUserSchema,
} from "~/app/(modules)/users/module/types";
import { api } from "~/core/trpc/callers/react";
import { useToast } from "~/hooks/use-toast";
import { Button } from "../ui/button";
import { ComboBoxComponent } from "../ui/combo-box/comboBox";
import { Form } from "../ui/form";
import FormFieldBase from "../ui/form-field";
import LoadingSpinner from "../ui/loading";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Textarea } from "../ui/textarea";
import UploadedFileComponent from "../ui/uploadedFiles";
import UploadFilesComponent from "../ui/uploadFiles";
import { hiringTypeOptions, positionOptions } from "./utils";

type UpdateUserFormProps = {
  user?: CreateUserData;
};
export default function UsersFormCreate({ user }: UpdateUserFormProps) {
  const form = useForm<CreateUserData>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      address: user?.address,
    },
  });
  const { toast } = useToast();
  const router = useRouter();
  const createUsers = api.users.createUser.useMutation();
  const updateUser = api.users.updateUser.useMutation();
  const [loading, setLoading] = useState(false);
  const [filesList, setFilesList] = useState<FileList | null>(null);

  function onSubmit(values: CreateUserData) {
    setLoading(true);
    if (user !== undefined) {
      updateUser.mutate(
        { ...values, id: user.id },
        {
          onSuccess: () => {
            toast({
              title: "Usuário atualizado com sucesso!",
              variant: "success",
            });
          },
          onError: (error) => {
            toast({
              title: "Erro ao atualizar o usuário",
              variant: "error",
            });
          },
          onSettled: () => {
            setLoading(false);
            router.push("/users/list");
          },
        },
      );
    } else {
      createUsers.mutate(values, {
        onSuccess: () => {
          toast({
            title: "Usuário criado com sucesso!",
            variant: "success",
          });
        },
        onError: (error) => {
          toast({
            title: "Erro ao criar usuário!",
            variant: "error",
          });
        },
        onSettled: () => {
          setLoading(false);
          router.push("/users/list");
        },
      });
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
      const replaceEmpyFieldUser = {
        ...user,
        pis: user.pis ?? "",
        ctps: user.ctps ?? "",
        typeHiring: user.typeHiring ?? "",
        salary: user.salary ?? "",
        workLoad: user.workLoad ?? "",
        comment: user.comment ?? "",
        address: user.address?.map((address) => ({
          ...address,
          complement: address.complement ?? "",
        })),
      };
      form.reset(replaceEmpyFieldUser);
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

  return (
    <div className="p-10">
      {!loading ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="employeeInfos" className="">
              <TabsList className="h-46 flex flex-col space-y-2 rounded-md p-2 sm:flex lg:h-12 lg:flex-row lg:items-center lg:justify-start lg:space-x-4 lg:space-y-0">
                <TabsTrigger value="employeeInfos">
                  <BookUser className="mr-2 h-4 w-4" />
                  Informações do Funcionario
                </TabsTrigger>
                <TabsTrigger value="hiringInfos">
                  <MapPinnedIcon className="mr-2 h-4 w-4" /> Dados da
                  Contratação
                </TabsTrigger>
                <TabsTrigger value="address">
                  <MapPinnedIcon className="mr-2 h-4 w-4" /> Endereço
                </TabsTrigger>
                <TabsTrigger value="accountInfos">
                  <KeyRound className="mr-2 h-4 w-4" /> Dados de acesso
                </TabsTrigger>
                <TabsTrigger value="documents">
                  <Files className="mr-2 h-4 w-4" /> Documentos
                </TabsTrigger>
              </TabsList>
              <TabsContent value="employeeInfos">
                <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-6 sm:grid-cols-12">
                  <div className="col-span-12 grid sm:col-span-6">
                    <FormFieldBase
                      label="Nome"
                      formControl={form.control}
                      name="firstName"
                      placeholder="Nome"
                    />
                  </div>
                  <div className="col-span-12 grid sm:col-span-6">
                    <FormFieldBase
                      label="Sobrenome"
                      formControl={form.control}
                      name="lastName"
                      placeholder="Sobrenome"
                    />
                  </div>
                  <div className="col-span-12 grid sm:col-span-6">
                    <FormFieldBase
                      label="RG"
                      formControl={form.control}
                      name="rg"
                      placeholder="RG"
                      formControlRef={withMask("99.999.999-9")}
                    />
                  </div>
                  <div className="col-span-12 grid sm:col-span-6">
                    <FormFieldBase
                      label="CPF"
                      formControl={form.control}
                      name="cpf"
                      placeholder="CPF"
                      formControlRef={withMask("999.999.999-99")}
                    />
                  </div>
                  <div className="col-span-12 grid sm:col-span-6">
                    <FormFieldBase
                      label="PIS"
                      formControl={form.control}
                      name="pis"
                      placeholder="PIS"
                      formControlRef={withMask("999.99999.99-9")}
                    />
                  </div>
                  <div className="col-span-12 grid sm:col-span-6">
                    <FormFieldBase
                      label="CTPS"
                      formControl={form.control}
                      name="ctps"
                      placeholder="CTPS"
                      formControlRef={withMask("999.99999.999-99")}
                    />
                  </div>
                  <div className="col-span-12 grid sm:col-span-6">
                    <FormFieldBase
                      label="Número para Contato"
                      formControl={form.control}
                      name="contactNumber"
                      placeholder="Número para Contato"
                      formControlRef={withMask("(99) 99999-9999")}
                    />
                  </div>
                  <div className="col-span-12 grid sm:col-span-6">
                    <FormFieldBase
                      label="Email para Contato"
                      formControl={form.control}
                      name="contactEmail"
                      placeholder="Email para Contato"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="hiringInfos">
                <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-6 md:grid-cols-12">
                  <div className="text col-span-12 grid md:col-span-4">
                    <FormFieldBase
                      label="Data de Contratação"
                      formControl={form.control}
                      name="hiringDate"
                      placeholder="Data de Contratação"
                      formControlRef={withMask("99/99/9999")}
                    />
                  </div>
                  <div className="col-span-12 grid md:col-span-4">
                    <ComboBoxComponent
                      options={hiringTypeOptions}
                      className="mt-8"
                      placeholder="Tipo de Contratação"
                      setState={setHiringType}
                      state={hiringType}
                    />
                  </div>
                  <div className="col-span-12 grid md:col-span-4">
                    <ComboBoxComponent
                      options={positionOptions}
                      className="mt-8"
                      placeholder="Área de Atuação"
                      setState={setPositionType}
                      state={positionType}
                    />
                  </div>
                  <div className="col-span-12 grid md:col-span-6">
                    <FormFieldBase
                      label="Salário"
                      formControl={form.control}
                      name="salary"
                      placeholder="Salário"
                      formControlRef={withMask("brl-currency")}
                      classNameInput="!text-left"
                    />
                  </div>
                  <div className="col-span-12 grid sm:col-span-6">
                    <FormFieldBase
                      label="Horas de Trabalho"
                      formControl={form.control}
                      name="workLoad"
                      placeholder="Horas de Trabalho"
                      formControlRef={withMask("99:99")}
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
                <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-6 lg:grid-cols-12">
                  <div className="col-span-12 grid lg:col-span-4">
                    <FormFieldBase
                      label="Tipo de Longradouro"
                      formControl={form.control}
                      name="address.0.streetType"
                      placeholder="Tipo de Longradouro"
                    />
                  </div>
                  <div className="col-span-12 grid lg:col-span-8">
                    <FormFieldBase
                      label="Logradouro"
                      formControl={form.control}
                      name="address.0.street"
                      placeholder="Logradouro"
                    />
                  </div>
                  <div className="col-span-12 grid lg:col-span-2">
                    <FormFieldBase
                      label="Número"
                      formControl={form.control}
                      name="address.0.number"
                      placeholder="Número"
                    />
                  </div>
                  <div className="col-span-12 grid lg:col-span-5">
                    <FormFieldBase
                      label="Complemento"
                      formControl={form.control}
                      name="address.0.complement"
                      placeholder="Complemento"
                    />
                  </div>
                  <div className="col-span-12 grid lg:col-span-5">
                    <FormFieldBase
                      label="Bairro"
                      formControl={form.control}
                      name="address.0.neighborhood"
                      placeholder="Bairro"
                    />
                  </div>
                  <div className="col-span-12 grid lg:col-span-4">
                    <FormFieldBase
                      label="Cidade"
                      formControl={form.control}
                      name="address.0.city"
                      placeholder="Cidade"
                    />
                  </div>
                  <div className="col-span-12 grid lg:col-span-4">
                    <FormFieldBase
                      label="Estado"
                      formControl={form.control}
                      name="address.0.state"
                      placeholder="Estado"
                    />
                  </div>
                  <div className="col-span-12 grid lg:col-span-4">
                    <FormFieldBase
                      label="CEP"
                      formControl={form.control}
                      name="address.0.zipCode"
                      placeholder="CEP"
                      formControlRef={withMask("99999-999")}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="accountInfos">
                <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-6 lg:grid-cols-12">
                  <div className="col-span-6 grid">
                    <FormFieldBase
                      label="Email para Contato"
                      formControl={form.control}
                      name="email"
                      placeholder="Email para Contato"
                    />
                  </div>
                  <div className="col-span-6 grid">
                    <FormFieldBase
                      label="Senha"
                      formControl={form.control}
                      name="password"
                      placeholder="Senha"
                      typeInput="password"
                    />
                  </div>
                  <div className="col-span-6 grid">
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
              <TabsContent value="documents">
                <UploadFilesComponent
                  filesList={filesList}
                  getFormValue={form.getValues}
                  setFormValue={(name, value) =>
                    form.setValue(
                      name as keyof CreateUserData,
                      value as keyof CreateUserData,
                    )
                  }
                  setFilesList={setFilesList}
                  anyData={user ?? {}}
                />
                <Separator className="mb-5 mt-10" />
                <UploadedFileComponent
                  files={form.getValues("files") ?? []}
                  filesList={filesList}
                  setFilesList={setFilesList}
                  getFormValue={form.getValues}
                  setFormValue={(name, value) =>
                    form.setValue(
                      name as keyof CreateUserData,
                      value as keyof CreateUserData,
                    )
                  }
                />
              </TabsContent>
            </Tabs>
            <Button type="submit" className="mt-10 bg-green-500">
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
