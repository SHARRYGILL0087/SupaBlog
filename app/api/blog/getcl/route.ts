import { supabase } from "@/lib/supabase-client";
import { NextResponse } from "next/server";

export async function POST(req:Request) {
    try {
        const {post_id, user_id} = await req.json()
        console.log(post_id , user_id)

        const Likes = await supabase.from("likes").select("*").eq("post_id" , post_id).order("created_at", { ascending: false })

        const comments = await supabase.from("comments").select("*").eq("post_id" , post_id).order("created_at", { ascending: false })

        console.log(Likes.data , comments.data)

        const isLike = Likes.data?.find(ele => ele.user_id === user_id)

        return NextResponse.json({msg : "Likes and Comments Got" , likes : Likes.data , comments : comments.data , isLike } , {status : 200})

    } catch (error) {
        console.log("Err while getting Likes and comments -- " , error)
        return NextResponse.json({msg : "Err while Getting Likes and Comments "} , {status : 500})
    }
}