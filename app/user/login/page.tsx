'use client'
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/redux/store";
import { login } from "@/redux/slices/isloginSlice";



export default function Login() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false)
  const isLogin = useSelector((state : RootState) => state.isLoginSlice.isLogin)
  const dispatch = useDispatch<AppDispatch>();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const res = await axios.post('/api/user/login', { ...formData })
      console.log(res.data)
      if(res.data.msg === "Login Successfully"){
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
       {isLoading && <div className="flex items-center justify-center  absolute inset-0 ">
          <p className="flex gap-2 items-center py-1.5 px-5 rounded-lg">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <span className="text-xl">Loading...</span>
          </p>
        </div>}
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        {/* Heading */}
        <h2 className="mb-2 text-center text-2xl font-bold text-gray-900">
          Log in to your account
        </h2>
        <p className="mb-6 text-center text-gray-600">
          Welcome back! Please enter your details.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
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
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Log in
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
          <FcGoogle className="mr-2 text-xl" /> Log in with Google
        </button>

        {/* Signup Redirect */}
        <div className="flex flex-col items-center">
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link href="/user/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
          <p>
            <Link href={'/user/forgot-pass'} className="text-blue-500 hover:underline text-sm">
              forget password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
