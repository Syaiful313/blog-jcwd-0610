import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { useGetBlog } from "@/hooks/api/blog/useGetBlog";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface BlogParams {
  slug: string;
}

interface BlogDetailProps {
  params: Promise<BlogParams>;
}

const BlogPostPage: FC<BlogDetailProps> = async ({ params }) => {
  const slug = (await params).slug;
  const blogs = await useGetBlog(slug);

  return (
    <div className="container mx-auto py-10">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/blogs">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>
      </Button>
      <article className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">
            {blogs[0].title}
          </h1>
          <div className="text-muted-foreground flex items-center justify-center gap-4">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <time dateTime={blogs[0].created}>
                {formatDate(blogs[0].created)}
              </time>
              <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              <span>{blogs[0].author.name}</span>
            </div>
            </div>
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              <span>{blogs[0].ownerId}</span>
            </div>
            <Link
              href={`/categories/${blogs[0].slug}`}
              className="text-primary hover:underline"
            >
              {blogs[0]?.category}
            </Link>
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-lg">
          <Image
            src={blogs[0].thumbnail || "/placeholder.svg"}
            alt={blogs[0].title}
            width={1200}
            height={630}
            className="w-full object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <Markdown content={blogs[0].content}/>
        </div>
      </article>
    </div>
  );
};

export default BlogPostPage;
