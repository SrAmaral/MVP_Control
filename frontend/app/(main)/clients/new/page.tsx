"use client";

import React, { useRef, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { InputMask } from "primereact/inputmask";
import { Calendar } from "primereact/calendar";
import { InputSwitch } from "primereact/inputswitch";
import { FileUpload, FileUploadSelectEvent } from "primereact/fileupload";
import { Nullable } from "primereact/ts-helpers";
import { SplitButton } from "primereact/splitbutton";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { router } from "next/client";
import Link from "next/link";

interface ClientInterface {
    name: string;
    location: string;
    site: string;
    description: string | undefined | Nullable<string>;
    contactEmail: string;
    contactNumber: string | undefined | Nullable<string>;
    files: File[];
    lastVisit: Date | Nullable<Date>;
    client: boolean;
    dockNumber: string;
}

const ClientNewPage = () => {
    const [formData, setFormData] = useState<ClientInterface>({
        name: "",
        location: "",
        site: "",
        description: "",
        contactEmail: "",
        contactNumber: "",
        files: [],
        lastVisit: null,
        client: false,
        dockNumber: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const requestApi = (data: ClientInterface) => {};

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

        return formData;
    };

    const sendForm = () => {
        setSubmitted(true);

        console.log("save", formData);
    };
    const sendFormAndNew = () => {
        setSubmitted(true);

        console.log("save and new", formData);
    };
    const handleUpload = (event: FileUploadSelectEvent) => {
        const files = event.files;
        if (files && files.length > 0) {
            setFormData({ ...formData, files });
        }
    };

    const items = [
        {
            label: "Criar",
            icon: "pi pi-check",
            command: () => sendForm(),
        },
        {
            label: "Criar e um novo",
            icon: "pi pi-id-card",
            command: () => sendFormAndNew(),
        },
    ];

    return (
        <div className="grid col-12 card h-full">
            <div className="card w-full">
                <div className="flex justify-content-between">
                    <h1>Novo Cliente</h1>
                    <Link href="/">
                        <Button
                            label="Voltar"
                            outlined
                            icon="pi pi-arrow-left"
                            size="small"
                        />
                    </Link>
                </div>

                <form onSubmit={sendForm}>
                    <div className="p-fluid row-gap-4 formgrid grid mt-8">
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        });
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
                                        setFormData({
                                            ...formData,
                                            site: e.target.value,
                                        });
                                    }}
                                />
                                <label htmlFor="site">Url do site</label>
                            </span>
                        </div>
                        <div className="field col-12">
                            <label htmlFor="description" className="mb-2">
                                Descrição
                            </label>
                            <span className="">
                                <Editor
                                    value={formData.name}
                                    onTextChange={(e: EditorTextChangeEvent) =>
                                        setFormData({
                                            ...formData,
                                            description: e.htmlValue,
                                        })
                                    }
                                    style={{ height: "320px" }}
                                />
                            </span>
                        </div>
                        <div className="field col-12 md:col-6">
                            <span className="p-float-label">
                                <InputText
                                    id="contactEmail"
                                    type="text"
                                    value={formData.contactEmail}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            contactEmail: e.target.value,
                                        });
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
                                        setFormData({
                                            ...formData,
                                            contactNumber: e.target.value,
                                        });
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
                                        setFormData({
                                            ...formData,
                                            lastVisit: e.target.value,
                                        })
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
                                        setFormData({
                                            ...formData,
                                            location: e.target.value,
                                        });
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
                                        setFormData({
                                            ...formData,
                                            dockNumber: e.target.value,
                                        });
                                    }}
                                />
                                <label htmlFor="dockNumber">
                                    Numero de docas
                                </label>
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
                            label="Save"
                            icon="pi pi-check"
                            model={items}
                        ></SplitButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ClientNewPage;
