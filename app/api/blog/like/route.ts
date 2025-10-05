import { supabase } from "@/lib/supabase-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        console.log(body)
        const { post_id, user_id, isLike } = body
        if (!isLike) {
            const newLike = await supabase.from("likes").insert({ post_id, user_id }).select("*")
            if (newLike.error) {
                console.log("Err -> ", newLike.error)
            } else console.log(newLike.data)
            return NextResponse.json({ msg: "Post Liked" }, { status: 200 })
        }
        else {
            const removeLike = await supabase.from("likes").delete().eq("user_id", user_id)
            if (removeLike.error) console.log("Err while removing like -> ", removeLike.error)
            else console.log(removeLike.data)
            return NextResponse.json({ msg: "Post Like Removed" }, { status: 200 })
        }
    } catch (error) {
        console.log("Err while Like -> ", error)
        return NextResponse.json({ msg: "Err while Like -> " }, { status: 500 })
    }
}