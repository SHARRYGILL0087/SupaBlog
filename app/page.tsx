'use client'
import Image from "next/image";
import LatestBlogs from "./components/LatestBlogs";
import Typed from "typed.js";
import { useRef, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { login } from "@/redux/slices/isloginSlice";

export default function Home() {
  const el = useRef<HTMLSpanElement>(null);
  const isLogin = useSelector((state: RootState) => state.isLoginSlice.isLogin);
  const dispatch = useDispatch<AppDispatch>();

  console.log("IsLogin -> ", isLogin);

  const getUser = async () => {
    try {
      const res = await axios.get("api/auth/refresh");
      console.log(res.data);
      if (res.data) {
        dispatch(login());
      }
    } catch (error) {
      console.log("Error while getting user ->", error);
    }
  };

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
    <main className="overflow-x-hidden">
      {/* HERO SECTION */}
      <section className="w-full min-h-[70vh] flex flex-col-reverse lg:flex-row items-center justify-center px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-10">
        {/* Left content */}
        <div className="w-full lg:w-1/2 text-center lg:text-left mt-6 lg:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 leading-snug">
            Share your ideas, tell your story, and inspire the world
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium">
            Discover voices, explore perspectives, and create your own{" "}
            <span ref={el} className="text-blue-600 font-semibold"></span>.
          </p>
        </div>

        {/* Right image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            height={500}
            width={500}
            alt="Blog"
            src="/blog.jpg"
            className="w-[250px] sm:w-[350px] md:w-[450px] lg:w-[500px] xl:w-[550px] rounded-xl object-contain"
          />
        </div>
      </section>

      {/* MID SECTION */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 my-10 text-center lg:text-left">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold font-serif">
            Blog with the best
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 mt-3 mx-auto lg:mx-0 w-full md:w-[80%] lg:w-[70%]">
            More bloggers and independent creators choose WordPress than any
            other blogging tool. Tap into intuitive, flexible tools that put
            writers, bloggers, and creators first.
          </p>
          <Link href="/blog/create">
            <button className="font-semibold text-lg sm:text-xl md:text-2xl px-4 py-2 mt-5 rounded-2xl bg-gray-800 hover:bg-slate-900 text-white transition-all duration-300">
              Start a blog
            </button>
          </Link>
        </div>
      </section>

      {/* IMAGE SECTION */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 my-10">
        <div className="w-full bg-slate-100 border p-3 sm:p-4 rounded-2xl shadow-sm">
          <Image
            height={900}
            width={1000}
            src="/blog1.jpg"
            alt="Blog1"
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>
      </section>

      {/* LATEST BLOGS */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 my-10">
        <LatestBlogs />
      </section>
    </main>
  );
}
