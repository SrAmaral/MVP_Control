"use client";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { classNames } from "primereact/utils";
import { useContext, useState } from "react";
import { LayoutContext } from "../../../../layout/context/layoutcontext";

function Contact() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [content] = useState([
        { icon: "pi pi-fw pi-phone", title: "Phone", info: "1 (833) 597-7538" },
        {
            icon: "pi pi-fw pi-map-marker",
            title: "Our Head Office",
            info: "Churchill-laan 16 II, 1052 CD, Amsterdam",
        },
        { icon: "pi pi-fw pi-print", title: "Fax", info: "3 (833) 297-1548" },
    ]);
    const { layoutConfig } = useContext(LayoutContext);
    return (
        <div
            className="grid card grid-nogutter"
            style={{ columnGap: "2rem", rowGap: "2rem" }}
        >
            <div className="col-12">
                <p className="text-900 font-bold">Contact Us</p>
            </div>
            <div
                className="col-12 mt-3 h-20rem border-1 surface-border p-0 w-full bg-cover border-round"
                style={{
                    backgroundImage: `url('/demo/images/contact/map-${
                        layoutConfig.colorScheme === "light" ? "light" : "dark"
                    }.svg')`,
                }}
            ></div>
            <div className="col-12 mt-5">
                <div
                    className="grid grid-nogutter px-2 flex-column md:flex-row"
                    style={{ columnGap: "2rem", rowGap: "2rem" }}
                >
                    {content.map((item, i) => {
                        return (
                            <div
                                key={i}
                                className="col flex flex-column justify-content-center text-center align-items-center border-1 surface-border py-5 px-4 border-round"
                            >
                                <i
                                    className={classNames(
                                        "pi pi-fw text-2xl text-primary",
                                        item.icon
                                    )}
                                ></i>
                                <span className="text-900 font-bold mt-4 mb-1">
                                    {item.title}
                                </span>
                                <span className="text-500">{item.info}</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="col-12 mt-5">
                <p className="text-900 font-bold">Send Us Email</p>
                <div
                    className="grid flex-column md:flex-row formgrid grid-nogutter mt-6"
                    style={{ rowGap: "2rem", columnGap: "2rem" }}
                >
                    <div className="field col">
                        <label
                            htmlFor="name"
                            className="block text-primary font-bold"
                        >
                            Name
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
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Name"
                                className="w-full px-7 text-900 font-semibold"
                                style={{ height: "3.5rem" }}
                            />
                        </span>
                    </div>

                    <div className="field col">
                        <label
                            htmlFor="email"
                            className="block text-primary font-bold"
                        >
                            Email Address
                        </label>
                        <span
                            className="p-input-icon-left w-full"
                            style={{ height: "3.5rem" }}
                        >
                            <i
                                className="pi pi-envelope"
                                style={{ left: "1.5rem" }}
                            ></i>
                            <InputText
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email"
                                className="w-full px-7 text-900 font-semibold"
                                style={{ height: "3.5rem" }}
                            />
                        </span>
                    </div>

                    <div className="field col-12 flex flex-column">
                        <label
                            htmlFor="message"
                            className="block text-primary font-bold"
                        >
                            Message
                        </label>
                        <InputTextarea
                            id="message"
                            rows={5}
                            cols={30}
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                        <Button
                            className="ml-auto mt-3 border-round"
                            label="Send Message"
                        ></Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
