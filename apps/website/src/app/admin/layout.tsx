import { PageTitle } from "@/ui";
import { Topbar } from "@/app/admin/Topbar";
import { Navigation } from "@/app/admin/Navigation";

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Topbar />
      <PageTitle>Admin panel</PageTitle>
      <Navigation />
      {children}
    </>
  );
}
