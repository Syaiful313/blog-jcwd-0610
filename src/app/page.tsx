import { BlogList } from "@/components/BlogList";
import HeroSection from "@/components/HeroSection";
import { blogPosts } from "@/data/blog-post";

export default async function Home() {
  return (
    <main>
      <HeroSection />
      <BlogList posts={blogPosts} />
    </main>
  );
}
