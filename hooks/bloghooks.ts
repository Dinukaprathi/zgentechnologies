"use client";

import { useMemo, useState } from "react";
import { BlogPost } from "@/data/blogData";

export const BLOG_CATEGORIES = [
	"All",
	"Products",
	"Services",
	"News",
	"Events",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

export function useBlogCategoryFilter(posts: BlogPost[]) {
	const [activeCategory, setActiveCategory] = useState<BlogCategory>("All");

	const filteredPosts = useMemo(() => {
		if (activeCategory === "All") {
			return posts;
		}

		return posts.filter((post) => post.category === activeCategory);
	}, [activeCategory, posts]);

	return {
		activeCategory,
		setActiveCategory,
		filteredPosts,
		categories: BLOG_CATEGORIES,
	};
}
