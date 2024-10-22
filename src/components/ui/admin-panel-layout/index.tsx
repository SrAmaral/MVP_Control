"use client";

import { cn } from "~/lib/utils";
import { useStore } from "../../../app/ui/hooks/use-store";
import { useSidebarToggle } from "../../../app/ui/hooks/use-sidebar-toggle";
import { Sidebar } from "../sidebar";
import TopBar from "../topbar";

export default function AdminPanelLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <>
      <Sidebar />
      <main
        className={cn(
          "min-h-[calc(110vh_-_56px)] bg-zinc-50 dark:bg-zinc-900 transition-[margin-left] ease-in-out duration-300",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        <TopBar>
        {children}
        </TopBar>
      </main>
     
    </>
  );
}
