import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    const { email  } = await req.json()
    console.log(email)

    if (!email) return NextResponse.json({ msg: "Email required" }, { status: 400 })

    try {
        const res = await axios.get("https://api.kickbox.com/v2/verify", {
            params: {
                email,
                apikey : process.env.KICKBOX_API_KEY
            }
        }
        )

        const data = res.data;

        if(data.result === "deliverable"){
            return NextResponse.json({valid : true} , {status : 200})
        } else{
            return NextResponse.json({valid : false , reason : data.result} , {status : 200})
        }

    } catch (error: any) {
        console.error('Kickbox API Error : ', error.message)
        return NextResponse.json({ msg: "Server Error ", error }, { status: 500 })
    }
}