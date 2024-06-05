import { Nullable } from "primereact/ts-helpers";

export type DescriptionProductRequest = {
    description: string;
    type: "product" | "service";
    priority: "low" | "medium" | "high";
    qty: Nullable<number | null>;
};
export interface ProductRequestInterface {
    status: "new" | "pending" | "finished";
    deadline: string | Date | null;
    client: { disconnect: string[]; connect: string[] };
    description: DescriptionProductRequest[];
}

export const ProductRequestInterfaceSetup = {
    status: "new",
    deadline: null,
    client: { disconnect: [], connect: [] },
    description: [
        {
            description: "",
            type: "service",
            priority: "low",
            qty: 0,
        },
    ],
};
