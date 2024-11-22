import Link from "next/link";

import Image from "next/image";
import { cn } from "~/lib/utils";
import { useSidebarToggle } from "../../../app/ui/hooks/use-sidebar-toggle";
import { useStore } from "../../../app/ui/hooks/use-store";
import { Button } from "../button";
import { Menu } from "../menu";
import { SidebarToggle } from "../sidebar-toggle";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-20 h-screen -translate-x-full transition-[width] duration-300 ease-in-out lg:translate-x-0",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72",
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className="relative flex h-full flex-col overflow-y-auto py-4 shadow-md dark:shadow-zinc-800">
        <Button
          className={cn(
            "mb-1 transition-transform duration-300 ease-in-out",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0",
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="mb-5 mt-10 flex items-center gap-2">
            {sidebar?.isOpen ? (
              <Image
                src="/logo_marca.png"
                alt="logo"
                width={200}
                height={100}
              />
            ) : (
              <Image src="/logo.png" alt="logo" width={40} height={40} />
            )}
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
