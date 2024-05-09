"use client";
import type { Demo } from "@/types";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";

function ProfileCreate() {
    const [countries, setCountries] = useState<Demo.Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<Demo.Country | {}>(
        {}
    );
    useEffect(() => {
        setCountries([
            { name: "Australia", code: "AU" },
            { name: "Brazil", code: "BR" },
            { name: "China", code: "CN" },
            { name: "Egypt", code: "EG" },
            { name: "France", code: "FR" },
            { name: "Germany", code: "DE" },
            { name: "India", code: "IN" },
            { name: "Japan", code: "JP" },
            { name: "Spain", code: "ES" },
            { name: "United States", code: "US" },
        ]);
    }, []);

    const itemTemplate = (option: any) => {
        return (
            <div className="flex align-items-center">
                <img
                    src={`/demo/images/flag/flag_placeholder.png`}
                    onError={(e) =>
                        ((e.target as HTMLImageElement).src =
                            "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")
                    }
                    className={"mr-2 flag flag-" + option.code.toLowerCase()}
                    style={{ width: "18px" }}
                    alt={option.name}
                />
                <div>{option.name}</div>
            </div>
        );
    };

    return (
        <div className="card">
            <span className="text-900 text-xl font-bold mb-4 block">
                Create User
            </span>
            <div className="grid">
                <div className="col-12 lg:col-2">
                    <div className="text-900 font-medium text-xl mb-3">
                        Profile
                    </div>
                    <p className="m-0 p-0 text-600 line-height-3 mr-3">
                        Odio euismod lacinia at quis risus sed vulputate odio.
                    </p>
                </div>
                <div className="col-12 lg:col-10">
                    <div className="grid formgrid p-fluid">
                        <div className="field mb-4 col-12">
                            <label
                                htmlFor="nickname"
                                className="font-medium text-900"
                            >
                                Nickname
                            </label>
                            <InputText id="nickname" type="text" />
                        </div>
                        <div className="field mb-4 col-12">
                            <label
                                htmlFor="avatar"
                                className="font-medium text-900"
                            >
                                Avatar
                            </label>
                            <FileUpload
                                mode="basic"
                                name="avatar"
                                url="./upload.php"
                                accept="image/*"
                                maxFileSize={1000000}
                                chooseOptions={{
                                    label: "Uplaod Image",
                                    className:
                                        "p-button-outlined p-button-plain",
                                }}
                            ></FileUpload>
                        </div>
                        <div className="field mb-4 col-12">
                            <label
                                htmlFor="bio"
                                className="font-medium text-900"
                            >
                                Bio
                            </label>
                            <InputTextarea
                                id="bio"
                                rows={5}
                                autoResize
                            ></InputTextarea>
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label
                                htmlFor="email"
                                className="font-medium text-900"
                            >
                                Email
                            </label>
                            <InputText id="email" type="text" />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label
                                htmlFor="country"
                                className="font-medium text-900"
                            >
                                Country
                            </label>
                            <Dropdown
                                inputId="country"
                                options={countries}
                                itemTemplate={itemTemplate}
                                onChange={(e) => setSelectedCountry(e.value)}
                                value={selectedCountry}
                                optionLabel="name"
                                filter
                                filterBy="name"
                                showClear
                                placeholder="Select a Country"
                            />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label
                                htmlFor="city"
                                className="font-medium text-900"
                            >
                                City
                            </label>
                            <InputText id="city" type="text" />
                        </div>
                        <div className="field mb-4 col-12 md:col-6">
                            <label
                                htmlFor="state"
                                className="font-medium text-900"
                            >
                                State
                            </label>
                            <InputText id="state" type="text" />
                        </div>
                        <div className="field mb-4 col-12">
                            <label
                                htmlFor="website"
                                className="font-medium text-900"
                            >
                                Website
                            </label>
                            <div className="p-inputgroup">
                                <span className="p-inputgroup-addon">www</span>
                                <InputText id="website" type="text" />
                            </div>
                        </div>
                        <div className="col-12">
                            <Button
                                label="Create User"
                                className="w-auto mt-3"
                            ></Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCreate;
