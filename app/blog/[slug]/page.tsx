import { notFound } from "next/navigation";
import Navbar from "@/components/common/navbar";
import BlogsInner from "@/components/pages/blogs/blogs-inner/blogsInner";
import Footer from "@/components/common/footer";
import { blogPosts } from "@/data/blogData";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <BlogsInner post={post} />
      <Footer />
    </>
  );
}
