import { getSession } from "@/lib/auth-utils";
export const dynamic = "force-dynamic";
import { DashboardLayout } from "@/components/dashboard/dashboard-layout";
import { redirect } from "next/navigation";

export default async function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || session.user.role !== "STUDENT") {
    redirect("/login");
  }

  return (
    <DashboardLayout user={session.user}>
      {children}
    </DashboardLayout>
  );
}
