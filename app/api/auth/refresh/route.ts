import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function GET(req:NextRequest) {
    const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "yourrefreshtokensecret"
    const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET"
    const cookies = req.cookies || ""
    const refreshtoken = cookies.get("refreshtoken") 
    console.log(refreshtoken)

    if(!refreshtoken) return NextResponse.json({msg : "Refresh Token missing"} , {status : 400})
    try {

        const decoded = jwt.verify(refreshtoken.value, REFRESH_TOKEN_SECRET);

        let userId: string | undefined;
        if (typeof decoded === "object" && "userId" in decoded) {
            userId = (decoded as jwt.JwtPayload).userId as string;
        }

        if (!userId) {
            return NextResponse.json({ msg: "Invalid token payload" }, { status: 400 });
        }

        const newAccessToken = jwt.sign(
            { userId },
            ACCESS_TOKEN_SECRET,
            { expiresIn: "15m" }
        );

        return NextResponse.json({msg : "Token Refreshed" , accessToken: newAccessToken , userId } , {status : 200})
            
    } catch (error) {
        console.log(error)
        return NextResponse.json({msg : "Error while Refreshing Token"} , {status : 500 })
    }
}