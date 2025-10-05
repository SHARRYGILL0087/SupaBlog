import { supabase } from "@/lib/supabase-client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import cookie from "cookie"


export async function POST(req: Request, res: NextApiResponse) {
    try {
        const { name, email, password } = await req.json()
        console.log({ name, email, password })

        const isExist = await supabase.from("users").select("id").eq("email", email).single()

        if (isExist.data) {
            return NextResponse.json({ msg: "User Already Exist" }, { status: 400 })
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const { data, error } = await supabase.from('users').insert({ name, email, password: hashPassword }).select().single()
        console.log(data, error)

        if (error) return NextResponse.json({ msg: "Error while saving user in db" }, { status: 400 })

        const accesstoken = jwt.sign({ userId: data.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' })

        const refreshtoken = jwt.sign({ userId: data.id }, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: '7d' })

        const response = NextResponse.json({msg : "Signup Successfully"} , {status : 200})


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
    } catch (error) {
        return NextResponse.json({ msg: "Error while sign up", error }, { status: 500 })
    }
}