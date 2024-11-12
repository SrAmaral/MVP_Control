"use client";

import { cn } from "~/lib/utils";
import { useSidebarToggle } from "../../../app/ui/hooks/use-sidebar-toggle";
import { useStore } from "../../../app/ui/hooks/use-store";
import { Sidebar } from "../sidebar";
import TopBar from "../topbar";

export default function AdminPanelLayout({
  children,
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
          "min-h-[calc(110vh_-_56px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
          sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
        )}
      >
        <TopBar>{children}</TopBar>
      </main>
    </>
  );
}
