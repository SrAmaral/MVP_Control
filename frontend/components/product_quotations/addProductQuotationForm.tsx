"use client";
import React, { ChangeEvent, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { SplitButton } from "primereact/splitbutton";
import { Toast } from "primereact/toast";
import { useRouter } from "next/navigation";
import {
    DescriptionProductQuotation,
    ProductQuotationInterface,
} from "./productQuotationInterface";
import { InputTextarea } from "primereact/inputtextarea";
import { ListBox, ListBoxChangeEvent } from "primereact/listbox";
import {
    InputNumber,
    InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { v4 } from "uuid";

export default function AddProductQuotationForm() {
    const [formData, setFormData] = useState<ProductQuotationInterface>({
        status: "new",
        deadline: null,
        client: {
            disconnect: [],
            connect: [],
        },
        description: [
            {
                description: "",
                type: {
                    name: "",
                    value: "",
                },
                priority: {
                    name: "",
                    value: "",
                },
                qty: null,
                value: 0,
            },
        ],
    });
    const [formDataVersion, setFormDataVersion] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast>(null);
    const router = useRouter();

    const showSuccess = () => {
        toast.current?.show({
            severity: "success",
            summary: "Sucesso",
            detail: "O cliente foi cadastrado com sucesso",
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

    const sendForm = (redirect: boolean = false) => {
        // setSubmitted(true);

        console.log(formData);

        fetch("http://82.197.94.212:1337/api/product-quotations", {
            method: "POST",
            body: JSON.stringify({ data: formData }),
            headers: {
                "Content-Type": "application/json",
            },
        })
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
                        router.push("/product_quotations");
                    }, 3500);
                } else {
                    setSubmitted(false);
                    setFormData({
                        status: "new",
                        deadline: null,
                        client: {
                            disconnect: [],
                            connect: [],
                        },
                        description: [
                            {
                                description: "",
                                type: {
                                    name: "",
                                    value: "",
                                },
                                priority: {
                                    name: "",
                                    value: "",
                                },
                                qty: null,
                                value: 0,
                            },
                        ],
                    });
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

    const items = [
        {
            label: "Criar e um novo",
            icon: "pi pi-id-card",
            command: () => sendForm(false),
        },
    ];

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
                    <h1>Nova Requisição de Serviço</h1>
                    <Link href="/product_requests">
                        <Button
                            label="Voltar"
                            outlined
                            icon="pi pi-arrow-left"
                            size="small"
                        />
                    </Link>
                </div>

                <div className="p-fluid row-gap-4 formgrid grid mt-8 col-12">
                    <Button
                        label="Adicionar solicitação"
                        icon="pi pi-plus"
                        className="col-2 h-3rem"
                        onClick={() => {
                            let newItems = formData;
                            newItems.description.push({
                                description: "",
                                type: {
                                    name: "",
                                    value: "",
                                },
                                priority: {
                                    name: "",
                                    value: "",
                                },
                                qty: 0,
                                value: 0,
                            });

                            setFormDataVersion(v4());
                            setFormData(newItems);
                        }}
                    />
                    <div className="p-fluid row-gap-6  grid mt-4 col-12 flex-row">
                        {formData.description.map(
                            (item: DescriptionProductQuotation, index) => (
                                <div key={index} className="grid col-12">
                                    <div
                                        className="field col-4"
                                        key={index + "description"}
                                    >
                                        <label
                                            htmlFor="description"
                                            className="mb-2 "
                                        >
                                            Descrição
                                        </label>
                                        <InputTextarea
                                            style={{
                                                resize: "none",
                                                maxHeight: "105px",
                                            }}
                                            rows={5}
                                            value={item.description}
                                            onChange={(
                                                e: ChangeEvent<HTMLTextAreaElement>
                                            ) => {
                                                let newItems = formData;

                                                newItems.description[
                                                    index
                                                ].description = e.target.value;

                                                setFormDataVersion(v4());
                                                setFormData(newItems);
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="field col-1.5"
                                        key={index + "type"}
                                    >
                                        <label htmlFor="type" className="mb-2 ">
                                            Tipo
                                        </label>
                                        <ListBox
                                            value={item.type}
                                            onChange={(
                                                e: ListBoxChangeEvent
                                            ) => {
                                                let newItems = formData;

                                                newItems.description[
                                                    index
                                                ].type = e.value;
                                                setFormDataVersion(v4());
                                                setFormData(newItems);
                                            }}
                                            options={[
                                                {
                                                    name: "Serviço",
                                                    code: "service",
                                                },
                                                {
                                                    name: "Produto",
                                                    code: "product",
                                                },
                                            ]}
                                            optionLabel="name"
                                            className="w-full md:w-14rem max-w-8rem"
                                        />
                                    </div>
                                    <div
                                        className="field col-1.5 ml-2"
                                        key={index + "priority"}
                                    >
                                        <label
                                            htmlFor="priority"
                                            className="mb-2 "
                                        >
                                            Prioridade
                                        </label>
                                        <ListBox
                                            value={item.priority}
                                            onChange={(
                                                e: ListBoxChangeEvent
                                            ) => {
                                                let newItems = formData;

                                                newItems.description[
                                                    index
                                                ].priority = e.value;
                                                setFormDataVersion(v4());
                                                setFormData(newItems);
                                            }}
                                            options={[
                                                {
                                                    name: "Baixa",
                                                    code: "low",
                                                },
                                                {
                                                    name: "Media",
                                                    code: "medium",
                                                },
                                                {
                                                    name: "Alta",
                                                    code: "high",
                                                },
                                            ]}
                                            optionLabel="name"
                                            className="w-full md:w-14rem max-w-8rem"
                                        />
                                    </div>
                                    <div
                                        className="field col-1 "
                                        key={index + "qty"}
                                    >
                                        <label htmlFor="qty" className="mb-2 ">
                                            Quantidade
                                        </label>
                                        <InputNumber
                                            id="qty"
                                            value={item.qty}
                                            onValueChange={(
                                                e: InputNumberValueChangeEvent
                                            ) => {
                                                let newItems = formData;

                                                newItems.description[
                                                    index
                                                ].qty = e.value;
                                                setFormDataVersion(v4());
                                                setFormData(newItems);
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="field col-3 "
                                        key={index + "value"}
                                    >
                                        <label
                                            htmlFor="value"
                                            className="mb-2 "
                                        >
                                            Valor po unidade
                                        </label>
                                        <InputNumber
                                            id="value"
                                            locale="pt-BR"
                                            minFractionDigits={2}
                                            value={item.value}
                                            onValueChange={(
                                                e: InputNumberValueChangeEvent
                                            ) => {
                                                let newItems = formData;

                                                newItems.description[
                                                    index
                                                ].value = e.value;
                                                setFormDataVersion(v4());
                                                setFormData(newItems);
                                            }}
                                            className="w-full md:w-14rem max-w-15rem"
                                        />
                                    </div>
                                    <Button
                                        label=""
                                        key={index + "delete"}
                                        severity="danger"
                                        icon="pi pi-times"
                                        className="ml-6 mt-5 h-3rem"
                                        onClick={() =>
                                            setFormData({
                                                ...formData,
                                                description:
                                                    formData.description.filter(
                                                        (item, i) => i !== index
                                                    ),
                                            })
                                        }
                                    />
                                </div>
                            )
                        )}
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <Calendar
                                id="deadline"
                                showIcon
                                showButtonBar
                                dateFormat="dd/mm/yy"
                                value={
                                    formData.deadline
                                        ? new Date(formData.deadline)
                                        : null
                                }
                                onChange={(e) =>
                                    setFormData(
                                        (
                                            prevFormData: ProductQuotationInterface
                                        ) => ({
                                            ...prevFormData,
                                            deadline: convertData(
                                                e.target.value || new Date()
                                            ) as Date,
                                        })
                                    )
                                }
                            />
                            <label htmlFor="deadline">Data Limite</label>
                        </span>
                    </div>
                </div>
                <div className="flex gap-6 col-12 mt-6 ">
                    <SplitButton
                        onClick={() => sendForm(true)}
                        label="Criar"
                        icon="pi pi-check"
                        model={items}
                    ></SplitButton>
                </div>
            </div>
        </div>
    );
}
