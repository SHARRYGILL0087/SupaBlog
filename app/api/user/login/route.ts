import { supabase } from "@/lib/supabase-client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie";

export async function POST(req: Request) {
    try {
        const { email, password } = await req.json()
        console.log({ email, password }) 
        // console.log('LOgin : ', { data, error })

        const isExist = await supabase.from("users").select("*").eq("email", email)

        console.log('->', isExist)

        if (!isExist.data || isExist.error) {
            return NextResponse.json({ msg: "User Not Found" }, { status: 400 })
        }

        const user = isExist.data[0];
        const isMatch = user ? await bcrypt.compare(password, user.password) : false;
        console.log(isMatch)
        console.log(user)

        if (!isMatch) return NextResponse.json({ msg: "Incorrect Password" }, { status: 400 })

        const accesstoken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' })

        const refreshtoken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' })

        const response = NextResponse.json({msg : "Login Successfully" , accesstoken} , {status : 200})

        response.headers.set(
            "Set-cookie",
            cookie.serialize("refreshtoken", refreshtoken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                path: '/api/auth/refresh',
                maxAge: 60 * 60 * 24 * 7,
            })
        )

        console.log("accesstoken -> ", accesstoken, "  refreshtoken ->", refreshtoken)

        return response;
        // return NextResponse.json({ msg: "Login Successfully" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Error while login", error }, { status: 500 })
    }
}