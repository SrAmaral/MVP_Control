"use client";
import type { Demo, Page } from "@/types";
import { Toast } from "primereact/toast";
import React, { useContext, useEffect, useState } from "react";
import AppMailTable from "../../../../../../demo/components/apps/mail/AppMailTable";
import { MailContext } from "../../../../../../demo/components/apps/mail/context/mailcontext";

const MailArchived: Page = () => {
    const [archivedMails, setArchivedMails] = useState<Demo.Mail[]>([]);
    const { mails } = useContext(MailContext);
    useEffect(() => {
        const _mails = mails.filter((d) => d.archived);
        setArchivedMails(_mails);
    }, [mails]);

    return (
        <React.Fragment>
            <Toast></Toast>
            <AppMailTable mails={archivedMails} />
        </React.Fragment>
    );
};

export default MailArchived;
