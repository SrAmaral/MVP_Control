"use client";
import { TaskProvider } from "../../../../demo/components/apps/tasklist/context/taskcontext";

interface TaskProvider {
    children: React.ReactNode;
}

export default function AppLayout({ children }: TaskProvider) {
    return <TaskProvider>{children}</TaskProvider>;
}
