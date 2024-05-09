"use client";

import type { Demo, Page } from "@/types";
import React, { useContext, useEffect, useState } from "react";
import AppMailTable from "../../../../../../demo/components/apps/mail/AppMailTable";
import { MailContext } from "../../../../../../demo/components/apps/mail/context/mailcontext";

const MailSent: Page = () => {
    const [sentMails, setSentMails] = useState<Demo.Mail[]>([]);
    const { mails } = useContext(MailContext);
    useEffect(() => {
        const _mails = mails.filter((d) => d.sent && !d.trash && !d.archived);
        setSentMails(_mails);
    }, [mails]);

    return (
        <React.Fragment>
            <AppMailTable mails={sentMails} />
        </React.Fragment>
    );
};

export default MailSent;
