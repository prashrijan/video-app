import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const token = req.nextauth?.token;
        
        // ✅ Redirect logged-in users away from auth pages
        if (token && (pathname === "/sign-in" || pathname === "/sign-up")) {
            return NextResponse.redirect(new URL("/", req.url));
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized({ req, token }) {
                const { pathname } = req.nextUrl;

                // public access
                if (
                    pathname.startsWith("/api/auth") ||
                    pathname === "/sign-in" ||
                    pathname === "/sign-up"
                ) {
                    return true;
                }

                // public access 
                if (pathname === "/" || pathname.startsWith("/api/videos")) {
                    return true;
                }

                return !!token;
            },
        },
    }
);

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public/).*)"],
};
