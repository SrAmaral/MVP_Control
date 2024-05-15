import { Metadata } from "next";
import Layout from "../../layout/layout";

interface MainLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: "PrimeReact APOLLO",
    description:
        "The ultimate collection of design-agnostic, flexible and accessible React UI Components.",
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: "device-width" },
    openGraph: {
        type: "website",
        title: "PrimeReact APOLLO-REACT",
        url: "https://www.primefaces.org/apollo-react",
        description:
            "The ultimate collection of design-agnostic, flexible and accessible React UI Components.",
        images: ["https://www.primefaces.org/static/social/apollo-react.png"],
        ttl: 604800,
    },
    icons: {
        icon: "/favicon.ico",
    },
};

export default function MainLayout({ children }: MainLayoutProps) {
    return <Layout>{children}</Layout>;
}
