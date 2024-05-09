import type { AppMailReplyProps, Demo } from "@/types";
import { Button } from "primereact/button";
import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { Tooltip } from "primereact/tooltip";
import React, { useContext, useState } from "react";
import { MailContext } from "./context/mailcontext";

function AppMailReply(props: AppMailReplyProps) {
    const content = props.content;
    const [newMail, setNewMail] = useState<Demo.Mail>({
        id: 0,
        from: content?.from ?? "",
        to: content?.to ?? "",
        email: "",
        image: "",
        title: content?.title ?? "",
        message: "",
        date: "",
        important: false,
        starred: false,
        trash: false,
        spam: false,
        archived: false,
        sent: true,
    });
    const [displayMessage, setDisplayMessage] = useState(false);
    const { onSend, toastRef } = useContext(MailContext);

    const sendMail = () => {
        let { image, from, title } = content as Demo.Mail;
        setNewMail((prevState) => ({
            ...prevState,
            to: from,
            title: title,
            image: image,
        }));
        onSend(newMail);

        toastRef.current?.show({
            severity: "success",
            summary: "Success",
            detail: "Mail sent",
        });
        props.hide();
    };

    const toggleMessage = () => {
        setDisplayMessage((prevState) => !prevState);
    };

    return (
        <React.Fragment>
            {content ? (
                <div className="p-0 m-0">
                    <div className="surface-section grid grid-nogutter formgrid flex-column md:flex-row gap-6 p-5 border-round">
                        <div className="col">
                            <label
                                htmlFor="to"
                                className="block text-900 font-semibold mb-3"
                            >
                                To
                            </label>
                            <span
                                className="p-input-icon-left w-full"
                                style={{ height: "3.5rem" }}
                            >
                                <i
                                    className="pi pi-user"
                                    style={{ left: "1.5rem" }}
                                ></i>
                                <InputText
                                    id="to"
                                    type="text"
                                    value={newMail.from}
                                    onChange={(e) =>
                                        setNewMail((prevState) => ({
                                            ...prevState,
                                            from: e.target.value,
                                        }))
                                    }
                                    className="w-full pl-7 text-900 font-semibold"
                                    style={{ height: "3.5rem" }}
                                />
                            </span>
                        </div>
                        <div className="col">
                            <label
                                htmlFor="Subject"
                                className="block text-900 font-semibold mb-3"
                            >
                                Subject
                            </label>
                            <span
                                className="p-input-icon-left w-full"
                                style={{ height: "3.5rem" }}
                            >
                                <i
                                    className="pi pi-pencil"
                                    style={{ left: "1.5rem" }}
                                ></i>
                                <InputText
                                    id="subject"
                                    type="text"
                                    value={newMail.title}
                                    onChange={(e) =>
                                        setNewMail((prevState) => ({
                                            ...prevState,
                                            title: e.target.value,
                                        }))
                                    }
                                    placeholder="Subject"
                                    className="w-full pl-7 text-900 font-semibold"
                                    style={{ height: "3.5rem" }}
                                />
                            </span>
                        </div>
                        {displayMessage ? (
                            <div className="border-1 surface-border border-round p-4">
                                {content.message}
                            </div>
                        ) : null}
                        <div className="col-12 field">
                            <Tooltip
                                target=".toggle-content"
                                content={
                                    displayMessage
                                        ? "Hide Content"
                                        : "Show Content"
                                }
                            />
                            <span
                                className="toggle-content surface-ground cursor-pointer border-round px-2"
                                onClick={toggleMessage}
                            >
                                <i className="pi pi-ellipsis-h"></i>
                            </span>
                            <Editor
                                style={{ height: "250px" }}
                                className="mt-3"
                                value={newMail.message}
                                onTextChange={(e) =>
                                    setNewMail((prevState) => ({
                                        ...prevState,
                                        message: e.htmlValue ?? "",
                                    }))
                                }
                            ></Editor>
                        </div>
                    </div>
                    <div className="flex column-gap-3 justify-content-end p-5 border-top-1 surface-border">
                        <Button
                            type="button"
                            outlined
                            icon="pi pi-image"
                        ></Button>
                        <Button
                            type="button"
                            outlined
                            icon="pi pi-paperclip"
                        ></Button>
                        <Button
                            type="button"
                            className="h-3rem"
                            icon="pi pi-send"
                            label="Send"
                            onClick={sendMail}
                        ></Button>
                    </div>
                </div>
            ) : null}
        </React.Fragment>
    );
}

export default AppMailReply;
