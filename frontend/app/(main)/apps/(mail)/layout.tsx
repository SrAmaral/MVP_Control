"use client";
import AppMailLayout from "../../../../demo/components/apps/mail/AppMailLayout";

interface AppMailLayoutProps {
    children: React.ReactNode;
}

export default function AppLayout({ children }: AppMailLayoutProps) {
    return <AppMailLayout>{children}</AppMailLayout>;
}
