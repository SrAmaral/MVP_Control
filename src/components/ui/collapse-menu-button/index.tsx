"use client";

import { ChevronDown, Dot, type LucideIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { cn } from "~/lib/utils";

import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { type Session } from "next-auth";
import { getSession } from "next-auth/react";
import { Button } from "../button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../tooltip";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon?: LucideIcon;
  roles?: string[];
};

interface CollapseMenuButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  submenus: Submenu[];
  isOpen: boolean | undefined;
  userRole: string | null | undefined;
}

export function CollapseMenuButton({
  icon: Icon,
  label,
  active,
  submenus,
  isOpen,
  userRole,
}: CollapseMenuButtonProps) {
  const isSubmenuActive = submenus.some((submenu) => submenu.active);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    getSession()
      .then((session) => {
        setSession(session);
      })
      .catch((error) => {
        console.error("Failed to get session:", error);
      });
  }, []);

  function isShowMenu(roles: string[] | undefined) {
    if (roles?.includes("All")) {
      return true;
    }
    if (roles?.includes(session?.user?.role ?? "")) {
      return true;
    }
    return false;
  }

  return isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
      <CollapsibleTrigger
        className="mb-1 [&[data-state=open]>div>div>svg]:rotate-180"
        asChild
      >
        <Button
          variant={active ? "secondary" : "ghost"}
          className="h-10 w-full justify-start"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center">
              <span className="mr-4">
                <Icon size={18} />
              </span>
              <p
                className={cn(
                  "max-w-[150px] truncate",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0",
                )}
              >
                {label}
              </p>
            </div>
            <div
              className={cn(
                "whitespace-nowrap",
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-96 opacity-0",
              )}
            >
              <ChevronDown
                size={18}
                className="transition-transform duration-200"
              />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down overflow-hidden">
        {submenus.map(
          ({ href, label, active, icon: iconComponent, roles }, index) =>
            isShowMenu(roles) && (
              <Button
                key={index}
                variant={active ? "secondary" : "ghost"}
                className="mb-1 h-10 w-full justify-start"
                asChild
              >
                <Link href={href || "/"}>
                  <span className="ml-2 mr-4">
                    {!!iconComponent
                      ? React.createElement(iconComponent, { size: 18 })
                      : React.createElement(Dot, { size: 18 })}
                  </span>

                  <p
                    className={cn(
                      "max-w-[170px] truncate",
                      isOpen
                        ? "translate-x-0 opacity-100"
                        : "-translate-x-96 opacity-0",
                    )}
                  >
                    {label}
                  </p>
                </Link>
              </Button>
            ),
        )}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={active ? "secondary" : "ghost"}
                className="mb-1 h-10 w-full justify-start"
              >
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <Icon size={18} />
                    </span>
                    <p
                      className={cn(
                        "max-w-[200px] truncate",
                        isOpen === false ? "opacity-0" : "opacity-100",
                      )}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus.map(({ href, label }, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link className="cursor-pointer" href={href}>
              <p className="max-w-[180px] truncate">{label}</p>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
