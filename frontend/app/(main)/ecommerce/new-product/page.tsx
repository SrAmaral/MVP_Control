"use client";
import type { Demo } from "@/types";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import {
    FileUpload,
    FileUploadSelectEvent,
    FileUploadUploadEvent,
    ItemTemplateOptions,
} from "primereact/fileupload";
import { InputSwitch } from "primereact/inputswitch";
import { InputText } from "primereact/inputtext";
import { classNames } from "primereact/utils";
import React, { useRef, useState } from "react";

function NewProduct() {
    const colorOptions = [
        { name: "Black", background: "bg-gray-900" },
        { name: "Orange", background: "bg-orange-500" },
        { name: "Navy", background: "bg-blue-500" },
    ];

    const [product, setProduct] = useState<Demo.Product>({
        name: "",
        price: 0,
        code: "",
        sku: "",
        status: "Draft",
        tags: ["Nike", "Sneaker"],
        category: "Sneakers",
        colors: [],
        stock: "Sneakers",
        inStock: true,
        description: "",
        images: [],
    });

    const [selectedCategory, setSelectedCategory] = useState(product.category);
    const [selectedStock, setSelectedStock] = useState(product.category);
    const categoryOptions = ["Sneakers", "Apparel", "Socks"];

    const fileUploader = useRef<FileUpload>(null);

    const chipTemplate = (tag: string) => {
        return (
            <React.Fragment>
                <span className="mr-3">{tag}</span>
                <span
                    className="chip-remove-icon flex align-items-center justify-content-center border-1 surface-border bg-gray-100 border-circle cursor-pointer"
                    onClick={() => onChipRemove(tag)}
                >
                    <i className="pi pi-fw pi-times text-black-alpha-60"></i>
                </span>
            </React.Fragment>
        );
    };

    const onImageMouseOver = (
        ref: React.RefObject<Button>,
        fileName: string
    ) => {
        if ((ref.current as any).id === fileName)
            (ref.current as any).style.display = "flex";
    };

    const onImageMouseLeave = (
        ref: React.RefObject<Button>,
        fileName: string
    ) => {
        if ((ref.current as any).id === fileName) {
            (ref.current as any).style.display = "none";
        }
    };

    const onChipRemove = (item: string) => {
        const newTags = (product.tags as string[])?.filter((i) => i !== item);
        setProduct((prevState) => ({ ...prevState, tags: newTags }));
    };

    const onColorSelect = (colorName: string, i: number) => {
        if ((product.colors as string[])?.indexOf(colorName) !== -1) {
            (product.colors as string[]).splice(
                (product.colors as string[]).indexOf(colorName),
                1
            );
            setProduct((prevState) => ({
                ...prevState,
                colors: (prevState.colors as string[]).filter(
                    (color) => color !== colorName
                ),
            }));
        } else {
            setProduct((prevState) => ({
                ...prevState,
                colors: [...(prevState.colors as string[]), colorName],
            }));
        }
    };

    const onUpload = (event: FileUploadUploadEvent | FileUploadSelectEvent) => {
        setProduct((prevState) => ({ ...prevState, images: event.files }));
    };

    const onFileUploadClick = () => {
        const inputEl = fileUploader.current?.getInput();
        inputEl?.click();
    };

    const emptyTemplate = () => {
        return (
            <div
                className="h-15rem overflow-y-auto py-3 border-round"
                style={{ cursor: "copy" }}
            >
                <div
                    className="flex flex-column w-full h-full justify-content-center align-items-center"
                    onClick={onFileUploadClick}
                >
                    <i className="pi pi-file text-4xl text-primary"></i>
                    <span className="block font-semibold text-900 text-lg mt-3">
                        Drop or select images
                    </span>
                </div>
            </div>
        );
    };

    const itemTemplate = (file: object, props: ItemTemplateOptions) => {
        const item = file as Demo.Base;
        const buttonEl = React.createRef<Button>();
        return (
            <div
                className="flex h-15rem overflow-y-auto py-3 border-round"
                style={{ cursor: "copy" }}
                onClick={onFileUploadClick}
            >
                <div className="flex flex-row flex-wrap gap-3 border-round">
                    <div
                        className="h-full relative w-7rem h-7rem border-3 border-transparent border-round hover:bg-primary transition-duration-100 cursor-auto"
                        onMouseEnter={() =>
                            onImageMouseOver(buttonEl, item.name)
                        }
                        onMouseLeave={() =>
                            onImageMouseLeave(buttonEl, item.name)
                        }
                        style={{ padding: "1px" }}
                    >
                        <img
                            src={item.objectURL}
                            className="w-full h-full border-round shadow-2"
                            alt={item.name}
                        />
                        <Button
                            ref={buttonEl}
                            id={item.name}
                            type="button"
                            icon="pi pi-times"
                            className="hover:flex text-sm absolute justify-content-center align-items-center cursor-pointer w-2rem h-2rem"
                            rounded
                            style={{
                                top: "-10px",
                                right: "-10px",
                                display: "none",
                            }}
                            onClick={(event) => {
                                event.stopPropagation();
                                props.onRemove(event);
                            }}
                        ></Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <span className="block text-900 font-bold text-xl mb-4">
                Create Product
            </span>
            <div className="grid grid-nogutter flex-wrap gap-3 p-fluid">
                <div className="col-12 lg:col-8">
                    <div className="grid formgrid">
                        <div className="col-12 field">
                            <InputText
                                type="text"
                                value={product.name}
                                onChange={(e) =>
                                    setProduct((prevState) => ({
                                        ...prevState,
                                        name: e.target.value,
                                    }))
                                }
                                placeholder="Product Name"
                            />
                        </div>
                        <div className="col-12 lg:col-4 field">
                            <InputText
                                type="text"
                                placeholder="Price"
                                value={product.price?.toString()}
                                onChange={(e) =>
                                    setProduct((prevState) => ({
                                        ...prevState,
                                        price: parseFloat(e.target.value),
                                    }))
                                }
                            />
                        </div>
                        <div className="col-12 lg:col-4 field">
                            <InputText
                                type="text"
                                placeholder="Product Code"
                                value={product.code}
                                onChange={(e) =>
                                    setProduct((prevState) => ({
                                        ...prevState,
                                        code: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="col-12 lg:col-4 field">
                            <InputText
                                type="text"
                                placeholder="Product SKU"
                                value={product.sku as string}
                                onChange={(e) =>
                                    setProduct((prevState) => ({
                                        ...prevState,
                                        sku: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div className="col-12 field">
                            <Editor
                                value={product.description}
                                style={{ height: "250px" }}
                            ></Editor>
                        </div>
                        <div className="col-12 field">
                            <FileUpload
                                ref={fileUploader}
                                name="demo[]"
                                url="./upload.php"
                                itemTemplate={itemTemplate}
                                emptyTemplate={emptyTemplate}
                                onUpload={onUpload}
                                customUpload={true}
                                multiple
                                onSelect={onUpload}
                                accept="image/*"
                                auto
                                className={
                                    "upload-button-hidden border-1 surface-border surface-card border-round"
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full lg:w-3 xl:w-4 flex flex-column row-gap-3">
                    <div className="border-1 surface-border border-round">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
                            Publish
                        </span>
                        <div className="p-3">
                            <div className="bg-gray-100 py-2 px-3 flex align-items-center border-round">
                                <span className="text-black-alpha-90 font-bold mr-3">
                                    Status:
                                </span>
                                <span className="text-black-alpha-60 font-semibold">
                                    {product.status as string}
                                </span>
                                <Button
                                    type="button"
                                    icon="pi pi-fw pi-pencil"
                                    className="text-black-alpha-60 ml-auto"
                                    rounded
                                    text
                                ></Button>
                            </div>
                        </div>
                    </div>

                    <div className="border-1 surface-border border-round">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
                            Tags
                        </span>
                        <div className="p-3 flex flex-wrap gap-1">
                            {(product.tags as string[])?.map((tag, i) => {
                                return (
                                    <Chip
                                        key={i}
                                        className="mr-2 py-2 px-3 text-900 font-bold surface-card border-1 surface-border"
                                        style={{ borderRadius: "20px" }}
                                        template={() => chipTemplate(tag)}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <div className="border-1 surface-border border-round">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
                            Category
                        </span>
                        <div className="p-3">
                            <Dropdown
                                options={categoryOptions}
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.value)}
                                placeholder="Select a category"
                            ></Dropdown>
                        </div>
                    </div>

                    <div className="border-1 surface-border border-round">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
                            Colors
                        </span>
                        <div className="p-3 flex">
                            {colorOptions.map((color, i) => {
                                return (
                                    <div
                                        key={i}
                                        className={classNames(
                                            "w-2rem h-2rem mr-2 border-1 surface-border border-circle cursor-pointer flex justify-content-center align-items-center",
                                            color.background
                                        )}
                                        onClick={() => {
                                            onColorSelect(color.name, i);
                                        }}
                                    >
                                        {(product.colors as string[]).includes(
                                            color.name
                                        ) ? (
                                            <i
                                                key={i}
                                                className="pi pi-check text-sm text-white z-5"
                                            ></i>
                                        ) : null}
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="border-1 surface-border border-round">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
                            Stock
                        </span>
                        <div className="p-3">
                            <Dropdown
                                options={categoryOptions}
                                value={selectedStock}
                                onChange={(e) => setSelectedStock(e.value)}
                                placeholder="Select stock"
                            ></Dropdown>
                        </div>
                    </div>

                    <div className="border-1 surface-border flex justify-content-between align-items-center py-2 px-3 border-round">
                        <span className="text-900 font-bold p-3">In stock</span>
                        <InputSwitch
                            checked={product.inStock as boolean}
                            onChange={(e) =>
                                setProduct((prevState) => ({
                                    ...prevState,
                                    inStock: e.value as boolean,
                                }))
                            }
                        ></InputSwitch>
                    </div>

                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center gap-3 py-2">
                        <Button
                            className="flex-1"
                            severity="danger"
                            outlined
                            label="Discard"
                            icon="pi pi-fw pi-trash"
                        ></Button>
                        <Button
                            className="flex-1 border-round"
                            label="Save"
                            icon="pi pi-fw pi-check"
                        ></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewProduct;
