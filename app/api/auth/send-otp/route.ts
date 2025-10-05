import { supabase } from "@/lib/supabase-client";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer"

export async function POST(req: Request) {
    try {
        const { email } = await req.json()
        if (!email) return NextResponse.json({ msg: "Email Required" }, { status: 400 })

        const { data: user, error: userError } = await supabase.from("users").select("id").eq("email", email)

        if (!user) {
            return NextResponse.json({ msg: "User Not Found!" }, { status: 400 })
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // console.log(otp)

        const hashotp = await bcrypt.hash(otp, 10)

        // expiry time 10 min
        const expires_at = new Date(Date.now() + 10 * 60 * 1000);

        const { data, error } = await supabase.from("password_otps").insert({ email, otp: hashotp, expires_at })
        // console.log({ data , error })

        if (error) return NextResponse.json({ msg: "Error while inserting Otp" }, { status: 400 })

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_ADDRESS,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_ADDRESS,
            to: email,
            subject: 'Password Reset OTP',
            html: `<p>Your OTP for password reset is: <strong>${otp}</strong></p><p>This code is valid for 10 minutes.</p>`,
        }

        await transporter.sendMail(mailOptions)


        return NextResponse.json({ msg: "OTP sent successfully" }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ msg: "Failed to send Otp" }, { status: 500 })
    }
}