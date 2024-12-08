"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BookUser, Files, KeyRound, MapPinnedIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast as sonner } from "sonner";
import { withMask } from "use-mask-input";
import { type CEPResponseType } from "~/app/(loggedArea)/(modules)/clients/module/types";
import {
  type CreateUserData,
  CreateUserSchema,
} from "~/app/(loggedArea)/(modules)/users/module/types";
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
            router.push("/users/list");
          },
          onError: (error) => {
            toast({
              title: "Erro ao atualizar o usuário",
              variant: "error",
            });
          },
          onSettled: () => {
            setLoading(false);
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
          router.push("/users/list");
        },
        onError: (error) => {
          toast({
            title: "Erro ao criar usuário!",
            variant: "error",
          });
        },
        onSettled: () => {
          setLoading(false);
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

  const cepWatch = form.watch("address.zipCode");

  useEffect(() => {
    if (cepWatch?.replace(/\D/g, "").length === 8) {
      fetch(`https://viacep.com.br/ws/${cepWatch.replace(/\D/g, "")}/json/`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data: CEPResponseType) => {
          form.setValue(
            "address.streetType",
            data.logradouro.split(" ")[0] ?? "",
          );
          form.setValue(
            "address.street",
            data.logradouro.split(" ").slice(1).join(" "),
          );
          form.setValue("address.neighborhood", data.bairro);
          form.setValue("address.city", data.localidade);
          form.setValue("address.state", data.uf);
          form.setValue("address.complement", data.complemento);
          form.setValue("address.number", data.unidade);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [cepWatch, form]);

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
        address: user.address ?? {
          zipCode: "",
          streetType: "",
          street: "",
          number: "",
          complement: "",
          neighborhood: "",
          city: "",
          state: "",
        },
      };
      form.reset(replaceEmpyFieldUser);
    }
  }, [form, user]);

  useEffect(() => {
    if (Object.keys(form.formState.errors).length !== 0) {
      sonner("Campos obrigatorio", {
        description: `Um ou mais campos obrigatórios não foram preenchidos!`,
      });
      // console.group("Form Errors");
      // console.log(form.formState.errors);
      // console.groupEnd();
    }
  }, [form.formState.errors]);

  const [hiringType, setHiringType] = useState("");
  const [roleType, setRoleType] = useState<number | undefined>();
  const [positionType, setPositionType] = useState("");

  useEffect(() => {
    if (hiringType !== undefined) {
      form.setValue("typeHiring", hiringType);
    }

    if (roleType !== undefined) {
      form.setValue("roleId", roleType);
    }
    if (positionType !== undefined) {
      form.setValue("position", positionType);
    }
  }, [form, hiringType, roleType, positionType]);

  useEffect(() => {
    setHiringType(user?.typeHiring ?? "");
    setRoleType(user?.roleId ?? undefined);
    setPositionType(user?.position ?? "");
  }, [user]);

  return (
    <div className="p-10">
      {!loading ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <Tabs defaultValue="employeeInfos" className="">
              <TabsList className="h-46 flex flex-col space-y-2 rounded-md p-2 sm:flex lg:h-12 lg:flex-row lg:items-center lg:justify-start lg:space-x-4 lg:space-y-0">
                <TabsTrigger
                  value="employeeInfos"
                  className={`flex items-center justify-center md:justify-start ${Object.keys(form.formState.errors).length > 0 && "border-b-4 border-red-500"}`}
                >
                  <BookUser className="mr-2 h-4 w-4" />
                  Informações do Funcionario
                </TabsTrigger>
                <TabsTrigger
                  value="hiringInfos"
                  className={`flex items-center justify-center md:justify-start ${form.formState.errors.hiringDate || form.formState.errors.typeHiring || form.formState.errors.position ? "border-b-4 border-red-500" : ""}`}
                >
                  <MapPinnedIcon className="mr-2 h-4 w-4" /> Dados da
                  Contratação
                </TabsTrigger>
                <TabsTrigger
                  value="address"
                  className={`flex items-center justify-center md:justify-start ${form.formState.errors.address && "border-b-4 border-red-500"}`}
                >
                  <MapPinnedIcon className="mr-2 h-4 w-4" /> Endereço
                </TabsTrigger>
                <TabsTrigger
                  value="accountInfos"
                  className={`flex items-center justify-center md:justify-start ${form.formState.errors.email || form.formState.errors.password || form.formState.errors.roleId ? "border-b-4 border-red-500" : ""}`}
                >
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
                    {form.formState.errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 grid sm:col-span-6">
                    <FormFieldBase
                      label="Sobrenome"
                      formControl={form.control}
                      name="lastName"
                      placeholder="Sobrenome"
                    />
                    {form.formState.errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 grid sm:col-span-6">
                    <FormFieldBase
                      label="RG"
                      formControl={form.control}
                      name="rg"
                      placeholder="RG"
                      formControlRef={withMask("99.999.999-9")}
                    />
                    {form.formState.errors.rg && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 grid sm:col-span-6">
                    <FormFieldBase
                      label="CPF"
                      formControl={form.control}
                      name="cpf"
                      placeholder="CPF"
                      formControlRef={withMask("999.999.999-99")}
                    />
                    {form.formState.errors.cpf && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
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
                    {form.formState.errors.contactNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 grid sm:col-span-6">
                    <FormFieldBase
                      label="Email para Contato"
                      formControl={form.control}
                      name="contactEmail"
                      placeholder="Email para Contato"
                    />
                    {form.formState.errors.contactEmail && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
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
                    {form.formState.errors.hiringDate && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 grid md:col-span-4">
                    <ComboBoxComponent
                      options={hiringTypeOptions}
                      className="mt-8"
                      placeholder="Tipo de Contratação"
                      setState={setHiringType}
                      state={hiringType}
                    />
                    {form.formState.errors.typeHiring && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 grid md:col-span-4">
                    <ComboBoxComponent
                      options={positionOptions}
                      className="mt-8"
                      placeholder="Área de Atuação"
                      setState={setPositionType}
                      state={positionType}
                    />
                    {form.formState.errors.position && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
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
                      label="CEP"
                      formControl={form.control}
                      name="address.zipCode"
                      placeholder="CEP"
                      formControlRef={withMask("99999-999")}
                    />
                    {form.formState.errors.address?.zipCode && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
                  </div>
                  <div className="lg:col-span-8"></div>
                  <div className="col-span-12 grid lg:col-span-4">
                    <FormFieldBase
                      label="Tipo de Longradouro"
                      formControl={form.control}
                      name="address.streetType"
                      placeholder="Tipo de Longradouro"
                    />
                    {form.formState.errors.address?.streetType && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 grid lg:col-span-8">
                    <FormFieldBase
                      label="Logradouro"
                      formControl={form.control}
                      name="address.street"
                      placeholder="Logradouro"
                    />
                    {form.formState.errors.address?.street && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 grid lg:col-span-2">
                    <FormFieldBase
                      label="Número"
                      formControl={form.control}
                      name="address.number"
                      placeholder="Número"
                    />
                    {form.formState.errors.address?.number && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 grid lg:col-span-5">
                    <FormFieldBase
                      label="Complemento"
                      formControl={form.control}
                      name="address.complement"
                      placeholder="Complemento"
                    />
                  </div>
                  <div className="col-span-12 grid lg:col-span-5">
                    <FormFieldBase
                      label="Bairro"
                      formControl={form.control}
                      name="address.neighborhood"
                      placeholder="Bairro"
                    />
                    {form.formState.errors.address?.neighborhood && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 grid lg:col-span-4">
                    <FormFieldBase
                      label="Cidade"
                      formControl={form.control}
                      name="address.city"
                      placeholder="Cidade"
                    />
                    {form.formState.errors.address?.city && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
                  </div>
                  <div className="col-span-12 grid lg:col-span-4">
                    <FormFieldBase
                      label="Estado"
                      formControl={form.control}
                      name="address.state"
                      placeholder="Estado"
                    />
                    {form.formState.errors.address?.state && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
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
                    {form.formState.errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
                  </div>
                  <div className="col-span-6 grid">
                    <FormFieldBase
                      label="Senha"
                      formControl={form.control}
                      name="password"
                      placeholder="Senha"
                      typeInput="password"
                    />
                    {form.formState.errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
                  </div>
                  <div className="col-span-6 grid">
                    <ComboBoxComponent
                      options={rolesOptions}
                      className="mt-8"
                      placeholder="Nivel de acesso"
                      setState={setRoleType}
                      state={roleType}
                    />
                    {form.formState.errors.roleId && (
                      <p className="mt-1 text-sm text-red-600">
                        Campo orbigatorio!
                      </p>
                    )}
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
              {user ? "Atualizar Dados" : "Criar Funcionário"}
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
