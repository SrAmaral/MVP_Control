"use client";
import React, { useState } from "react";
import { Ripple } from "primereact/ripple";
import { Accordion, AccordionTab } from "primereact/accordion";
import { classNames } from "primereact/utils";

function Faq() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [items] = useState([
        {
            label: "General",
            icon: "pi pi-fw pi-info-circle",
            questions: [
                "Is there a trial period?",
                "Do I need to sign up with credit card?",
                "Is the subscription monthly or annual?",
                "How many tiers are there?",
            ],
        },
        {
            label: "Mailing",
            icon: "pi pi-fw pi-envelope",
            questions: [
                "How do I setup my account?",
                "Is there a limit on mails to send?",
                "What is my inbox size?",
                "How can I add attachements?",
            ],
        },
        {
            label: "Support",
            icon: "pi pi-fw pi-question-circle",
            questions: [
                "How can I get support?",
                "What is the response time?",
                "Is there a community forum?",
                "Is live chat available?",
            ],
        },
        {
            label: "Billing",
            icon: "pi pi-fw pi-credit-card",
            questions: [
                "Will I receive an invoice?",
                "How to provide my billing information?",
                "Is VAT included?",
                "Can I receive PDF invoices?",
            ],
        },
    ]);

    const changeItem = (i: number) => {
        setActiveIndex(i);
    };

    return (
        <div>
            <div className="card">
                <div className="text-900 font-bold text-xl mb-3">
                    Frequently Asked Questions
                </div>
                <p className="text-600 line-height-3">
                    Neque porro quisquam est qui dolorem ipsum quia dolor sit
                    amet, consectetur, adipisci velit.
                </p>
            </div>

            <div className="flex flex-column md:flex-row gap-5">
                <div className="card mb-0 md:w-20rem">
                    <div className="text-900 block font-bold mb-3">
                        Categories
                    </div>
                    <ul className="list-none m-0 p-0">
                        {items.map((item, i) => {
                            return (
                                <li
                                    key={i}
                                    onClick={() => changeItem(i)}
                                    className="mb-2 "
                                >
                                    <a
                                        className={classNames(
                                            "flex align-items-center cursor-pointer select-none p-3 transition-colors transition-duration-150 border-round",
                                            "p-ripple",
                                            {
                                                "bg-primary": activeIndex === i,
                                                "hover:surface-hover":
                                                    activeIndex !== i,
                                            }
                                        )}
                                    >
                                        <i
                                            className={classNames(
                                                "mr-2 text-lg",
                                                item.icon
                                            )}
                                        ></i>
                                        <span>{item.label}</span>
                                        <Ripple />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="card flex-1">
                    <Accordion>
                        {items[activeIndex].questions.map((question, i) => {
                            return (
                                <AccordionTab key={i} header={question}>
                                    <p className="line-height-3 m-0 p-0">
                                        Lorem ipsum dolor sit amet, consectetur
                                        adipiscing elit, sed do eiusmod tempor
                                        incididunt ut labore et dolore magna
                                        aliqua. Ut enim ad minim veniam, quis
                                        nostrud exercitation ullamco laboris
                                        nisi ut aliquip ex ea commodo consequat.
                                        Duis aute irure dolor in reprehenderit
                                        in voluptate velit esse cillum dolore eu
                                        fugiat nulla pariatur. Excepteur sint
                                        occaecat cupidatat non proident, sunt in
                                        culpa qui officia deserunt mollit anim
                                        id est laborum.
                                    </p>
                                </AccordionTab>
                            );
                        })}
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default Faq;
