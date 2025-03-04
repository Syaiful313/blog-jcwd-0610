import { BlogPost } from "@/types/blog";
import { BlogCard } from "@/components/BlogCard";
import Image from "next/image";
import { Button } from "./ui/button";

interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1, 4);
  const specialPost = posts[4];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12 md:py-16 sm:px-6 lg:px-8">
      <div className="mb-8 sm:mb-12 md:mb-16">
        <BlogCard post={featuredPost} isFeatured={true} />
      </div>

      <div className="mb-8 sm:mb-12 md:mb-16 grid grid-cols-1 gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 md:grid-cols-3">
        {regularPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="flex flex-col justify-center space-y-3 sm:space-y-4 p-2 sm:p-4 order-2 lg:order-1">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
            {specialPost.title}
          </h2>
          <p className="text-sm sm:text-base text-gray-600">{specialPost.excerpt}</p>
          <div className="flex items-center justify-between pt-2 sm:pt-4">
            <p className="text-xs sm:text-sm text-gray-500">{specialPost.date}</p>
            <Button
              variant="link"
              className="p-0 text-sm sm:text-base text-gray-700 hover:text-indigo-600"
            >
              Read more
            </Button>
          </div>
        </div>
        <div className="order-1 lg:order-2 mb-4 lg:mb-0">
          <Image
            src={specialPost.imageUrl}
            alt={specialPost.title}
            width={600}
            height={400}
            className="w-full rounded-md object-cover h-48 sm:h-64 md:h-80 lg:h-full"
          />
        </div>
      </div>

      <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center sm:justify-end">
        <Button className="bg-indigo-600 text-white hover:bg-indigo-700 text-sm sm:text-base">
          See more
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 16 16 12 12 8" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </Button>
      </div>
    </div>
  );
}