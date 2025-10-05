'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import CommentsSection from "@/app/components/CommentsSection";

type Comment = {
  id?: number;
  content: string;
  post_id: number;
  user_id: number;
  created_at?: string;
  user_name: string;
};

export default function BlogPage() {
  const router = useRouter();
  const params = useParams()
  const post_id = params.id


  const [blog, setBlog] = useState<any>(null);
  const [isLike, setIsLike] = useState(false);
  const [isComments, setIsComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  // Fetch blog and related data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.post("/api/blog/get", { post_id });
        console.log("Blog Data ->", res.data);
        setBlog(res.data);
      } catch (error) {
        console.log("Error fetching blog ->", error);
      }
    };

    const fetchLikesAndComments = async () => {
      try {
        const res = await axios.post("/api/blog/getcl", { post_id, user_id: 12 });
        console.log("Likes & Comments ->", res.data);

        if (res.data.isLike) setIsLike(true);
        if (res.data.comments) setComments(res.data.comments);
      } catch (error) {
        console.log("Error fetching likes/comments ->", error);
      }
    };

    fetchBlog();
    fetchLikesAndComments();
  }, []);

  const handleLike = async () => {
    try {
      const res = await axios.post("/api/blog/like", {
        post_id,
        user_id: 12,
        isLike,
      });
      console.log("Like Response ->", res.data);
      setIsLike(!isLike);
    } catch (error) {
      console.log("Error toggling like ->", error);
    }
  };

  const handleComment = async () => {
    if (comment.trim() === "") return;

    try {
      const res = await axios.post("/api/blog/comments", {
        content: comment,
        post_id,
        user_id: 12,
        user_name: "Sharry Gill",
      });
      console.log("Comment Added ->", res.data);

      setComments((prev) => [
        { content: comment, post_id : 12, user_id: 12, user_name: "Sharry Gill" },
        ...prev,
      ]);

      setComment("");
    } catch (error) {
      console.log("Error adding comment ->", error);
    }
  };

  if (!blog) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading Blog...
      </div>
    );
  }

  const { data, Subtitles, contents, img } = blog;
  const { title } = data[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-center mb-8">{title}</h1>

      {/* Blog Body */}
      <div className="space-y-12">
        {Subtitles.map((subtitle: string, index: number) => (
          <div key={index} className="space-y-4">
            <h2 className="text-2xl font-semibold">{subtitle}</h2>

            {/* Image (if exists) */}
            {img[index] && (
              <div className="w-full h-64 relative rounded-xl overflow-hidden shadow-md">
                <Image
                  src={img[index]}
                  alt={subtitle}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            )}

            {/* Content */}
            <p className="text-lg leading-relaxed text-gray-700">
              {contents[index]}
            </p>
          </div>
        ))}
      </div>

      {/* Like & Comment Buttons */}
      <div className="flex justify-center gap-6 mt-12">
        <button
          onClick={handleLike}
          className={`px-6 py-2 cursor-pointer text-white rounded-2xl shadow transition ${
            isLike ? "bg-blue-600" : "bg-slate-600"
          }`}
        >
          👍 {isLike ? "Liked" : "Like"}
        </button>

        <button
          onClick={() => setIsComments(!isComments)}
          className="px-6 py-2 cursor-pointer bg-gray-800 text-white rounded-2xl shadow hover:bg-gray-900 transition"
        >
          💬 Comment
        </button>
      </div>

      {/* Comments Section */}
      <section>
        <CommentsSection
          comments={comments}
          isComments={isComments}
          comment={comment}
          setComment={setComment}
          handleComment={handleComment}
        />
      </section>
    </div>
  );
}
