"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/auth-utils";
import { revalidatePath } from "next/cache";
import { AvailabilityStatus, AppointmentStatus, FormStatus } from "@/generated/prisma/client";

export async function toggleDoctorStatus(currentStatus: AvailabilityStatus) {
  const session = await getSession();
  if (!session || session.user.role !== "DOCTOR") {
    return { success: false, error: "Unauthorized" };
  }

  const newStatus = currentStatus === "ONLINE" ? "OFFLINE" : "ONLINE";

  try {
    await db.doctor.update({
      where: { userId: session.user.id },
      data: { availability: newStatus },
    });
    revalidatePath("/dashboard/doctor/availability");
    revalidatePath("/dashboard/student/appointments/book");
    return { success: true, status: newStatus };
  } catch (error) {
    console.error("Toggle status error:", error);
    return { success: false, error: "Failed to update status" };
  }
}

export async function submitHealthForm(formData: FormData) {
  const session = await getSession();
  if (!session || session.user.role !== "STUDENT") {
    return { success: false, error: "Unauthorized" };
  }

  const symptoms = formData.get("symptoms") as string;
  const urgency = formData.get("urgency") as string;

  if (!symptoms || !urgency) {
    return { success: false, error: "Missing fields" };
  }

  try {
    const healthForm = await db.healthForm.create({
      data: {
        studentId: session.user.id,
        symptoms,
        urgency,
        status: "SUBMITTED",
      },
    });

    // Notify all doctors (simplified for now, notifying admins or broad staff)
    // In a real app, you might notify a specific triage doctor or all doctors
    const doctors = await db.doctor.findMany({ select: { userId: true } });
    for (const doctor of doctors) {
        await db.notification.create({
            data: {
                userId: doctor.userId,
                title: "New Health Complaint",
                message: `New complaint: ${symptoms.substring(0, 50)}...`,
            }
        });
    }

    revalidatePath("/dashboard/student/complaints");
    revalidatePath("/dashboard/doctor/forms");
    revalidatePath("/dashboard/doctor");
    return { success: true, id: healthForm.id };
  } catch (error) {
    console.error("Submit form error:", error);
    return { success: false, error: "Failed to submit complaint" };
  }
}

export async function bookAppointment(doctorId: string, dateStr: string) {
  const session = await getSession();
  if (!session || session.user.role !== "STUDENT") {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db.appointment.create({
      data: {
        studentId: session.user.id,
        doctorId,
        date: new Date(dateStr),
        status: "PENDING",
      },
    });
    
    // Create notification for doctor
    const doctor = await db.doctor.findUnique({ where: { id: doctorId } });
    if (doctor) {
        await db.notification.create({
            data: {
                userId: doctor.userId,
                title: "New Appointment Request",
                message: `${session.user.name} has requested an appointment.`,
            }
        });
    }

    revalidatePath("/dashboard/student/appointments/book");
    revalidatePath("/dashboard/doctor/appointments");
    return { success: true };
  } catch (error) {
    console.error("Book appointment error:", error);
    return { success: false, error: "Failed to book appointment" };
  }
}

export async function createPrescription(formData: FormData) {
  const session = await getSession();
  if (!session || session.user.role !== "DOCTOR") {
    return { success: false, error: "Unauthorized" };
  }

  const formId = formData.get("formId") as string;
  const medicines = formData.get("medicines") as string;
  const tests = formData.get("tests") as string;
  const notes = formData.get("notes") as string;

  if (!formId || !medicines) {
    return { success: false, error: "Missing required fields" };
  }

  try {
    const doctor = await db.doctor.findUnique({
      where: { userId: session.user.id }
    });

    if (!doctor) return { success: false, error: "Doctor profile not found" };

    await db.$transaction([
      db.prescription.create({
        data: {
          formId,
          doctorId: doctor.id,
          medicines,
          tests,
          notes,
        },
      }),
      db.healthForm.update({
        where: { id: formId },
        data: { status: "REVIEWED" }
      })
    ]);

    // Notify student
    const form = await db.healthForm.findUnique({ where: { id: formId } });
    if (form) {
        await db.notification.create({
            data: {
                userId: form.studentId,
                title: "New Prescription Issued",
                message: "A doctor has reviewed your health report and issued a prescription.",
            }
        });
    }

    revalidatePath("/dashboard/doctor/forms");
    revalidatePath(`/dashboard/doctor/forms/${formId}`);
    revalidatePath("/dashboard/student/prescriptions");
    return { success: true };
  } catch (error) {
    console.error("Create prescription error:", error);
    return { success: false, error: "Failed to issue prescription" };
  }
}

export async function updateAppointmentStatus(appointmentId: string, status: AppointmentStatus) {
  const session = await getSession();
  if (!session || (session.user.role !== "DOCTOR" && session.user.role !== "ADMIN")) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const appointment = await db.appointment.update({
      where: { id: appointmentId },
      data: { status },
      include: { student: true }
    });

    // Notify student
    await db.notification.create({
        data: {
            userId: appointment.studentId,
            title: `Appointment ${status.toLowerCase()}`,
            message: `Your appointment request has been ${status.toLowerCase()} by the doctor.`,
        }
    });

    revalidatePath("/dashboard/doctor/appointments");
    revalidatePath("/dashboard/student/appointments");
    return { success: true };
  } catch (error) {
    console.error("Update appointment status error:", error);
    return { success: false, error: "Failed to update appointment status" };
  }
}
