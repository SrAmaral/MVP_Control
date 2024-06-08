import { Nullable } from "primereact/ts-helpers";

export type DescriptionProductQuotation = {
    description: string;
    type: { name: string; value: string };
    priority: { name: string; value: string };
    qty: Nullable<number | null>;
    value: Nullable<number | null>;
};
export interface ProductQuotationInterface {
    status: "new" | "pending" | "finished" | "approved" | "rejected";
    deadline: string | Date | null;
    client: { disconnect: string[]; connect: string[] };
    description: DescriptionProductQuotation[];
}

export const ProductQuotationInterfaceSetup = {
    status: "new",
    deadline: null,
    client: { disconnect: [], connect: [] },
    description: [
        {
            description: "",
            type: "service",
            priority: "low",
            qty: 0,
            value: 0,
        },
    ],
};
