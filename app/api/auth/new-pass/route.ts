import { supabase } from "@/lib/supabase-client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"

export async function POST(req: Request) {
    const { email, password } = await req.json()
    try {
        if (!email || !password) return
        const hashPassword = await bcrypt.hash(password, 10)
        const { data, error } = await supabase.from("users").update({ password: hashPassword }).eq("email", email)
        console.log({ data, error })
        return NextResponse.json({ msg: "Password Changed" }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Error While changing password" }, { status: 500 })
    }
}