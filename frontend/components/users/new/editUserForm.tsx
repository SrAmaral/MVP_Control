"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputMask } from "primereact/inputmask";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { useRouter, useParams } from "next/navigation";
import { Dropdown } from "primereact/dropdown";
import { userInterface, userInterfaceSetup } from "./userInterface";

export default function EditUserForm() {
    const [formData, setFormData] = useState<userInterface>(userInterfaceSetup);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast>(null);
    const router = useRouter();
    const { userId } = useParams();

    const showSuccess = () => {
        toast.current?.show({
            severity: "success",
            summary: "Sucesso",
            detail: "O funcionario foi editado com sucesso",
            life: 3000,
        });
    };
    const showError = () => {
        toast.current?.show({
            severity: "error",
            summary: "Erro",
            detail: "Não foi possivel cadastrar o funcionario",
            life: 3000,
        });
    };

    useEffect(() => {
        fetch(`http://askg80w.82.197.94.212.sslip.io/accounts/users/${userId}`)
            .then((response) => response.json())
            .then((data) => {
                setFormData(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, [userId]);
    console.log(formData);
    const sendForm = (redirect: boolean = false) => {
        setSubmitted(true);

        fetch(
            `http://askg80w.82.197.94.212.sslip.io/accounts/users/${userId}`,
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
                        router.push("/users");
                    }, 3500);
                } else {
                    setSubmitted(false);
                    setFormData(userInterfaceSetup);
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

    const rolesOptions = [
        { label: "Administrador", value: "admin" },
        { label: "Gerencia", value: "gerency" },
        { label: "Vendas", value: "selling" },
        { label: "Tecnico", value: "technician" },
    ];

    return (
        <div className="grid col-12 card h-full p-0">
            <Toast ref={toast} />
            <div className="card w-full">
                <div className="flex justify-content-between">
                    <h1>Novo Funcionario</h1>
                    <Link href="/users">
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
                                        (prevFormData: userInterface) => ({
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
                            <label htmlFor="name">Nome do funcioanario</label>
                        </span>
                        {submitted && !formData.name && (
                            <small id="name-help" className="p-error">
                                Adicione um nome para o funcionario
                            </small>
                        )}
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <Dropdown
                                id="role"
                                value={formData.role}
                                options={rolesOptions}
                                onChange={(e) => {
                                    setFormData(
                                        (prevFormData: userInterface) => ({
                                            ...prevFormData,
                                            role: e.target.value,
                                        })
                                    );
                                }}
                            />
                            <label htmlFor="role">Tipo de usuario</label>
                        </span>
                    </div>
                    <div className="field col-12 md:col-6">
                        <span className="p-float-label">
                            <InputText
                                id="email"
                                type="text"
                                value={formData.email}
                                onChange={(e) => {
                                    setFormData(
                                        (prevFormData: userInterface) => ({
                                            ...prevFormData,
                                            email: e.target.value,
                                        })
                                    );
                                }}
                                className={
                                    submitted && !formData.email
                                        ? "p-invalid"
                                        : ""
                                }
                            />
                            <label htmlFor="email">Email do funcionario</label>
                        </span>
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
                                        (prevFormData: userInterface) => ({
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
                                Adicione um telefone para o funcionario
                            </small>
                        )}
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
