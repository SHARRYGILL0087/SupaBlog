'use client'
import Image from "next/image";
import LatestBlogs from "./components/LatestBlogs";
import Typed from "typed.js";
import { useRef } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { login } from "@/redux/slices/isloginSlice";



export default function Home() {
  const el = useRef<HTMLSpanElement>(null);
  const isLogin = useSelector((state: RootState) => state.isLoginSlice.isLogin)
    const dispatch = useDispatch<AppDispatch>();

  console.log("IsLogin -> ", isLogin)

  const getUser = async () => {
    try {
      const res = await axios.get("api/auth/refresh")
      console.log(res.data)
      if(res.data){
        dispatch(login())
      }
    } catch (error) {
      console.log("Error while getting user ->",error)
    }
  }

  useEffect(() => {
    if (el.current) {
      const typed = new Typed(el.current, {
        strings: ["blog", "articles", "stories", "posts"],
        typeSpeed: 80,
        backSpeed: 50,
        loop: true,
      });

      getUser();

      return () => {
        typed.destroy();
      };
    }
  }, []);


  return (
    <main>
      <section className="w-full h-[80vh] ">
        <div className="flex items-center justify-center w-full h-full px-12">
          <div className="w-1/2 ">
            <div className="flex flex-col w-2xl">
              <h1 className="text-4xl font-bold mb-2">
                Share your ideas, tell your story, and inspire the world
              </h1>
              <p className="text-3xl text-gray-700 font-medium">
                Discover voices, explore perspectives, and create your own{" "}
                <span ref={el} className="text-blue-600 font-semibold"></span>.
              </p>
            </div>
          </div>
          <div className="w-1/2">
            <Image
              height={500}
              width={500}
              alt="Blog"
              src={'/blog.jpg'}
              className="w-[550px]"
            ></Image>
          </div>
        </div>
      </section>
      <section>
        <div className="container mx-auto w-[90vw] my-5">
          <h1 className="text-6xl font-semibold font-serif">Blog with the best</h1>
          <p className="text-xl font-semibold w-[70%] mt-2">More bloggers and independent creators choose WordPress than any other blogging tool. Tap into intuitive, flexible tools that put writers, bloggers, and creators first.</p>
          <Link href={'/blog/create'}>
            <button className="font-semibold text-2xl px-4 py-2 cursor-pointer bg-gray-800 hover:bg-slate-900 text-white font-serif mt-4 rounded-2xl">Start a blog</button>
          </Link>
        </div>
        <div className="container mx-auto w-[90vw] my-5 border p-4 bg-slate-100 rounded-2xl ">
          <Image
            height={900}
            width={1000}
            src={'/blog1.jpg'}
            alt="Blog1"
            className="w-full"
          ></Image>
        </div>

      </section>

      <section >
        <LatestBlogs />
      </section>
    </main>
  );
}
