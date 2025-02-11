import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

export async function middleware(req: NextRequest) {
  const cookie = req.cookies.get("session")?.value;
  const session = await decrypt(cookie);
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("x-url", req.url);

  if (!session?.usuario_cpf) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
