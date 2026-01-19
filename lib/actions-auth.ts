"use server";

import db from "@/lib/db";
import { encrypt } from "@/lib/auth-utils";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserRole } from "../generated/prisma/client";

export async function register(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as UserRole;

    if (!name || !email || !password || !role) {
      return { success: false, error: "Missing fields" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    // If doctor, create profile
    if (role === "DOCTOR") {
      await db.doctor.create({
        data: {
          userId: user.id,
          specialization: "General Physician", // Default
        },
      });
    }

    // Create session
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const session = await encrypt({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, expires });

    (await cookies()).set("session", session, { expires, httpOnly: true });

    return { success: true, role: role.toLowerCase() };
  } catch (error: any) {
    console.error("Registration error:", error);
    if (error.code === "P2002") {
      return { success: false, error: "Email already exists" };
    }
    return { success: false, error: "Something went wrong during registration" };
  }
}

export async function login(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      return { success: false, error: "Missing fields" };
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return { success: false, error: "Invalid credentials" };
    }

    // Create session
    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const session = await encrypt({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, expires });

    (await cookies()).set("session", session, { expires, httpOnly: true });

    return { success: true, role: user.role.toLowerCase() };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, error: "Something went wrong during login" };
  }
}

export async function logout() {
  (await cookies()).set("session", "", { expires: new Date(0) });
  redirect("/login");
}
