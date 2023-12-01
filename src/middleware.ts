import { SessionData, sessionOptions } from "@/lib/session";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (request.nextUrl.pathname.startsWith("/login")) {
    if (session.isLoggedIn) {
      return NextResponse.redirect(new URL("/", request.nextUrl.origin).href);
    }
  }
  if (request.nextUrl.pathname.startsWith("/users")) {
    if (!session.isLoggedIn) {
      return NextResponse.redirect(
        new URL("/login", request.nextUrl.origin).href
      );
    }
  }
  return NextResponse.next();
}
