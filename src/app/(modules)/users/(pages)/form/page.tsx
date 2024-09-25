import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/app/ui/components/breadcrumb";
import { ContentLayout } from "~/app/ui/components/content-layout";
import PlaceholderContent from "~/app/ui/components/placeholder-content";

export default function Page() {
    return (
        <ContentLayout title="Users">
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
              <BreadcrumbPage>Usuárioss</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PlaceholderContent />
      </ContentLayout>
    )
}