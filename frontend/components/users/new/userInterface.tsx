import { Nullable } from "primereact/ts-helpers";

export interface userInterface {
    name: string;
    email: string;
    contact_number: string | undefined | Nullable<string>;
    role: string;
    attachments: string[];
}

export const userInterfaceSetup = {
    name: "",
    email: "",
    contact_number: "",
    role: "",
    attachments: [],
};
