"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const inputRef = useRef("");
  const [search, setSearch] = useState(false);

  useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/posts")
      .then((res) => res.json())
      .then((res) => setPosts(res));
    console.log(posts);
  }, []);

  const searchPost = (e) => {
    if (e.type === "keydown" && e.key !== "Enter") {
      return;
    }
    setSearch(true);
    setTimeout(() => {
      fetch(
        process.env.NEXT_PUBLIC_API_URL + "/posts?q=" + inputRef.current.value
      )
        .then((res) => res.json())
        .then((res) => setPosts(res))
        .finally(setSearch(false));
    }, 1000);
  };
  return (
    <>
      <main className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-bold mb-4">Welcome to Our Blog</h2>
        <p>Here you can the latest articles.</p>
      </main>
      <div className="flex justify-end px-4">
        <input
          onKeyDown={searchPost}
          type="text"
          ref={inputRef}
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Search..."
        />
        <button
          onClick={searchPost}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-4"
          disabled={search}
        >
          {search ? "...." : "Search"}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map((post) => (
          <Link href={"/post/" + post._id} key={post._id}>
            <div className="border border-gray-200 p-4 mt-4">
              <img
                className="w-full h-48 object-cover mb-4 "
                src={post.image}
                alt="Post Image"
              />
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600">{post.short_description}</p>
            </div>
          </Link>
        ))}
        {!posts.length > 0 && inputRef.current.value && (
          <p>No post available for the query : {inputRef.current.value}</p>
        )}
      </div>
    </>
  );
}
