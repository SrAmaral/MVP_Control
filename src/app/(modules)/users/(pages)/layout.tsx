import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { ContentLayout } from "~/components/ui/content-layout";
import PlaceholderContent from "~/components/ui/placeholder-content";

interface LayoutProps {
  children?: React.ReactNode
  title: string 
}

export default  function  Page({children, title="Users"}: LayoutProps) {
  return (
    <ContentLayout title={title}>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Usuários</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PlaceholderContent >
            {children}
        </PlaceholderContent>
      </ContentLayout>
  );
}
