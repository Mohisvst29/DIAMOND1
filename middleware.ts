
import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const isLc = req.nextUrl.pathname.startsWith("/admin")
    const isLoggedIn = !!req.auth

    if (isLc && !isLoggedIn) {
        return NextResponse.redirect(new URL("/login", req.nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/admin/:path*"],
}
