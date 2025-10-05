import { supabase } from "@/lib/supabase-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { post_id } = await req.json()
    console.log(post_id)

    if (post_id === 0) {
        try {
            // 1️⃣ Get the latest 7 blogs from "posts" table
            const { data: posts, error: postError } = await supabase
                .from("posts")
                .select("*")
                // .order("created_at", { ascending: false })
                .limit(7);

            if (postError) throw postError;
            console.log("POSTS ---  ", posts);

            // 2️⃣ For each post, get its first subtitle and image (optional)
            const blogsWithExtras = await Promise.all(
                posts.map(async (post) => {
                    const { data: subtitleData } = await supabase
                        .from("subtitles")
                        .select("subtitle, id")
                        .eq("post_id", post.id)
                        .limit(1);

                    const subtitleId = subtitleData?.[0]?.id;

                    let img = "";
                    if (subtitleId) {
                        const { data: contentData } = await supabase
                            .from("contents")
                            .select("img")
                            .eq("subtitle_id", subtitleId)
                            .limit(1);

                        img = contentData?.[0]?.img || "";
                    }

                    return {
                        id: post.id,
                        title: post.title,
                        author: post.author,
                        created_at: post.created_at,
                        subtitle: subtitleData?.[0]?.subtitle || "",
                        coverImg: img,
                        // ✅ MODIFICATION: Added post_id here
                        post_id: post.id,
                    };
                })
            );

            // 3️⃣ Return all blogs as JSON
            return NextResponse.json(
                { msg: "Latest blogs fetched successfully", blogs: blogsWithExtras },
                { status: 200 }
            );
        } catch (error) {
            console.error("Error fetching latest blogs ->", error);
            return NextResponse.json(
                { msg: "Error fetching blogs", error },
                { status: 500 }
            );
        }
    }

    else {


        try {
            const res = await supabase.from("posts").select("*").eq("id", post_id)
            if (res.error) throw res.error
            console.log(res.data)

            const res2 = await supabase.from("subtitles").select("*").eq("post_id", post_id)
            if (res2.error) throw res2.error
            console.log(res2.data)
            let sub_ids: number[] = []
            let subtitles: string[] = []

            res2.data.forEach(ele => {
                sub_ids.push(ele.id)
                subtitles.push(ele.subtitle)
            })
            console.log("idx -- ", sub_ids)
            console.log("subs --", subtitles)

            const res3 = await Promise.all(
                sub_ids?.map(id => {
                    return supabase
                        .from("contents")
                        .select("*")
                        .eq("subtitle_id", id)
                })
            )

            console.log(res3)

            const contents: string[] = []
            const imgUrls: string[] = []
            res3.map(ele => {
                if (Array.isArray(ele.data)) {
                    ele.data.forEach((item: any) => {
                        contents.push(item.content || "");
                        imgUrls.push(item.img || "")
                    });
                }
            })

            console.log("res 3 -- ", contents, imgUrls)

            return NextResponse.json({ msg: "Blog Succefully Obtained", data: res.data, Subtitles: subtitles, contents: contents, img: imgUrls }, { status: 200 })
        } catch (error) {
            console.log(error)
            return NextResponse.json({ msg: "Error while getting bolg : ", error }, { status: 500 })
        }
    }
}