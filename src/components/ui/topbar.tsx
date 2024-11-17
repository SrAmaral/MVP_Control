"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { findActiveLabel } from "~/app/ui/lib/menu-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "./breadcrumb";
import { ContentLayout } from "./content-layout";
import PlaceholderContent from "./placeholder-content";

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}

export default function TopBar({ children }: LayoutProps) {
  const pathname = usePathname();
  const label = findActiveLabel(pathname) || "";
  const pathSegments = pathname.split("/").filter(Boolean);
  const UpFirstLetter = (slug: string) => {
    return slug
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <ContentLayout title={label}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {pathSegments.map((segment, index) => (
            <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={`/${pathSegments.slice(0, index + 1).join("/")}`}>
                    {UpFirstLetter(segment)}
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <PlaceholderContent>
        <div className="h-full w-full">{children}</div>
      </PlaceholderContent>
    </ContentLayout>
  );
}
