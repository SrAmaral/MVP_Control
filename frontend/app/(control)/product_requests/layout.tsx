import { ReactNode } from "react";

export const metadata = {
    title: {
        default: "Listagem | Solicitações de Serviços",
        template: "%s | Solicitações de Serviços",
    },
};

export default function Layout({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}
