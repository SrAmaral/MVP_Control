"use client";
import React, { use, useEffect, useState } from "react";
import {
    DescriptionProductQuotation,
    ProductQuotationInterface,
} from "./productQuotationInterface";
import { useParams } from "next/navigation";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

function ApproveProducteQuotationDcoument() {
    const [quotationData, setQuotationData] =
        useState<ProductQuotationInterface>({
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

    const [diologVisible, setDialogVisible] = useState(false);
    const [diologType, setDialogType] = useState<string>("");
    const { quotationId } = useParams();

    useEffect(() => {
        fetch(`http://82.197.94.212:1337/api/product-quotations/${quotationId}`)
            .then((response) => response.json())
            .then((data) => {
                const request = data.data;
                setQuotationData({
                    client: request.attributes.client,
                    deadline: request.attributes.deadline,
                    description: request.attributes.description,
                    status: request.attributes.status,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }, [quotationId]);

    const convertData = (unformatedDate: string) => {
        let date = new Date(unformatedDate);
        console.log(date);
        let isoDateStr = date.toLocaleDateString("pt-BR");
        return isoDateStr;
    };

    const footerContentDiolog = () => {
        return (
            <div>
                <Button
                    label="Não"
                    icon="pi pi-times"
                    onClick={() => setDialogVisible(false)}
                />
                <Button
                    label="Sim"
                    icon="pi pi-check"
                    severity={diologType === "approved" ? "success" : "danger"}
                    onClick={() => {
                        let quotation = quotationData;
                        quotation.status =
                            diologType === "approved" ? "approved" : "rejected";
                        if (!!quotation) {
                            fetch(
                                `http://82.197.94.212:1337/api/product-quotations/${quotationId}`,
                                {
                                    method: "PUT",
                                    body: JSON.stringify({
                                        data: quotation,
                                    }),
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                }
                            );
                        }
                        setDialogVisible(false);
                    }}
                    autoFocus
                />
            </div>
        );
    };

    const convertToMonetary = (value: string | number) => {
        let newValue: number | string = value;
        if (typeof value === "number") {
            newValue = value.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            });
        } else if (typeof value === "string") {
            newValue = parseFloat(value).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
            });
        }
        return newValue;
    };

    return (
        <div className="card py-8 px-6 md:px-8 overflow-auto">
            <Dialog
                header="Exluir Orçamento"
                visible={diologVisible}
                style={{ width: "50vw" }}
                onHide={() => setDialogVisible(false)}
                footer={footerContentDiolog}
            >
                <p className="flex m-0 text-3xl font-bold">
                    Tem certeza que deseja{" "}
                    {diologType === "approved" ? "aprovar" : "rejeitar"} esta
                    Orçamento?
                </p>
                <p className="flex m-0 text-xl mt-4">
                    Ao {diologType == "approved" ? "aprovar" : "rejeitar"} estea
                    Orçamento, a ação não podera ser desfeita.
                </p>
            </Dialog>
            <div className="flex flex-column align-items-start md:flex-row md:align-items-center md:justify-content-between border-bottom-1 surface-border pb-5 min-w-max">
                <div className="flex flex-column">
                    <svg
                        width="48"
                        height="50"
                        viewBox="0 0 48 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M33.1548 9.65956L23.9913 4.86169L5.54723 14.5106L0.924465 12.0851L23.9913 0L37.801 7.23403L33.1548 9.65956ZM23.9931 19.3085L42.4255 9.65955L47.0717 12.0851L23.9931 24.1595L10.1952 16.9361L14.8297 14.5106L23.9931 19.3085ZM4.6345 25.8937L0 23.4681V37.9149L23.0669 50V45.1489L4.6345 35.4894V25.8937ZM18.4324 28.2658L0 18.6169V13.7658L23.0669 25.8403V40.2977L18.4324 37.8615V28.2658ZM38.7301 23.468V18.6169L24.9205 25.8403V49.9999L29.555 47.5743V28.2659L38.7301 23.468ZM43.3546 35.4892V16.1914L48.0008 13.7659V37.9148L34.1912 45.1488V40.2977L43.3546 35.4892Z"
                            fill="var(--primary-color)"
                        />
                    </svg>
                    <div className="my-3 text-4xl font-bold text-900">
                        YOUR COMPANY
                    </div>
                    <span className="mb-2">9137 3rd Lane California City</span>
                    <span>CA 93504, U.S.A.</span>
                </div>
                <div className="flex flex-column mt-5 md:mt-0">
                    <div className="text-2xl font-semibold text-left md:text-right mb-3">
                        COTAÇÃO
                    </div>
                    <div className="flex flex-column">
                        <div className="flex justify-content-between align-items-center mb-2">
                            <span className="font-semibold mr-6">DATE</span>
                            <span>xx/xx/xxxx</span>
                        </div>
                        <div className="flex justify-content-between align-items-center mb-2">
                            <span className="font-semibold mr-6">
                                Cotação #
                            </span>
                            <span>{quotationId}</span>
                        </div>
                        <div className="flex justify-content-between align-items-center">
                            <span className="font-semibold mr-6">
                                CUSTOMER ID
                            </span>
                            <span>xxxxx</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-5 mb-8 flex flex-column">
                <div className="mb-3 text-2xl font-medium">IFORMAÇÔES</div>
                <span className="mb-2">
                    Data limite para entrega:{" "}
                    {quotationData.deadline !== null
                        ? convertData(quotationData.deadline as string)
                        : "N/A"}
                </span>
            </div>

            <div className="overflow-x-auto">
                <table
                    className="w-full"
                    style={{
                        borderCollapse: "collapse",
                        tableLayout: "auto",
                    }}
                >
                    <thead>
                        <tr>
                            <th className="text-left font-semibold py-3 border-bottom-1 surface-border white-space-nowrap">
                                Descrição
                            </th>
                            <th className="text-right font-semibold py-3 border-bottom-1 surface-border white-space-nowrap px-3">
                                Tipo de Serviço
                            </th>
                            <th className="text-right font-semibold py-3 border-bottom-1 surface-border white-space-nowrap px-3">
                                Prioridade
                            </th>
                            <th className="text-right font-semibold py-3 border-bottom-1 surface-border white-space-nowrap">
                                Quantidade
                            </th>
                            <th className="text-right font-semibold py-3 border-bottom-1 surface-border white-space-nowrap">
                                Valor
                            </th>
                            <th className="text-right font-semibold py-3 border-bottom-1 surface-border white-space-nowrap">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotationData.description.map(
                            (
                                description: DescriptionProductQuotation,
                                index: number
                            ) => (
                                <tr key={index}>
                                    <td className="text-left py-3 border-bottom-1 surface-border white-space-nowrap">
                                        {description.description}
                                    </td>
                                    <td className="text-right py-3 border-bottom-1 surface-border px-3">
                                        {description.type.name}
                                    </td>
                                    <td className="text-right py-3 border-bottom-1 surface-border px-3">
                                        {description.priority.name}
                                    </td>
                                    <td className="text-right py-3 border-bottom-1 surface-border px-3">
                                        {description.qty}
                                    </td>
                                    <td className="text-right py-3 border-bottom-1 surface-border px-3">
                                        {" "}
                                        {description.value !== null &&
                                        description.value !== undefined
                                            ? convertToMonetary(
                                                  description.value
                                              )
                                            : "N/A"}
                                    </td>
                                    <td className="text-right py-3 border-bottom-1 surface-border">
                                        {description.qty !== null &&
                                        description.value !== null
                                            ? " " +
                                              convertToMonetary(
                                                  (description.qty ?? 0) *
                                                      (description.value ?? 0)
                                              )
                                            : 0}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table>
            </div>

            <div className="flex flex-column md:flex-row md:align-items-start md:justify-content-between mt-8">
                <div className="font-semibold mb-3 md:mb-0">NOTES</div>
                <div className="flex flex-column">
                    <div className="flex justify-content-between align-items-center mb-2">
                        <span className="font-semibold mr-6">SUBTOTAL</span>
                        <span>
                            {" " +
                                convertToMonetary(
                                    quotationData.description.reduce((a, b) => {
                                        if (
                                            b.qty !== null &&
                                            b.qty !== undefined
                                        ) {
                                            return (
                                                a +
                                                (b.qty !== null &&
                                                b.value !== null &&
                                                b.value !== undefined
                                                    ? b.qty * b.value
                                                    : 0)
                                            );
                                        } else {
                                            return a;
                                        }
                                    }, 0)
                                )}
                        </span>
                    </div>
                    <div className="flex justify-content-between align-items-center mb-2">
                        <span className="font-semibold mr-6">VAT #</span>
                        <span>0</span>
                    </div>
                    <div className="flex justify-content-between align-items-center">
                        <span className="font-semibold mr-6">TOTAL</span>
                        <span>
                            {" " +
                                convertToMonetary(
                                    quotationData.description.reduce((a, b) => {
                                        if (
                                            b.qty !== null &&
                                            b.qty !== undefined
                                        ) {
                                            return (
                                                a +
                                                (b.qty !== null &&
                                                b.value !== null &&
                                                b.value !== undefined
                                                    ? b.qty * b.value
                                                    : 0)
                                            );
                                        } else {
                                            return a;
                                        }
                                    }, 0)
                                )}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex justify-content-end gap-4 col-12 mt-8 ">
                <Button
                    onClick={() => {
                        setDialogType("approved");
                        setDialogVisible(true);
                    }}
                    severity="success"
                    label="Aprovar Orçamento"
                    icon="pi pi-check"
                ></Button>
                <Button
                    onClick={() => {
                        setDialogType("rejected");
                        setDialogVisible(true);
                    }}
                    severity="danger"
                    label="Reprovar Orçamento"
                    icon="pi pi-times"
                ></Button>
            </div>
        </div>
    );
}

export default ApproveProducteQuotationDcoument;
