import { NextResponse, NextRequest } from "next/server";
import { getCookie } from "cookies-next/server";

export const middleware = async (req: NextRequest) => {
    const token = await getCookie("adminToken", { req });
    const { pathname } = req.nextUrl;

    // auth pages
    const isAuthPage = pathname.startsWith("/login")

    if(!token && !isAuthPage) {
        const loginUrl = new URL("/login", req.url);
        if(pathname !== "/login" ) {
            loginUrl.searchParams.set("callBackUrl", pathname);
        }
        return NextResponse.redirect(loginUrl);
    }

    if(token && isAuthPage) {
        const callBackUrl = req.nextUrl.searchParams.get("callBackUrl") || "/dashboard";
        return NextResponse.redirect(new URL(callBackUrl, req.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.jpeg$|.*\\.gif$|.*\\.svg$|.*\\.ico$).*)",
  ],
};