import { Nullable } from "primereact/ts-helpers";

export interface ClientInterface {
    name: string;
    location: string;
    site: string;
    description: string | undefined | Nullable<string>;
    contactEmail: string;
    contactNumber: string | undefined | Nullable<string>;
    // files: File[];
    lastVisit: Date | Nullable<Date>;
    client: boolean;
    dockId: number;
}

export const ClientInterfaceSetup = {
    name: "",
    location: "",
    site: "",
    description: "",
    contactEmail: "",
    contactNumber: "",
    // files: [],
    lastVisit: null,
    client: false,
    dockId: 0,
};
