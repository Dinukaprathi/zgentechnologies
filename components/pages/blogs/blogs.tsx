"use client";

import { useRef } from "react";
import { blogPosts } from "@/data/blogData";
import { useBlogCategoryFilter } from "@/hooks/bloghooks";
import BlogCard from "./blogCard";

export default function Blogs() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { activeCategory, setActiveCategory, filteredPosts, categories } =
    useBlogCategoryFilter(blogPosts);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen bg-[#050507] pt-28 pb-24 md:pt-32 lg:pb-40"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mb-8 flex flex-wrap items-center gap-3">
          {categories.map((category) => {
            const isActive = category === activeCategory;

            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] transition-all duration-200 ${
                  isActive
                    ? "border-[#ff1111] bg-[#ff1111]/15 text-[#ff1111]"
                    : "border-white/15 bg-white/5 text-zinc-300 hover:border-[#ff1111]/50 hover:text-white"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 gap-8 md:gap-12">
          {filteredPosts.map((post, idx) => (
            <div key={post.id} className="w-full">
              <BlogCard post={post} index={idx} />
            </div>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <p className="mt-10 text-center text-sm uppercase tracking-[0.16em] text-zinc-500">
            No posts available for {activeCategory}.
          </p>
        )}
      </div>
    </section>
  );
}
