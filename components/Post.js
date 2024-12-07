"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Post({ params }) {
  const id = params.id;
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/post/" + id)
      .then((res) => res.json())
      .then((res) => setPost(res));
  }, []);

  return (
    <>
      {post && (
        <main className="container mx-auto px-4 py-6">
          <Link href="">
            <h2 className="text-3xl font-bold mb-4">{post.title}</h2>
            <p className="text-gray-500">
              Posted on {post.created_at_formatted}
            </p>
            <img
              width={300}
              height={200}
              className="my-4"
              src={post.image}
              alt="Post Image"
            />
            <p>{post.description}</p>
          </Link>
        </main>
      )}
    </>
  );
}
