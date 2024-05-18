import { Nullable } from "primereact/ts-helpers";

export interface userInterface {
    name: string;
    email: string;
    contactNumber: string | undefined | Nullable<string>;
    role: string;
    attachments: string[];
}

export const userInterfaceSetup = {
    name: "",
    email: "",
    contactNumber: "",
    role: "",
    attachments: [],
};
