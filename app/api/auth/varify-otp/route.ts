import { supabase } from "@/lib/supabase-client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { email, otp } = await req.json()
        console.log({ email, otp })

        if (!email || !otp) return NextResponse.json({ msg: "Credentials Required!" }, { status: 400 })

        const { data: otpEntry, error: otpError } = await supabase
            .from("password_otps")
            .select("otp , expires_at")
            .eq("email", email)
            .order("created_at", { ascending: false })
            .limit(1)
            .single();

        console.log(otpEntry)

        if (!otpEntry) return NextResponse.json({ msg: "OTP not found. Please request again." }, { status: 400 });

        const now = new Date();
        if (new Date(otpEntry.expires_at) < now) {
            return NextResponse.json({ msg: "OTP expired. Please request a new one." }, { status: 400 });
        }

        const isValid = await bcrypt.compare(otp, otpEntry.otp)

        if (!isValid) return NextResponse.json({ msg: "Invalid Otp" }, { status: 400 })
        console.log("Last Step")

        await supabase.from("password_otps").delete().eq("email", email);

        return NextResponse.json({ msg: "OTP verified successfully!" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ msg: "Failed to verify OTP" }, { status: 500 });
    }
}