import { Nullable } from "primereact/ts-helpers";

export interface ClientInterface {
    name: string;
    location: string;
    site: string;
    description: string | undefined | Nullable<string>;
    contact_email: string;
    contact_number: string | undefined | Nullable<string>;
    // files: File[];
    lastVisit: Date | Nullable<Date>;
    isClient: boolean;
    dockId: number;
}

export const ClientInterfaceSetup = {
    name: "",
    location: "",
    site: "",
    description: "",
    contact_email: "",
    contact_number: "",
    // files: [],
    lastVisit: null,
    isClient: false,
    dockId: 0,
};
