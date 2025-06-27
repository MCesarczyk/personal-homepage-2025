import { NextResponse, type NextRequest } from "next/server";

// eslint-disable-next-line import/no-default-export
export default async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const { pathname } = req.nextUrl;

  const protectedRoutes = ["/admin"];

  const response = await fetch(`${process.env.API_URL}${process.env.API_PREFIX}/user/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  if (response.status === 401 && protectedRoutes.includes(pathname)) {
    req.cookies.delete("accessToken");

    const response = NextResponse.redirect(new URL("/login", req.url));

    response.cookies.delete("accessToken");

    return response;
  }

  if (accessToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!api|static|.*\\..*|_next).*)",
};
