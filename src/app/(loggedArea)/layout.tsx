import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import AdminPanelLayout from "~/components/ui/admin-panel-layout";
import { ThemeProvider } from "../ui/providers/theme-provider";

export default async function LoggedAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AdminPanelLayout>{children}</AdminPanelLayout>
    </ThemeProvider>
  );
}
