"use client";
import React, { useState } from "react";
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
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { SplitButton } from "primereact/splitbutton";

export default function AddClientForm() {
    const [formData, setFormData] =
        useState<ClientInterface>(ClientInterfaceSetup);
    const [submitted, setSubmitted] = useState(false);

    const convertToFormData = () => {
        const dataConverted = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            if (value instanceof FileList) {
                Array.from(value).forEach((file: File) => {
                    dataConverted.append(key, file);
                });
            } else {
                dataConverted.append(key, value);
            }
        });

        return dataConverted;
    };

    const sendForm = async () => {
        setSubmitted(true);

        const response = await fetch("http://localhost:3000/api/clients", {
            method: "POST",
            body: convertToFormData(),
        });
    };
    const sendFormAndNew = () => {
        setSubmitted(true);
    };
    const handleUpload = (event: FileUploadSelectEvent) => {
        const files = event.files;
        if (files && files.length > 0) {
            setFormData({ ...formData, files });
        }
    };

    const items = [
        {
            label: "Criar e um novo",
            icon: "pi pi-id-card",
            command: () => sendFormAndNew(),
        },
    ];

    return (
        <div className="grid col-12 card h-full p-0">
            <div className="card w-full">
                <div className="flex justify-content-between">
                    <h1>Novo Cliente</h1>
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
                                value={formData.lastVisit}
                                onChange={(e) =>
                                    setFormData(
                                        (prevFormData: ClientInterface) => ({
                                            ...prevFormData,
                                            lastVisit: e.target.value,
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
                                value={formData.dockNumber}
                                onChange={(e) => {
                                    setFormData(
                                        (prevFormData: ClientInterface) => ({
                                            ...prevFormData,
                                            dockNumber: e.target.value,
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
                            onSelect={handleUpload}
                        />
                    </div>
                </div>
                <div className="flex gap-6 col-12 mt-6 ">
                    <SplitButton
                        onClick={sendForm}
                        label="Criar"
                        icon="pi pi-check"
                        model={items}
                    ></SplitButton>
                </div>
            </div>
        </div>
    );
}
