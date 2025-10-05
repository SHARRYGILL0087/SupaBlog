'use client'
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react"


export default function ForgotPassword() {
  const router = useRouter()
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false)

  const handleSendOtp = async () => {
    try {
      setIsLoading(true)
      const res = await axios.post("/api/auth/send-otp", { email });
      console.log(res.data.msg)
      if (res.data.msg === "OTP sent successfully") router.push("/user/varify-otp")
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
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }

    return (
      <div className="flex items-center justify-center h-screen">
        {isLoading && <div className="flex items-center justify-center  absolute inset-0 ">
          <p className="flex gap-2 items-center py-1.5 px-5 rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="text-xl">Loading...</span>
          </p>
        </div>}
        <div className="p-6 bg-white rounded-2xl shadow-md w-xl">
          <h2 className="text-xl font-bold mb-3">Forgot Password</h2>
          <p className="text-md my-3 font-light tracking-tight">Enter your registered email to receive an OTP</p>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-md p-2 mb-4"
          />
          <button
            onClick={handleSendOtp}
            className="w-full bg-blue-500 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600"
          >
            Send OTP
          </button>
        </div>
      </div>
    );
  }
}
