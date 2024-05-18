import { ReactNode } from "react";

export const metadata = {
    title: {
        default: "Listagem | Funcionarios",
        template: "%s | Funcionarios",
    },
};

export default function Layout({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}
