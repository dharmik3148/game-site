import axios from "axios";

const { NextResponse } = require("next/server");

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // const allowedOrigin = ["https://popygames.com"];
  // const origin = request.headers.get("origin");

  // if (origin && origin !== allowedOrigin.includes(origin)) {
  //   return new NextResponse("Forbidden", { status: 403 });
  // }

  if (pathname === "/game-admin") {
    return goto("/game-admin/login", request);
  }

  if (pathname === "/game-admin/login") {
    return NextResponse.next();
  }

  try {
    const cookieHeader = await request.headers.get("cookie");
    let token, id;

    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split("; ").map((c) => c.split("="))
      );
      token = cookies["token"];
      id = cookies["adminId"];
    }

    if (!token || !id) {
      return goto("/game-admin/login", request);
    }

    const res = await axios.get(
      `${process.env.NEXT_APP_BASE_URL}/api/admin/auth`,
      { headers: { id, token, "Cache-Control": "no-store" } }
    );

    if (res.data.status !== true) {
      return goto("/game-admin/login", request);
    }

    return NextResponse.next();
  } catch (error) {
    return goto("/game-admin/login", request);
  }
}

const goto = (path, request) => {
  const response = NextResponse.redirect(new URL(path, request.url));
  response.headers.set("Cache-Control", "no-store");
  return response;
};

export const config = {
  matcher: ["/game-admin/:path*"],
};
