"use client";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";

type UserType = {
    id: number;
    name: string;
    location: string;
    site: string;
    description: string;
    contactEmail: string;
    contactNumber: string;
    isClient: boolean;
    dockId: number;
    files: null;
    createdAt: string;
    updatedAt: string;
    lastVisit: string;
};

export default function ListClientPage() {
    const router = useRouter();
    const [clients, setClients] = useState<UserType[]>([]);
    const [diologVisible, setDialogVisible] = useState(false);
    const [clientToDelete, setClientToDelete] = useState<number | undefined>();

    useEffect(() => {
        fetch("http://askg80w.82.197.94.212.sslip.io/accounts/clients", {
            cache: "no-store",
        })
            .then((res) => res.json())
            .then((data) => {
                const reverseData = [...data].reverse();
                const formattedData = reverseData.map((client: UserType) => ({
                    id: client.id,
                    name: client.name,
                    contactEmail: client.contactEmail,
                    contactNumber: client.contactNumber,
                    lastVisit: new Date(client.lastVisit).toLocaleDateString(
                        "pt-BR"
                    ),
                    isClient: client.isClient,
                    location: client.location,
                    site: client.site,
                    description: client.description,
                    dockId: client.dockId,
                    files: client.files,
                    createdAt: client.createdAt,
                    updatedAt: client.updatedAt,
                }));
                setClients(formattedData);
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
                        label="Criar um novo cliente"
                        onClick={() => router.push("/clients/new")}
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

    const actionBodyTemplate = (rowData: UserType) => {
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
                        setClientToDelete(rowData.id);
                        setDialogVisible(true);
                    }}
                    rounded
                />
            </div>
        );
    };

    const handleEdit = (client: UserType) => {
        router.push(`/clients/${client.id}`);
    };

    const handleDelete = () => {
        fetch(
            `http://askg80w.82.197.94.212.sslip.io/accounts/clients/${clientToDelete}`,
            {
                method: "DELETE",
            }
        ).then(() => {
            setClientToDelete(undefined);
            setClients(clients.filter((c) => c.id !== Number(clientToDelete)));
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
                header="Exluir cliente"
                visible={diologVisible}
                style={{ width: "50vw" }}
                onHide={() => setDialogVisible(false)}
                footer={footerContentDiolog}
            >
                <p className="flex m-0 text-3xl font-bold">
                    Tem certeza que deseja excluir este cliente?
                </p>
                <p className="flex m-0 text-xl mt-4">
                    Ao excluir este cliente, os dados do mesmo serão perdidos
                </p>
            </Dialog>
            <div className="col-12">
                <div className="card">
                    <h1>Clientes</h1>
                    <DataTable
                        value={clients}
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
                            "name",
                            "contactEmail",
                            "contactNumber",
                            "lastVisit",
                            "location",
                        ]}
                    >
                        <Column
                            field="name"
                            header="Nome"
                            alignHeader={"center"}
                            sortable
                            style={{ minWidth: "12rem" }}
                        />
                        <Column
                            field="contactEmail"
                            header="Email"
                            alignHeader={"center"}
                            sortable
                            style={{ minWidth: "10rem", textAlign: "center" }}
                        />
                        <Column
                            field="contactNumber"
                            header="Numero de contato"
                            alignHeader={"center"}
                            sortable
                            style={{ maxWidth: "10rem", textAlign: "center" }}
                        />
                        <Column
                            field="lastVisit"
                            header="Ultima Visita"
                            alignHeader={"center"}
                            sortable
                            style={{ maxWidth: "7rem", textAlign: "center" }}
                        />
                        <Column
                            field="location"
                            header="Localização"
                            alignHeader={"center"}
                            sortable
                            style={{ minWidth: "12rem" }}
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
