"use client";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { DescriptionProductQuotation } from "./productQuotationInterface";

type ProductQuotationType = {
    id: number;
    type: string;
    status: "new" | "pending" | "finished";
    deadline: string | null;
    client: { disconnect: string[]; connect: string[] };
    qtyQuotations: number;
    createdAt: string;
    updatedAt: string;
};

type ProductQuotationStrapiType = {
    id: number;
    attributes: {
        type: string;
        status: "new" | "pending" | "finished";
        deadline: string;
        client: { disconnect: string[]; connect: string[] };
        description: DescriptionProductQuotation[];
        createdAt: string;
        updatedAt: string;
    };
};

export default function ListProductQuotation() {
    const router = useRouter();
    const [productQuotations, setProductQuotations] = useState<
        ProductQuotationType[]
    >([]);
    const [diologVisible, setDialogVisible] = useState(false);
    const [quotationToDelete, setQuotationToDelete] = useState<
        number | undefined
    >();

    const convertData = (unformatedDate: string) => {
        let date = new Date(unformatedDate);
        console.log(date);
        let isoDateStr = date.toLocaleDateString("pt-BR");
        return isoDateStr;
    };

    useEffect(() => {
        fetch("http://82.197.94.212:1337/api/product-quotations", {
            cache: "no-store",
        })
            .then((res) => res.json())
            .then((data) => {
                const reverseData = [...data.data].reverse();
                const formattedData: ProductQuotationType[] = reverseData.map(
                    (request: ProductQuotationStrapiType) => ({
                        id: request.id,
                        type: request.attributes.type,
                        qtyRequests: request.attributes.description.length,
                        status: request.attributes.status,
                        deadline: request.attributes.deadline
                            ? convertData(request.attributes.deadline)
                            : null,
                        client: request.attributes.client,
                        createdAt: request.attributes.createdAt,
                        updatedAt: request.attributes.updatedAt,
                        qtyQuotations: 0, // Add this line to include the qtyQuotations property
                    })
                );

                setProductQuotations(formattedData);
            });
    }, []);

    const filterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        console.log(value);
    };

    const clearFilter = () => {
        // initFilters();
    };

    const renderHeader = () => {
        return (
            <div className="flex gap-4 flex-column md:flex-row justify-content-between ">
                <div className="flex gap-4 justify-content-center flex-column md:flex-row">
                    <Button
                        type="button"
                        icon="pi pi-plus-circle"
                        label="Criar uma novo Orçamento"
                        onClick={() => router.push("/product_quotations/new")}
                    />
                    <Button
                        type="button"
                        icon="pi pi-filter-slash"
                        label="Clear"
                        outlined
                        onClick={clearFilter}
                    />
                </div>
                <div className="flex mt-4 md:mt-0">
                    <span className="w-full p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText
                            id="filter"
                            type="text"
                            onChange={(e) => filterChange(e)}
                        />
                    </span>
                </div>
            </div>
        );
    };

    const actionBodyTemplate = (rowData: ProductQuotationType) => {
        return (
            <div className="flex justify-content-center gap-4">
                <Button
                    icon="pi pi-pencil"
                    rounded
                    onClick={() => handleEdit(rowData)}
                />
                <Button
                    icon="pi pi-trash"
                    severity="danger"
                    onClick={() => {
                        setQuotationToDelete(rowData.id);
                        setDialogVisible(true);
                    }}
                    rounded
                />
            </div>
        );
    };

    const handleEdit = (request: ProductQuotationType) => {
        router.push(`/product_quotations/${request.id}`);
    };

    const handleDelete = () => {
        fetch(
            `http://82.197.94.212:1337/api/product-quotations/${quotationToDelete}`,
            {
                method: "DELETE",
            }
        ).then(() => {
            setQuotationToDelete(undefined);
            setProductQuotations(
                productQuotations.filter(
                    (c) => c.id !== Number(quotationToDelete)
                )
            );
        });
    };

    const footerContentDiolog = (
        <div>
            <Button
                label="Não"
                icon="pi pi-times"
                onClick={() => setDialogVisible(false)}
            />
            <Button
                label="Sim"
                icon="pi pi-check"
                severity="danger"
                onClick={() => {
                    setDialogVisible(false);
                    handleDelete();
                }}
                autoFocus
            />
        </div>
    );

    return (
        <div className="grid">
            <Dialog
                header="Exluir Orçamento"
                visible={diologVisible}
                style={{ width: "50vw" }}
                onHide={() => setDialogVisible(false)}
                footer={footerContentDiolog}
            >
                <p className="flex m-0 text-3xl font-bold">
                    Tem certeza que deseja excluir esta Orçamento?
                </p>
                <p className="flex m-0 text-xl mt-4">
                    Ao excluir estea Orçamento, os dados da mesmo serão perdidos
                </p>
            </Dialog>
            <div className="col-12">
                <div className="card">
                    <h1>Orçamentos</h1>
                    <DataTable
                        value={productQuotations}
                        paginator
                        className="p-datatable-gridlines"
                        showGridlines
                        rows={10}
                        dataKey="id"
                        filterDisplay="menu"
                        responsiveLayout="scroll"
                        emptyMessage="No customers found."
                        header={renderHeader}
                        globalFilterFields={[
                            "id",
                            "status",
                            "qtyRequests",
                            "deadline",
                        ]}
                    >
                        <Column
                            field="id"
                            header="ID"
                            alignHeader={"center"}
                            sortable
                            style={{ minWidth: "8rem", textAlign: "center" }}
                        />
                        <Column
                            field="status"
                            header="Status"
                            alignHeader={"center"}
                            sortable
                            style={{ minWidth: "8rem", textAlign: "center" }}
                        />
                        <Column
                            field="qtyRequests"
                            header="Quantidade de solicitações"
                            alignHeader={"center"}
                            sortable
                            style={{ maxWidth: "8rem", textAlign: "center" }}
                        />
                        <Column
                            field="deadline"
                            header="Data Limite"
                            alignHeader={"center"}
                            sortable
                            style={{ maxWidth: "7rem", textAlign: "center" }}
                        />
                        <Column
                            header="Ações"
                            alignHeader={"center"}
                            style={{ maxWidth: "8em" }}
                            body={actionBodyTemplate}
                        />
                    </DataTable>
                </div>
            </div>
        </div>
    );
}
