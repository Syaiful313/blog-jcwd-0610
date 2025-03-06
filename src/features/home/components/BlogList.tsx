"use client";
import { BlogCard } from "@/features/home/components/BlogCard";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import useGetBlogs from "@/hooks/api/blog/useGetBlogs";
import { formatDate } from "@/lib/utils";

export function BlogList() {
  const { blogs, isLoading, getBlogs } = useGetBlogs();

  if (isLoading) {
    return <p className="text-center text-gray-500">Loading blogs...</p>;
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No blogs found.</p>
        <Button onClick={getBlogs} className="mt-4">
          Refresh
        </Button>
      </div>
    );
  }

  const featuredPost = blogs[0];
  const regularPosts = blogs.slice(1, 4);
  const specialPost = blogs[4];

  return (
    <div className="container mx-auto py-8 sm:py-12 md:py-16">
      <div className="mb-8 sm:mb-12 md:mb-16">
        <BlogCard post={featuredPost} isFeatured={true} />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:mb-12 sm:grid-cols-2 sm:gap-6 md:mb-16 md:grid-cols-3 md:gap-8">
        {regularPosts.map((post) => (
          <BlogCard key={post.objectId} post={post} />
        ))}
      </div>

      {specialPost && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="order-2 flex flex-col justify-center space-y-3 p-2 sm:space-y-4 sm:p-4 lg:order-1">
            <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl md:text-4xl">
              {specialPost.title}
            </h2>
            <p className="text-sm text-gray-600 sm:text-base">
              {specialPost.description}
            </p>
            <div className="flex items-center justify-between pt-2 sm:pt-4">
              <p className="text-xs text-gray-500 sm:text-sm">
                {formatDate(specialPost.created)}
              </p>
              <Button variant="link" className="p-0 text-sm sm:text-base">
                Read more
              </Button>
            </div>
          </div>
          <div className="order-1 mb-4 lg:order-2 lg:mb-0">
            <Image
              src={specialPost.thumbnail}
              alt={specialPost.title}
              width={600}
              height={400}
              className="h-48 w-full rounded-md object-cover sm:h-64 md:h-80 lg:h-full"
            />
          </div>
        </div>
      )}

      <div className="mt-8 flex justify-center sm:mt-10 sm:justify-end md:mt-12">
        <Button className="text-sm sm:text-base">
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
            className="ml-1 h-3 w-3 sm:ml-2 sm:h-4 sm:w-4"
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
