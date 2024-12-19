import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
