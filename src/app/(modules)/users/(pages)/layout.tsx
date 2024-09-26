import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/app/ui/components/breadcrumb";
import { ContentLayout } from "~/app/ui/components/content-layout";
import PlaceholderContent from "~/app/ui/components/placeholder-content";

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
          <div className="bg-gray-200  w-full h-full  ">
            {children}
          </div>
        </PlaceholderContent>
      </ContentLayout>
  );
}
