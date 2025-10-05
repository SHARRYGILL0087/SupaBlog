import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
    // clear refreshToken cookie
    console.log("Logout")
    try {
        (await cookies()).set("refreshtoken", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            path: "/api/auth/refresh",
            maxAge: 0, // expire immediately
        });

        return NextResponse.json({ msg: "Logged out successfully" }, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Error while Logging out", error }, { status: 500 })
    }
}
