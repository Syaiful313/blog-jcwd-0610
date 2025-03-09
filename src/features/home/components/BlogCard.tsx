import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Blog } from "@/types/blog";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  post: Blog;
  isFeatured?: boolean;
  className?: string;
}

export function BlogCard({
  post,
  isFeatured = false,
  className = "",
}: BlogCardProps) {
  return (
    <Card className={`overflow-hidden border-none shadow-none ${className}`}>
      <div
        className={`relative ${isFeatured ? "flex flex-row-reverse items-center" : ""}`}
      >
        <div className={`${isFeatured ? "w-1/2" : "w-full"}`}>
          <div className="overflow-hidden rounded-lg">
            <Image
              src={post.thumbnail}
              alt={post.title}
              width={isFeatured ? 500 : 400}
              height={isFeatured ? 300 : 240}
              className="w-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

        <CardContent className={`pt-6 ${isFeatured ? "w-1/2 px-6" : ""}`}>
          <h2 className="mb-4 text-2xl font-bold text-gray-800">
            {post.title}
          </h2>
          <p className="line-clamp-2 text-gray-600">{post.description}</p>
        </CardContent>
      </div>

      <CardFooter className="flex items-center justify-between pt-2 pb-6">
        <p className="text-sm text-gray-500">{formatDate(post.created)}</p>
        <Link
          href={`/blogs/${post.slug}`}
          className="text-sm font-medium hover:underline"
        >
          Read more
        </Link>
      </CardFooter>
    </Card>
  );
}
