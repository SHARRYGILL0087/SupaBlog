import { supabase } from "@/lib/supabase-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { userId } = await req.json()
    try {
        if (!userId) return NextResponse.json({ msg: "User Id required!" }, { status: 400 })
        console.log(userId)
        const { data, error } = await supabase.from("users").select("*").eq("id", userId)
        if (error) return NextResponse.json({ msg: "Error while fetching user from db", error }, { status: 400 })

        console.log(data)
        return NextResponse.json({ msg: "User Obtained", user: data }, { status: 200 })
    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Error while getting User ", error }, { status: 500 })
    }
}