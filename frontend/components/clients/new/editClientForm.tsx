"use client";
import React, { useEffect, useRef, useState } from "react";
import {
    ClientInterface,
    ClientInterfaceSetup,
} from "@/components/clients/new/clientInterface";
import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { InputSwitch } from "primereact/inputswitch";
import { FileUpload } from "primereact/fileupload";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import { useRouter, useParams } from "next/navigation";

export default function EditClientForm() {
    const [formData, setFormData] =
        useState<ClientInterface>(ClientInterfaceSetup);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const { clientId } = useParams();

    const showSuccess = () => {
        toast.current?.show({
            severity: "success",
            summary: "Sucesso",
            detail: "O cliente foi editado com sucesso",
            life: 3000,
        });
    };
    const showError = () => {
        toast.current?.show({
            severity: "error",
            summary: "Erro",
            detail: "Não foi possivel cadastrar o cliente",
            life: 3000,
        });
    };

    useEffect(() => {
        fetch(
            `http://askg80w.82.197.94.212.sslip.io/accounts/clients/${clientId}`
        )
            .then((response) => response.json())
            .then((data) => {
                setFormData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [clientId]);
    console.log(formData);
    const sendForm = (redirect: boolean = false) => {
        setSubmitted(true);

        fetch(
            `http://askg80w.82.197.94.212.sslip.io/accounts/clients/${clientId}`,
            {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                showSuccess();
                if (redirect) {
                    setTimeout(() => {
                        router.push("/clients");
                    }, 3500);
                } else {
                    setSubmitted(false);
                    setFormData(ClientInterfaceSetup);
                }
            })
            .catch((error) => {
                showSuccess();
                console.error(
                    "There was a problem with the fetch operation:",
                    error
                );
            });
    };
    // const handleUpload = (event: FileUploadSelectEvent) => {
    //     const files = event.files;
    //     if (files && files.length > 0) {
    //         setFormData({ ...formData, files });
    //     }
    // };

    const convertData = (unformatedDate: Date): Date | string => {
        let date = new Date(unformatedDate);
        let isoDateStr = date.toISOString();
        return isoDateStr;
    };

    return (
        <div className="grid col-12 card h-full p-0">
            <Toast ref={toast} />
            <div className="card w-full">
                <div className="flex justify-content-between">
                    <h1>Visualizar Cliente</h1>
                    <Link href="/clients">
                        <Button
                            label="Voltar"
                            outlined
                            icon="pi pi-arrow-left"
                            size="small"
                        />
                    </Link>
                </div>

                <div className="p-fluid row-gap-4 formgrid grid mt-8">
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <InputText
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={(e) => {
                                    setFormData(
                                        (prevFormData: ClientInterface) => ({
                                            ...prevFormData,
                                            name: e.target.value,
                                        })
                                    );
                                }}
                                className={
                                    submitted && !formData.name
                                        ? "p-invalid"
                                        : ""
                                }
                            />
                            <label htmlFor="name">Nome do cliente</label>
                        </span>
                        {submitted && !formData.name && (
                            <small id="name-help" className="p-error">
                                Adicione um nome para o cliente
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <InputText
                                id="site"
                                type="text"
                                value={formData.site}
                                onChange={(e) => {
                                    setFormData(
                                        (prevFormData: ClientInterface) => ({
                                            ...prevFormData,
                                            site: e.target.value,
                                        })
                                    );
                                }}
                            />
                            <label htmlFor="site">Url do site</label>
                        </span>
                    </div>
                    <div className="field col-12">
                        <label htmlFor="description" className="mb-2">
                            Descrição
                        </label>
                        <Editor
                            value={formData.description ?? undefined}
                            onTextChange={(e: EditorTextChangeEvent) =>
                                setFormData(
                                    (prevFormData: ClientInterface) => ({
                                        ...prevFormData,
                                        description: e.htmlValue,
                                    })
                                )
                            }
                            style={{ height: "320px" }}
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <InputText
                                id="contactEmail"
                                type="text"
                                value={formData.contactEmail}
                                onChange={(e) => {
                                    setFormData(
                                        (prevFormData: ClientInterface) => ({
                                            ...prevFormData,
                                            contactEmail: e.target.value,
                                        })
                                    );
                                }}
                                className={
                                    submitted && !formData.contactEmail
                                        ? "p-invalid"
                                        : ""
                                }
                            />
                            <label htmlFor="contactEmail">
                                Email para contato
                            </label>
                        </span>
                        {submitted && !formData.contactEmail && (
                            <small id="email-help" className="p-error">
                                Adicione um email para o cliente
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <InputMask
                                id="contactNumber"
                                mask="(99) 99999-9999"
                                type="text"
                                value={formData.contactNumber ?? undefined}
                                onChange={(e) => {
                                    setFormData(
                                        (prevFormData: ClientInterface) => ({
                                            ...prevFormData,
                                            contactNumber: e.target.value,
                                        })
                                    );
                                }}
                                className={
                                    submitted && !formData.contactNumber
                                        ? "p-invalid"
                                        : ""
                                }
                            />
                            <label htmlFor="contactNumber">
                                Numero para contato
                            </label>
                        </span>
                        {submitted && !formData.contactNumber && (
                            <small id="number-help" className="p-error">
                                Adicione um telefone para o cliente
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <Calendar
                                id="lastVisit"
                                showIcon
                                showButtonBar
                                dateFormat="dd/mm/yy"
                                value={
                                    formData.lastVisit
                                        ? new Date(formData.lastVisit)
                                        : null
                                }
                                onChange={(e) =>
                                    setFormData(
                                        (prevFormData: ClientInterface) => ({
                                            ...prevFormData,
                                            lastVisit: convertData(
                                                e.target.value || new Date()
                                            ) as Date,
                                        })
                                    )
                                }
                            />
                            <label htmlFor="lastVisit">
                                Numero para contato
                            </label>
                        </span>
                    </div>
                    <div className="flex justify-content-center align-items-center gap-4 field col-12 md:col-6">
                        <label
                            className="m-0 font-medium text-lg"
                            htmlFor="client"
                        >
                            Este já é um cliente?
                        </label>
                        <InputSwitch
                            id="client"
                            checked={formData.client}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    client: e.value,
                                })
                            }
                        />
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <InputText
                                id="location"
                                type="text"
                                value={formData.location}
                                onChange={(e) => {
                                    setFormData(
                                        (prevFormData: ClientInterface) => ({
                                            ...prevFormData,
                                            location: e.target.value,
                                        })
                                    );
                                }}
                            />
                            <label htmlFor="location">Endereço</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6 ">
                        <span className="p-float-label">
                            <InputText
                                id="dockNumber"
                                type="number"
                                value={formData.dockId.toString()}
                                onChange={(e) => {
                                    setFormData(
                                        (prevFormData: ClientInterface) => ({
                                            ...prevFormData,
                                            dockId: parseInt(e.target.value),
                                        })
                                    );
                                }}
                            />
                            <label htmlFor="dockNumber">Numero de docas</label>
                        </span>
                    </div>

                    <div className="col-12">
                        <FileUpload
                            name="files"
                            accept="image/*"
                            multiple
                            uploadOptions={{ className: "hidden" }}
                            // onSelect={handleUpload}
                        />
                    </div>
                </div>
                <div className="flex gap-6 col-12 mt-6 ">
                    <Button
                        onClick={() => sendForm(true)}
                        label="Salvar"
                        icon="pi pi-check"
                    ></Button>
                </div>
            </div>
        </div>
    );
}
