'use client'
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

import { Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { login } from "@/redux/slices/isloginSlice";

export default function SignUp() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [otp, setOtp] = useState("")
  const [showOtpBox, setShowOtpBox] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [varified, setVarified] = useState(false)
  const isLogin = useSelector((state : RootState) => state.isLoginSlice.isLogin)
 const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submited')
    if (!varified) return console.error("Email is not Varified")
    try {
      setIsLoading(true)
      const res = await axios.post('/api/user/signup', { ...formData })
      console.log(res.data)
      if (res.data.msg === "Sign Up Successfully!") {
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
      dispatch(login())
      router.push("/")
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  };

  const handleSendOpt = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      console.log(formData.email)


      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

      const isValid = await axios.post(`${baseUrl}/api/user/varify-email`, { email: formData.email })

      console.log('isValid -> ', isValid.data)

      if (!isValid.data.valid) {
        setIsLoading(false)
        console.log({ msg: "Invalid Email" })
        return
      }
      const res = await axios.post("/api/auth/send-otp", { email: formData.email });
      console.log(res.data.msg)
      if (res.data.msg === "OTP sent successfully") {
        setShowOtpBox(true)
      }
      setIsLoading(false)
      toast(`${res.data.msg}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    } catch (error) {
      setIsLoading(false)
      console.log("Error while sending OTP ", error)
    }
  }

  const handleVarigyOtp = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    console.log(otp)
    if (otp.length < 6) {
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
    try {
      setIsLoading(true)
      const res = await axios.post("/api/auth/varify-otp", {
        email: formData.email,
        otp
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
        setOtp("")
        setShowOtpBox(false)
        setVarified(true)
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      console.log(error)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {isLoading && <div className="flex items-center justify-center  absolute inset-0 ">
          <p className="flex gap-2 items-center py-1.5 px-5 rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="text-xl">Loading...</span>
          </p>
        </div>}
        {/* Heading */}
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Create an account
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Start your blogging journey with us.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div className="relative w-full">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-1 w-[80%] p-2  rounded-md rounded-r-none border-r-0 border  border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 "
              />
              <button onClick={handleSendOpt} disabled={formData.email.length === 0} className={`w-[20%] py-2 z-50 right-0 top-1 rounded-l-none absolute  text-white font-semibold rounded-sm   border-l-0 border border-gray-300 ${formData.email.length === 0 ? "bg-blue-400" : "bg-blue-500 cursor-pointer hover:bg-blue-600"}`}>Send Otp</button>
            </div>
          </div>


          {showOtpBox && <div>
            <label className="block text-sm font-medium text-gray-700">
              OTP
            </label>
            <div className="relative w-full">
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => { setOtp(e.target.value) }}
                placeholder="Enter your otp"
                className="mt-1 w-[80%] p-2  rounded-md rounded-r-none border-r-0 border  border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 "
              />
              <button onClick={(e) => handleVarigyOtp(e)} disabled={otp.length === 0} className={`w-[20%] py-2 z-50 right-0 top-1 rounded-l-none absolute  text-white font-semibold rounded-sm   border-l-0 border border-gray-300 ${otp.length === 0 ? "bg-blue-400" : "bg-blue-500 cursor-pointer hover:bg-blue-600"}`}>Varify</button>
            </div>
          </div>}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 cursor-pointer"
          >
            Sign up
          </button>

        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400">Or continue with</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Button */}
        <button className="flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-700 shadow-sm hover:bg-gray-50">
          <FcGoogle className="mr-2 text-xl" /> Sign up with Google
        </button>

        {/* Login Redirect */}
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/user/login" className="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
