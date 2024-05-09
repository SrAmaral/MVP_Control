"use client";

import type { Demo, Page } from "@/types";
import React, { useContext, useEffect, useState } from "react";
import AppMailTable from "../../../../../../demo/components/apps/mail/AppMailTable";
import { MailContext } from "../../../../../../demo/components/apps/mail/context/mailcontext";

const MailTrash: Page = () => {
    const [trashMails, setTrashMails] = useState<Demo.Mail[]>([]);
    const { mails } = useContext(MailContext);
    useEffect(() => {
        const _mails = mails.filter((d) => d.trash);
        setTrashMails(_mails);
    }, [mails]);

    return (
        <React.Fragment>
            <AppMailTable mails={trashMails} />
        </React.Fragment>
    );
};

export default MailTrash;
