/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { osSchema, type OSType } from "~/app/(modules)/os/module/types";
import { api } from "~/core/trpc/callers/react";
import { useToast } from "~/hooks/use-toast";
import { cn } from "~/lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { ComboBoxComponent } from "../ui/combo-box/comboBox";
import { ComboBoxMultiple } from "../ui/combo-box/comboBoxMultiple";
import { Form } from "../ui/form";
import { Label } from "../ui/label";
import LoadingSpinner from "../ui/loading";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Textarea } from "../ui/textarea";
import ClientDataAccordion from "./client-details";

type osFormType = {
  os?: OSType;
};

export default function OsFormCreate({ os }: osFormType) {
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [schedulingDate, setSchedulingDate] = useState<Date | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [formValues, setFormValues] = useState<OSType | undefined>(undefined);
  const [clientSelected, setClientSelected] = useState<string>();
  const [userSelected, setUserSelected] = useState<
    (string | number)[] | undefined
  >(undefined);
  const form = useForm<z.infer<typeof osSchema>>({
    resolver: zodResolver(osSchema),
    defaultValues: {},
  });

  useEffect(() => {
    if (schedulingDate !== null) {
      form.setValue("scheduleDate", schedulingDate.toISOString());
    }
    if (deadline !== null) {
      form.setValue("deadline", deadline.toISOString());
    }
  }, [schedulingDate, deadline]);

  useEffect(() => {
    if (os !== undefined) {
      form.reset(os);
      setSchedulingDate(new Date(os?.scheduleDate));
      setDeadline(new Date(os?.deadline));
      setUserSelected(
        os.users.map((user) =>
          user.id !== undefined ? user.id.toString() : "",
        ),
      );
      setClientSelected(os?.client.id);
    }
  }, [form, os]);

  const clients = api.clients.listClient.useQuery();
  const clientOptions = clients.data?.map((client) => ({
    id: client.id,
    value: client.fantasyName,
    label: client.fantasyName,
  }));

  const users = api.users.listUsers.useQuery();
  const usersOptions = users.data?.map((user) => ({
    id: user.id,
    value: `${user.firstName} ${user.lastName} - ${user.email}`,
    label: `${user.firstName} ${user.lastName} - ${user.email}`,
  }));

  useEffect(() => {
    if (clientOptions !== undefined) {
      const selectedClient = clients.data?.find(
        (client) => client.id === clientSelected,
      );
      if (selectedClient) {
        if (selectedClient.clientAddress) {
          form.setValue("client", {
            ...selectedClient,
            clientAddress: {
              ...selectedClient.clientAddress,
              id: selectedClient.clientAddress.id ?? undefined,
              logicalDeleted:
                selectedClient.clientAddress.logicalDeleted ?? undefined,
            },
          });
        }
      }
    }
    if (usersOptions !== undefined) {
      const selectedUsers = users.data?.filter((user) => {
        return userSelected?.includes(user.id);
      });
      if (selectedUsers) {
        form.setValue(
          "users",
          selectedUsers.map((user) => ({
            ...user,
            email: user.email ?? undefined,
            contactNumber: user.contactNumber ?? undefined,
            password: user.password ?? undefined,
            contactEmail: user.contactEmail ?? undefined,
            lastName: user.lastName ?? undefined,
            rg: user.rg ?? undefined,
            cpf: user.cpf ?? undefined,
            pis: user.pis ?? undefined,
            ctps: user.ctps ?? undefined,
            typeHiring: user.typeHiring ?? undefined,
            hiringDate: user.hiringDate ?? undefined,
            position: user.position ?? undefined,
            salary: user.salary ?? undefined,
            workLoad: user.workLoad ?? undefined,
            comment: user.comment ?? undefined,
            address: user.address.map((addr) => ({
              ...addr,
              complement: addr.complement ?? undefined,
              neighborhood: addr.neighborhood ?? undefined,
              zipCode: addr.zipCode ?? undefined,
            })),
            role: user.role ? { id: user.role.id } : undefined,
          })),
        );
      }
    }
    setFormValues(form.getValues());
  }, [clientSelected, userSelected]);

  const createOs = api.os.createOs.useMutation();
  const updateOs = api.os.updateOs.useMutation();
  function onSubmit(values: OSType) {
    if (os !== undefined) {
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
    } else {
      createOs.mutate(values, {
        onSuccess: () => {
          toast({
            title: "OS criada com sucesso!",
            variant: "success",
          });
        },
        onError: (error) => {
          toast({
            title: "Erro ao criar OS!",
            variant: "error",
          });
        },
        onSettled: () => {
          setLoading(false);
          router.push("/os/list");
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
            <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-[50px] md:grid-cols-12">
              <div className="col-span-4 grid">
                <Label className="mb-4">Data de Agendamento</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !schedulingDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {!!schedulingDate ? (
                        format(schedulingDate, "dd/MM/yyyy")
                      ) : (
                        <span>Data de Agendamento</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={schedulingDate ?? undefined}
                      onSelect={(day) => setSchedulingDate(day ?? null)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="col-span-4 grid">
                <Label className="mb-4">Data Limite</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !deadline && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {!!deadline ? (
                        format(deadline, "dd/MM/yyyy")
                      ) : (
                        <span>Data Limite</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={deadline ?? undefined}
                      onSelect={(day) => setDeadline(day ?? null)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="col-span-4" />
              <div className="col-span-12 grid">
                <Label className="mb-4">Descrição da OS</Label>
                <Textarea
                  placeholder="Digite a descrição da OS aqui!"
                  className="h-40"
                  value={form.watch("description")}
                  onChange={(event) => {
                    form.setValue("description", event.target.value);
                  }}
                />
              </div>
              <div className="col-span-4 grid">
                <Label className="mb-4">Cliente associado a OS</Label>
                <ComboBoxComponent
                  options={clientOptions}
                  className=""
                  placeholder="Cliente"
                  setState={setClientSelected}
                  state={clientSelected}
                />
              </div>
              <div className="col-span-4 grid">
                <Label className="mb-4">Funcionarios associados a OS</Label>
                <ComboBoxMultiple
                  options={usersOptions}
                  className="max-w-[280px]"
                  placeholder="Funcionarios"
                  setState={setUserSelected}
                  state={userSelected}
                />
              </div>
              <div className="col-span-4 grid" />

              {formValues?.client && (
                <ClientDataAccordion client={formValues.client} />
              )}
            </div>
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
