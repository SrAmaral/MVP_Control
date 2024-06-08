"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Toast } from "primereact/toast";
import { useParams, useRouter } from "next/navigation";
import {
    DescriptionProductRequest,
    ProductRequestInterface,
} from "./productRequestInterface";
import { InputTextarea } from "primereact/inputtextarea";
import { ListBox, ListBoxChangeEvent } from "primereact/listbox";
import {
    InputNumber,
    InputNumberValueChangeEvent,
} from "primereact/inputnumber";
import { v4 } from "uuid";

export default function EditProductRequestForm() {
    const [formData, setFormData] = useState<ProductRequestInterface>({
        status: "new",
        deadline: null,
        client: {
            disconnect: [],
            connect: [],
        },
        description: [
            {
                description: "",
                type: "service",
                priority: "low",
                qty: null,
            },
        ],
    });
    const [formDataVersion, setFormDataVersion] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const { requestId } = useParams();

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

    useEffect(() => {
        fetch(`http://82.197.94.212:1337/api/product-requests/${requestId}`)
            .then((response) => response.json())
            .then((data) => {
                const request = data.data;
                setFormData({
                    client: request.attributes.client,
                    deadline: request.attributes.deadline,
                    description: request.attributes.description,
                    status: request.attributes.status,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, [requestId]);

    const sendForm = (redirect: boolean = false) => {
        // setSubmitted(true);

        fetch(`http://82.197.94.212:1337/api/product-requests/${requestId}`, {
            method: "PUT",
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
                        router.push("/product_requests");
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
                                type: "service",
                                priority: "low",
                                qty: null,
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
    const generateQuotation = (redirect: boolean = false) => {
        // setSubmitted(true);
        console.log(formData);
        fetch(`http://82.197.94.212:1337/api/product-quotations`, {
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
                console.log(data.data.id);
                if (redirect) {
                    setTimeout(() => {
                        router.push(`/product_quotations/${data.data.id}`);
                    }, 2500);
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
                                type: "service",
                                priority: "low",
                                qty: 0,
                            });

                            setFormDataVersion(v4());
                            setFormData(newItems);
                        }}
                    />
                    <div className="p-fluid row-gap-6  grid mt-4 col-12 flex-row">
                        {formData.description.map(
                            (item: DescriptionProductRequest, index) => (
                                <div key={index} className="grid col-12">
                                    <div
                                        className="field col-6"
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
                                        className="field col-2"
                                        key={index + "type"}
                                    >
                                        <label htmlFor="type" className="mb-2 ">
                                            tipo
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
                                            className="w-full md:w-14rem"
                                        />
                                    </div>
                                    <div
                                        className="field col-2"
                                        key={index + "priority"}
                                    >
                                        <label
                                            htmlFor="priority"
                                            className="mb-2 "
                                        >
                                            tipo
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
                                            className="w-full md:w-14rem"
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
                                            prevFormData: ProductRequestInterface
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
                    <Button
                        onClick={() => sendForm(true)}
                        label="Salvar"
                        icon="pi pi-check"
                    ></Button>
                    <Button
                        onClick={() => generateQuotation(true)}
                        severity="success"
                        label="Gerar Orçamento"
                        icon="pi pi-file"
                    ></Button>
                </div>
            </div>
        </div>
    );
}
