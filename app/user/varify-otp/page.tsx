"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react"


export default function VerifyOtpPage() {
    const router = useRouter()
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [isLoading, setIsLoading] = useState(false)

    const handleChange = (value: string, index: number) => {
        if (/^[0-9]$/.test(value)) {
            const newotp = [...otp];
            newotp[index] = value;
            setOtp(newotp)

            if (index < otp.length - 1) {
                const nextInput = document.getElementById(`otp-${index + 1}`)
                nextInput?.focus();
            }

        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Enter") {
            const nextInput = document.getElementById(`otp-${index + 1}`)
            nextInput?.focus();
        }
        if (e.key === "Backspace") {
            if (otp[index]) {
                const newotp = [...otp]
                newotp[index] = ""
                setOtp(newotp)
            }
            else if (index > 0) {
                const prevInput = document.getElementById(`otp-${index - 1}`);
                prevInput?.focus();
            }
        }
    }

    const handleVerify = async () => {
        const otpCode = otp.join("");
        if (otpCode.length < 6) {
            toast('Otp must be of 6 Digits!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }
        setIsLoading(true)
        try {
            const res = await axios.post("http://localhost:3000/api/auth/varify-otp", {
                email: "shamshersinghgill0087@gmail.com",
                otp: otpCode
            })
            console.log(res.data)
            if (res.data.msg === "OTP verified successfully!") {
                toast('OTP verified successfully', {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
                setOtp(Array(6).fill(""))
                router.push("/user/new-pass")
            }
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log("Error while varifying OTP ", error)
        }
    };

    const handleResend = async () => {
        try {
            const res = await axios.post("/api/auth/send-otp", { email: "shamshersinghgill0087@gmail.com" });
            console.log(res.data.msg)
            toast(`${res.data.msg}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
        } catch (error) {
            console.log("Error while sending otp : ", error)
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {isLoading && <div className="flex items-center justify-center  absolute inset-0 ">
                <p className="flex gap-2 items-center py-1.5 px-5 rounded-lg">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <span className="text-xl">Loading...</span>
                </p>
            </div>}
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
                <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
                <p className="text-gray-600 mb-6">
                    Enter the 6-digit OTP sent to your email
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-center gap-3 mb-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            className="w-12 h-12 border-2 border-gray-300 rounded-lg text-center text-lg focus:outline-none focus:border-blue-500"
                        />
                    ))}
                </div>

                {/* Verify Button */}
                <button
                    onClick={handleVerify}
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition"
                >
                    Verify OTP
                </button>

                {/* Resend Link */}
                <p className="mt-4 text-sm text-gray-600">
                    Didn’t receive OTP?{" "}
                    <button onClick={handleResend} className="text-blue-600 font-medium hover:underline cursor-pointer">
                        Resend
                    </button>
                </p>
            </div>
        </div>
    );
}
