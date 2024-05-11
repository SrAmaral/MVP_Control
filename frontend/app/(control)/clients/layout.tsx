import { ReactNode } from "react";

export const metadata = {
    title: {
        default: "Listagem | Clientes",
        template: "%s | Clientes",
    },
};

export default function Layout({ children }: { children: ReactNode }) {
    return <>{children}</>;
}
