"use client";

import { useRouter } from "next/navigation";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Editor } from "primereact/editor";
import { Toast } from "primereact/toast";
import { useContext, useEffect, useRef, useState } from "react";
import { MailContext } from "../../../../../../../demo/components/apps/mail/context/mailcontext";

import type { Demo } from "@/types";
import { useSearchParams } from "next/navigation";

const AppMailDetail = ({ params }: { params: { mailId: string } }) => {
    const searchParams = useSearchParams();

    const toast = useRef<Toast | null>(null);
    const [mail, setMail] = useState<Demo.Mail | null>(null);
    const [newMail, setNewMail] = useState<Demo.Mail>({
        id: 0,
        from: "",
        to: "",
        email: "",
        image: "",
        title: "",
        message: "",
        date: "",
        important: false,
        starred: false,
        trash: false,
        spam: false,
        archived: false,
        sent: true,
    });

    const router = useRouter();
    const { mailId } = params;
    const { mails, onSend } = useContext(MailContext);

    const sendMail = () => {
        if (newMail.message) {
            setNewMail((prevState) => ({
                ...prevState,
                from: mail!.from,
                to: mail!.from ? mail!.from : mail!.to,
                image: mail!.image,
                title: mail!.title,
            }));

            onSend({
                ...newMail,
                from: mail!.from,
                to: mail!.from ? mail!.from : mail!.to,
                image: mail!.image,
                title: mail!.title,
            });
            toast.current?.show({
                severity: "success",
                summary: "Success",
                detail: "Mail sent",
            });
            router.push("/apps/mail/inbox");
        }
    };

    const goBack = () => {
        router.back();
    };

    useEffect(() => {
        const _mail = mails.filter(
            (m) => m.id === parseInt(mailId as string)
        )[0];
        setMail(_mail);
    }, [searchParams, mails, mailId]);

    return (
        <div>
            {mail ? (
                <>
                    <Toast ref={toast}></Toast>
                    <div className="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-5 pt-5 md:pt-0 gap-4 md:border-top-none border-top-1 surface-border">
                        <div className="flex align-items-center md:justify-content-start">
                            <Button
                                type="button"
                                icon="pi pi-chevron-left"
                                text
                                className="p-button-plain md:mr-3"
                                onClick={goBack}
                            ></Button>
                            {mail && mail.image ? (
                                <Avatar
                                    image={"/demo/images/avatar/" + mail.image}
                                    size="large"
                                    shape="circle"
                                    className="border-2 surface-border"
                                ></Avatar>
                            ) : null}
                            <div className="flex flex-column mx-3">
                                <span className="block text-900 font-bold text-lg">
                                    {mail.from}
                                </span>
                                <span className="block text-900 font-semibold">
                                    To: {mail.email || mail.to}
                                </span>
                            </div>
                        </div>
                        <div className="flex align-items-center justify-content-end column-gap-3 px-4 md:px-0">
                            <span className="text-900 font-semibold white-space-nowrap mr-auto">
                                {mail.date}
                            </span>
                            <Button
                                type="button"
                                icon="pi pi-reply"
                                text
                                className="p-button-plain flex-shrink-0"
                            ></Button>
                            <Button
                                type="button"
                                icon="pi pi-ellipsis-v"
                                text
                                className="p-button-plain flex-shrink-0"
                            ></Button>
                        </div>
                    </div>
                    <div className="surface-border border-1 border-round p-4">
                        <div className="text-900 font-semibold text-lg mb-3">
                            {mail.title}
                        </div>
                        <p className="line-height-3 mt-0 mb-3">
                            {mail.message}
                        </p>
                        <Editor
                            style={{ height: "250px" }}
                            value={newMail.message}
                            onTextChange={(e) =>
                                setNewMail((prevState) => ({
                                    ...prevState,
                                    message: e.textValue ?? "",
                                }))
                            }
                        ></Editor>
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
                                icon="pi pi-send"
                                label="Send"
                                onClick={sendMail}
                            ></Button>
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};

export default AppMailDetail;
