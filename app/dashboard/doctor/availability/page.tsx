import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import AvailabilityClientPage from "./availability-client";

export default async function AvailabilityPage() {
  const session = await getSession();
  if (!session || session.user.role !== "DOCTOR") {
    redirect("/login");
  }

  const doctor = await db.doctor.findUnique({
    where: { userId: session.user.id }
  });

  if (!doctor) redirect("/login");

  return <AvailabilityClientPage doctor={doctor} />;
}
