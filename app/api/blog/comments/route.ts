import { supabase } from "@/lib/supabase-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { post_id, user_id, content , user_name } = await req.json()
        console.log({ post_id, user_id, content , user_name })
        const newMsg = await supabase.from("comments").insert({ post_id, user_id, content , user_name })
        
        if (newMsg.error) console.log(newMsg.error)
        else console.log(newMsg.data)

        return NextResponse.json({ msg: "Message Added" }, { status: 200 })
    } catch (error) {
        console.log("Err while adding Comment -> ", error)
        return NextResponse.json({ msg: "Err while adding comment " }, { status: 500 })
    }
}