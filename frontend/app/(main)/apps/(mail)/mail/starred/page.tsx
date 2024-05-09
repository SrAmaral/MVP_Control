"use client";

import type { Demo, Page } from "@/types";
import React, { useContext, useEffect, useState } from "react";
import AppMailTable from "../../../../../../demo/components/apps/mail/AppMailTable";
import { MailContext } from "../../../../../../demo/components/apps/mail/context/mailcontext";

const MailStarred: Page = () => {
    const [starredMails, setStarredMails] = useState<Demo.Mail[]>([]);
    const { mails } = useContext(MailContext);
    useEffect(() => {
        const _mails = mails.filter(
            (d) => d.starred && !d.archived && !d.trash
        );
        setStarredMails(_mails);
    }, [mails]);

    return (
        <React.Fragment>
            <AppMailTable mails={starredMails} />
        </React.Fragment>
    );
};

export default MailStarred;
