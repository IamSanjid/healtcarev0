import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/auth-utils";

export default async function proxy(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // 1. Check if the path is protected
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuth = pathname.startsWith("/login") || pathname.startsWith("/register");

  if (isDashboard) {
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const payload = await decrypt(session);
      const role = payload.user.role.toLowerCase();

      // Check for specific role access
      if (pathname.startsWith("/dashboard/student") && role !== "student") {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
      }
      if (pathname.startsWith("/dashboard/doctor") && role !== "doctor") {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
      }
      if (pathname.startsWith("/dashboard/admin") && role !== "admin") {
        return NextResponse.redirect(new URL(`/dashboard/${role}`, request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isAuth && session) {
    try {
      const payload = await decrypt(session);
      return NextResponse.redirect(new URL(`/dashboard/${payload.user.role.toLowerCase()}`, request.url));
    } catch (error) {
      // invalid session, let them proceed to login
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
