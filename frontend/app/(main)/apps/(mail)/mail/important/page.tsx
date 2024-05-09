"use client";

import React, { useContext, useEffect, useState } from "react";

import { Toast } from "primereact/toast";
import AppMailTable from "../../../../../../demo/components/apps/mail/AppMailTable";
import { MailContext } from "../../../../../../demo/components/apps/mail/context/mailcontext";

import type { Demo, Page } from "@/types";

const MailImportant: Page = () => {
    const [importantMails, setImportantMails] = useState<Demo.Mail[]>([]);
    const { mails } = useContext(MailContext);
    useEffect(() => {
        const _mails = mails.filter(
            (d) => d.important && !d.spam && !d.trash && !d.archived
        );
        setImportantMails(_mails);
    }, [mails]);

    return (
        <React.Fragment>
            <Toast></Toast>
            <AppMailTable mails={importantMails} />
        </React.Fragment>
    );
};

export default MailImportant;
