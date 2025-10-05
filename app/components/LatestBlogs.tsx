import React, { useEffect, useState } from 'react'
import PostCard from './PostCard';
import axios from 'axios';

interface blogs {
    id?: number;
    title: string;
    subtitle : string;
    coverImg : string;
    created_at?: Date;
    post_id : number;
}

const LatestBlogs = () => {

    // Sample posts array for testing

    const samplePosts = [
        {
            title: "Welcome to SupaBlog!",
            content: "This is your first post. SupaBlog is a modern blogging platform powered by Next.js and Supabase.",
            author: "Admin",
            createdAt: new Date().toISOString(),
            imgSrc: "/front.jpg",
        },
        {
            title: "Next.js + Supabase Guide",
            content: "Learn how to build full-stack apps with Next.js and Supabase. This guide covers setup, authentication, and CRUD operations.",
            author: "Jane Doe",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            imgSrc: "/front.jpg",
        },
        {
            title: "Dark Mode in React",
            content: "Implementing dark mode in your React app is easy with Tailwind CSS and context providers. Read more to see how!",
            author: "John Smith",
            createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
            imgSrc: "/front.jpg",
        },
        {
            title: "Dark Mode in React",
            content: "Implementing dark mode in your React app is easy with Tailwind CSS and context providers. Read more to see how!",
            author: "John Smith",
            createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
            imgSrc: "/front.jpg",
        },
        {
            title: "Dark Mode in React",
            content: "Implementing dark mode in your React app is easy with Tailwind CSS and context providers. Read more to see how!",
            author: "John Smith",
            createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
            imgSrc: "/front.jpg",
        },
        {
            title: "Dark Mode in React",
            content: "Implementing dark mode in your React app is easy with Tailwind CSS and context providers. Read more to see how!",
            author: "John Smith",
            createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
            imgSrc: "/front.jpg",
        },
        {
            title: "Dark Mode in React",
            content: "Implementing dark mode in your React app is easy with Tailwind CSS and context providers. Read more to see how!",
            author: "John Smith",
            createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
            imgSrc: "/front.jpg",
        },
        {
            title: "Dark Mode in React",
            content: "Implementing dark mode in your React app is easy with Tailwind CSS and context providers. Read more to see how!",
            author: "John Smith",
            createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
            imgSrc: "/front.jpg",
        },
        {
            title: "Dark Mode in React",
            content: "Implementing dark mode in your React app is easy with Tailwind CSS and context providers. Read more to see how!",
            author: "John Smith",
            createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
            imgSrc: "/front.jpg",
        },
    ];

    const [LatestBlogs, setLatestBlogs] = useState<blogs[]>([])

    const fetchLatestBlogs = async () => {
        try {
            const res = await axios.post("/api/blog/get", { post_id: 0 })
            console.log("Data -> ", res.data)
            setLatestBlogs(res.data.blogs)
        } catch (error) {
            console.log("Err while fetching Latest Blogs -> ", error)
        }
    }

    useEffect(() => {
        fetchLatestBlogs();
    }, [])


    return (
        <div className='container mx-auto w-[95vw] py-2.5 px-2 '>
            <div className='flex items-center justify-center my-6'>
                <div className="flex-grow border-t border-gray-300"></div>
                <h1 className="px-4 text-lg font-semibold text-gray-700 tracking-wide">
                    LATEST POSTS
                </h1>
                <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="max-w-full mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
                {LatestBlogs.map((post, idx) => (
                    <PostCard key={idx} {...post} />
                ))}
            </div>

        </div>
    )
}

export default LatestBlogs
