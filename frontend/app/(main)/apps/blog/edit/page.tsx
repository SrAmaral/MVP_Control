"use client";
import type { Demo } from "@/types";
import { Button } from "primereact/button";
import { Chip } from "primereact/chip";
import { Editor } from "primereact/editor";
import { FileUpload, ItemTemplateOptions } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useRef } from "react";

function BlogEdit() {
    const fileUploader = useRef<FileUpload | null>(null);
    const tags = ["Software", "Web"];

    const onContentButtonClick = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        onRemove: (
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>
        ) => void
    ) => {
        onRemove(event);
        event.stopPropagation();
    };

    const onFileUploadClick = () => {
        const inputEl = fileUploader.current?.getInput();
        inputEl?.click();
    };

    const emptyTemplate = () => {
        return (
            <div className="h-20rem m-1 border-round">
                <div
                    className="flex flex-column w-full h-full justify-content-center align-items-center cursor-pointer"
                    onClick={onFileUploadClick}
                >
                    <i className="pi pi-fw pi-file text-4xl text-primary"></i>
                    <span className="block font-semibold text-900 text-lg mt-3">
                        Drop or select a cover image
                    </span>
                </div>
            </div>
        );
    };

    const itemTemplate = (image: object, props: ItemTemplateOptions) => {
        const file = image as Demo.Base;
        return (
            <div className="h-20rem m-1 border-round">
                <div className="w-full h-full relative border-round p-0">
                    <img
                        src={file.objectURL}
                        className="w-full h-full border-round"
                        alt={file.name}
                    />
                    <Button
                        type="button"
                        icon="pi pi-times"
                        className="text-sm absolute justify-content-center align-items-center"
                        rounded
                        style={{ top: "-10px", right: "-10px" }}
                        onClick={(e) => onContentButtonClick(e, props.onRemove)}
                    ></Button>
                </div>
            </div>
        );
    };

    return (
        <div className="card">
            <span className="block text-900 font-bold text-xl mb-4">
                Create a new post
            </span>
            <div className="grid">
                <div className="col-12 lg:col-8">
                    <FileUpload
                        ref={fileUploader}
                        name="demo[]"
                        url="./upload.php"
                        itemTemplate={itemTemplate}
                        emptyTemplate={emptyTemplate}
                        multiple
                        customUpload
                        accept="image/*"
                        auto
                        className="upload-button-hidden border-1 surface-border surface-card p-0 border-round mb-4"
                    />
                    <div className="flex flex-column p-fluid">
                        <div className="mb-4">
                            <InputText type="text" placeholder="Title" />
                        </div>
                        <div className="mb-4">
                            <InputTextarea
                                rows={6}
                                placeholder="Content"
                                autoResize
                            ></InputTextarea>
                        </div>
                        <Editor style={{ height: "250px" }}></Editor>
                    </div>
                </div>
                <div className="col-12 lg:col-4">
                    <div className="border-1 surface-border border-round mb-4">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
                            Publish
                        </span>
                        <div className="p-3">
                            <div className="surface-100 p-3 flex align-items-center border-round">
                                <span className="text-900 font-semibold mr-3">
                                    Status:
                                </span>
                                <span className="font-medium">Draft</span>
                                <Button
                                    type="button"
                                    icon="pi pi-fw pi-pencil"
                                    rounded
                                    text
                                    className="ml-auto"
                                ></Button>
                            </div>
                        </div>
                        <div className="p-3">
                            <div className="surface-100 p-3 flex align-items-center border-round">
                                <span className="text-900 font-semibold mr-3">
                                    Visibility:
                                </span>
                                <span className="font-medium">Private</span>
                                <Button
                                    type="button"
                                    icon="pi pi-fw pi-pencil"
                                    rounded
                                    text
                                    className="ml-auto"
                                ></Button>
                            </div>
                        </div>
                    </div>
                    <div className="border-1 surface-border border-round mb-4">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
                            Tags
                        </span>
                        <div className="p-3 flex gap-2">
                            {tags.map((tag, i) => {
                                return <Chip key={i} label={tag}></Chip>;
                            })}
                        </div>
                    </div>
                    <div className="border-1 surface-border border-round p-fluid mb-4">
                        <span className="text-900 font-bold block border-bottom-1 surface-border p-3">
                            Meta
                        </span>
                        <div className="p-3">
                            <div className="mb-4">
                                <InputText type="text" placeholder="Title" />
                            </div>
                            <div>
                                <InputTextarea
                                    rows={6}
                                    placeholder="Description"
                                    autoResize
                                ></InputTextarea>{" "}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-content-between gap-3">
                        <Button
                            className="flex-1"
                            outlined
                            severity="danger"
                            label="Discard"
                            icon="pi pi-fw pi-trash"
                        ></Button>
                        <Button
                            className="flex-1"
                            label="Publish"
                            icon="pi pi-fw pi-check"
                        ></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogEdit;
