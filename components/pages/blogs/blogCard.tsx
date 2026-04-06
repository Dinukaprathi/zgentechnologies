"use client";

import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { BlogPost } from "@/data/blogData";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group relative w-full bg-[#111113] border border-white/5 rounded-2xl overflow-hidden transition-all duration-500 hover:border-[#ff1111]/30 hover:shadow-[0_0_40px_-15px_rgba(255,17,17,0.1)] flex flex-row items-center"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Blog Image */}
      <div className="relative w-1/3 aspect-video overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#111113]/40 z-10" />
        <Image
          src={post.image || "/blog/placeholder.jpg"}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Blog Content */}
      <div className="px-8 py-4 flex-grow">
        <h3 className="text-lg sm:text-xl font-bold text-white leading-tight group-hover:text-[#ff1111] transition-colors duration-300 line-clamp-1">
          {post.title}
        </h3>
      </div>

      {/* Action Arrow */}
      <div className="pr-8">
        <div className="w-8 h-8 rounded-full bg-[#ff1111]/10 flex items-center justify-center text-[#ff1111] group-hover:bg-[#ff1111] group-hover:text-white transition-all duration-300">
          <FaArrowRight className="text-xs" />
        </div>
      </div>
    </Link>
  );
}
