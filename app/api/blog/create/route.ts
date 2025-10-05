import { supabase } from "@/lib/supabase-client";
import { NextResponse } from "next/server";

interface ISubtitle {
    subtitle: string
}

interface IContent {
    content: string
}


export async function POST(req: Request) {
    try {
        const body = await req.formData();
        // console.log(body)
        const title = body.get("title") as string;
        const author_id = body.get("author_id") as string;

        // parse arrays back from JSON
        const subtitles: ISubtitle[] = JSON.parse(body.get("subtitles") as string);
        const contents: IContent[] = JSON.parse(body.get("contents") as string);
        const imgUrls: string[] = JSON.parse(body.get("imgUrls") as string);

        // files
        const imgFiles = body.getAll("imgFiles") as File[]; // array of File/Blob

        // console.log("title : ", title)
        // console.log("id : ", author_id)
        // console.log("subtiles : ", subtitles)
        // console.log("contents : ", contents)
        // console.log("img : ", imgUrls)
        // console.log("files : ", imgFiles)


        const { data, error } = await supabase
            .from("posts")
            .insert({ title: title, author_id: Number(author_id) })
            .select("id")
            .single();

        if (error) {
            console.error("Error inserting post:", error);
        } else {
            console.log("Inserted post:", data);
        }

        const post_id = data?.id

        const res = await supabase
            .from("subtitles")
            .insert(
                subtitles.map((sub) => ({ post_id, subtitle: sub.subtitle }))
            ).select("id")

        if (res.error) {
            console.log("Error while saving subtitles : ", res.error)
        } else {
            console.log(res.data)
        }

        let sub_ids: number[] = []

        res.data?.map(ele => {
            sub_ids.push(ele.id)
        })

        // Upload images (if any) — await them all
        let uploadedUrls: string[] = [];

        if (imgFiles.length > 0) {
            // console.log("fils")
            const bucketName = "Blog-Cover-Imgs"

            const uploadPromises = imgFiles.map(async (file: File, idx: number) => {
                const arrayBuffer = await file.arrayBuffer();
                // Node Buffer — if running in Edge runtime, convert differently
                const buffer = Buffer.from(arrayBuffer);
                const filePath = `${Date.now()}-${idx}-${file.name}`; // keeps order
                const { error: uploadError } = await supabase.storage
                    .from(bucketName)
                    .upload(filePath, buffer, {
                        contentType: file.type,
                        cacheControl: "3600",
                        upsert: false,
                    });

                if (uploadError) throw uploadError;

                const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(filePath);
                return urlData.publicUrl;
            });

            // WAIT for all uploads to finish; Promise.all preserves indices order.
            uploadedUrls = await Promise.all(uploadPromises)
            console.log("uploadedUrls -> ",uploadedUrls)
        }



        const res2 = await Promise.all(
            sub_ids?.map((id, idx) => {
                return supabase
                    .from("contents")
                    .insert({
                        subtitle_id: id,
                        content: contents[idx].content,
                        img: uploadedUrls[idx] || ""
                    });
            })
        );

        // console.log(res2)



        return NextResponse.json({ msg: 'Blog Posted !', body }, { status: 200 })

    } catch (error: unknown) {
        console.log(error)
        if (error instanceof Error) {
            return NextResponse.json(
                { msg: 'Error Occur while posting blog -> ', error: error.message },
                { status: 500 }
            );
        } else {
            return NextResponse.json(
                { msg: 'Unknown Error Occur while posting blog -> ', error: String(error) },
                { status: 500 }
            );
        }
    }
}