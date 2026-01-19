import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { encrypt } from "@/lib/auth-utils";
import { UserRole } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
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

    if (role === "DOCTOR") {
      await db.doctor.create({
        data: {
          userId: user.id,
          specialization: "General Physician",
        },
      });
    }

    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const session = await encrypt({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, expires });

    const response = NextResponse.json({ success: true, user: { id: user.id, role: user.role } });
    response.cookies.set("session", session, { expires, httpOnly: true });

    return response;
  } catch (error: any) {
    console.error("API Register error:", error);
    if (error.code === "P2002") {
       return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
