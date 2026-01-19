import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { encrypt } from "@/lib/auth-utils";
import { UserRole } from "@/generated/prisma/client";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const expires = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const session = await encrypt({ user: { id: user.id, name: user.name, email: user.email, role: user.role }, expires });

    const response = NextResponse.json({ success: true, user: { id: user.id, role: user.role } });
    response.cookies.set("session", session, { expires, httpOnly: true });

    return response;
  } catch (error: any) {
    console.error("API Login error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
