"use client";

import { ChatProvider } from "../../../../demo/components/apps/chat/context/chatcontext";

interface ChatLayoutProps {
    children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
    return <ChatProvider>{children}</ChatProvider>;
}
