"use client";

import React, { useContext, useEffect, useState } from "react";

import AppMailTable from "../../../../../../demo/components/apps/mail/AppMailTable";
import { MailContext } from "../../../../../../demo/components/apps/mail/context/mailcontext";

import type { Demo, Page } from "@/types";

const MailInbox: Page = () => {
    const [inbox, setInbox] = useState<Demo.Mail[]>([]);
    const { mails } = useContext(MailContext);
    useEffect(() => {
        const _mails = mails.filter(
            (d) =>
                !d.archived && !d.spam && !d.trash && !d.hasOwnProperty("sent")
        );
        setInbox(_mails);
    }, [mails]);

    return (
        <React.Fragment>
            <AppMailTable mails={inbox} />
        </React.Fragment>
    );
};

export default MailInbox;
