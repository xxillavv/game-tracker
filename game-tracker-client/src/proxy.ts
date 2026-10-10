import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const cookieHeader = request.headers.get("cookie") || ""

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
    headers: {
      Cookie: cookieHeader
    },
    cache: "no-store"
  })

  if (response.status === 401 || !response.ok) {
    const refreshResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
      headers: {
        Cookie: cookieHeader
      },
      cache: "no-store"
    })

    if (refreshResponse.status === 401 || !refreshResponse.ok) {
      return NextResponse.redirect(new URL("/login", request.url))
    }

    const setCookieHeader = refreshResponse.headers.get("set-cookie")

    if (setCookieHeader) {
      const requestHeaders = new Headers(request.headers);

      const tokenPair = setCookieHeader.split(";")[0];

      const existingCookies = requestHeaders.get("cookie") || "";
      requestHeaders.set("cookie", `${existingCookies}; ${tokenPair}`);

      const nextResponse = NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });

      nextResponse.headers.set("Set-Cookie", setCookieHeader);

      return nextResponse;
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/profile/:path*", "/matches/:path*"],
};