import type { AppMailSidebarItem, Demo } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "primereact/button";
import { Ripple } from "primereact/ripple";
import { classNames } from "primereact/utils";
import React, { useContext, useEffect, useState } from "react";
import { MailContext } from "./context/mailcontext";

function AppMailSidebar() {
    const [items, setItems] = useState<AppMailSidebarItem[]>([]);
    const router = useRouter();
    const pathname = usePathname();
    const { mails } = useContext(MailContext);

    const navigate = (item: AppMailSidebarItem) => {
        if (item.to) {
            router.push(item.to);
        }
    };

    const getBadgeValues = (data: Demo.Mail[]) => {
        let inbox = [],
            starred = [],
            spam = [],
            important = [],
            archived = [],
            trash = [],
            sent = [];

        for (let i = 0; i < data.length; i++) {
            let mail = data[i];

            if (
                !mail.archived &&
                !mail.trash &&
                !mail.spam &&
                !mail.hasOwnProperty("sent")
            ) {
                inbox.push(mail);
            }
            if (mail.starred) {
                starred.push(mail);
            }
            if (mail.spam) {
                spam.push(mail);
            }
            if (mail.important) {
                important.push(mail);
            }
            if (mail.archived) {
                archived.push(mail);
            }
            if (mail.trash) {
                trash.push(mail);
            }
            if (mail.sent) {
                sent.push(mail);
            }
        }

        const badgeValues = {
            inbox: inbox.length,
            starred: starred.length,
            spam: spam.length,
            important: important.length,
            archived: archived.length,
            trash: trash.length,
            sent: sent.length,
        };

        setItems([
            {
                label: "Inbox",
                icon: "pi pi-inbox",
                badge: badgeValues.inbox,
                to: "/apps/mail/inbox",
            },
            {
                label: "Starred",
                icon: "pi pi-star",
                badge: badgeValues.starred,
                to: "/apps/mail/starred",
            },
            {
                label: "Spam",
                icon: "pi pi-ban",
                badge: badgeValues.spam,
                to: "/apps/mail/spam",
            },
            {
                label: "Important",
                icon: "pi pi-bookmark",
                badge: badgeValues.important,
                to: "/apps/mail/important",
            },
            {
                label: "Sent",
                icon: "pi pi-send",
                badge: badgeValues.sent,
                to: "/apps/mail/sent",
            },
            {
                label: "Archived",
                icon: "pi pi-book",
                badge: badgeValues.archived,
                to: "/apps/mail/archived",
            },
            {
                label: "Trash",
                icon: "pi pi-trash",
                badge: badgeValues.trash,
                to: "/apps/mail/trash",
            },
        ]);
    };

    useEffect(() => {
        getBadgeValues(mails);
    }, [mails]);

    return (
        <React.Fragment>
            <div>
                <Button
                    label="Compose New"
                    className="mb-5 w-full"
                    outlined
                    onClick={(e) => router.push("/apps/mail/compose")}
                ></Button>
                <div className="overflow-auto">
                    <ul className="flex flex-row md:flex-column gap-1 md:gap-2 list-none m-0 p-0 overflow-auto">
                        {items.map((item, i) => {
                            return (
                                <li
                                    key={i}
                                    className={classNames(
                                        "p-ripple cursor-pointer select-none p-3 transition-duration-150 border-round flex align-items-center justify-content-center md:justify-content-start md:flex-1 flex-auto",
                                        {
                                            "bg-primary": pathname === item.to,
                                            "hover:surface-hover":
                                                pathname !== item.to,
                                        }
                                    )}
                                    onClick={() => navigate(item)}
                                >
                                    <i
                                        className={classNames(
                                            "md:mr-3 text-600 transition-duration-150 text-lg",
                                            item.icon || "",
                                            {
                                                "text-primary-50":
                                                    pathname === item.to,
                                            }
                                        )}
                                    ></i>
                                    <span
                                        className={classNames(
                                            "text-900 font-medium hidden md:inline",
                                            {
                                                "text-primary-50":
                                                    pathname === item.to,
                                            }
                                        )}
                                    >
                                        {item.label}
                                    </span>
                                    {item.badge ? (
                                        <span
                                            className="ml-auto text-sm font-semibold bg-primary-50 text-primary-900 px-2 py-1 hidden md:inline"
                                            style={{ borderRadius: "2rem" }}
                                        >
                                            {item.badge}
                                        </span>
                                    ) : (
                                        <span
                                            className="ml-auto text-sm font-semibold bg-primary-50 text-primary-900 px-2 py-1 hidden md:inline"
                                            style={{ borderRadius: "2rem" }}
                                        >
                                            0
                                        </span>
                                    )}
                                    <Ripple />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    );
}

export default AppMailSidebar;
