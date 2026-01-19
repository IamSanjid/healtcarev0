import { getSession } from "@/lib/auth-utils";
export const dynamic = "force-dynamic";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.user.role !== "ADMIN") {
    redirect("/login");
  }

  return (
    <DashboardLayout user={session.user}>
      {children}
    </DashboardLayout>
  );
}
