"use client";

import IncrementViews from "@/components/IncrementViews";
import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import useGetBlog from "@/hooks/api/blog/useGetBlog";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, use } from "react";

interface BlogParams {
  slug: string;
}

interface BlogDetailProps {
  params: Promise<BlogParams>;
}

const BlogPostPage: FC<BlogDetailProps> = ({ params }) => {
  const resolvedParams = use(params);
  const slug = resolvedParams?.slug || "";

  const { data: blogs = [], isPending, isError } = useGetBlog(slug);

  if (isPending) {
    return (
      <main className="mx-4 md:mx-0">
        <div className="container mx-auto py-10">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          <article className="mx-auto max-w-3xl">
            <div className="mb-8 text-center">
              <Skeleton className="mx-auto mb-4 h-12 w-3/4" />
              <div className="flex items-center justify-center gap-4">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-20" />
              </div>
            </div>
            <div className="mb-8 overflow-hidden rounded-lg">
              <Skeleton className="h-80 w-full" />
            </div>
            <div className="space-y-4">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-5/6" />
              <Skeleton className="h-6 w-full" />
            </div>
            <div className="mt-8 border-t pt-4 md:mt-12 md:pt-8">
              <div className="flex items-center gap-4">
                <Skeleton className="h-14 w-14 rounded-full" />
                <div className="w-full">
                  <Skeleton className="mb-2 h-5 w-40" />
                  <Skeleton className="mb-2 h-4 w-32" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </main>
    );
  }

  if (isError || !blogs || blogs.length === 0) {
    return (
      <main className="mx-4 md:mx-0">
        <div className="container mx-auto py-10">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/blogs">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-4 text-3xl font-bold">Blog Post Not Found</h1>
            <p>We couldn't find the blog post you're looking for.</p>
          </div>
        </div>
      </main>
    );
  }

  const blog = blogs[0];

  return (
    <main className="mx-4 md:mx-0">
      <div className="container mx-auto py-10">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blogs">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
        <article className="mx-auto max-w-5xl">
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
              {blog.title}
            </h1>
            <div className="text-muted-foreground flex items-center justify-center gap-12">
              <div className="flex items-center">
                <Calendar className="mr-1 h-4 w-4" />
                <time dateTime={blog.created}>{formatDate(blog.created)}</time>
              </div>
              <div className="flex items-center">
                <User className="mr-1 h-4 w-4" />
                <Link href={`/author/${blog.author.slug}`}>
                <span>{blog.author.name}</span>
                </Link>
              </div>
              <Link
                href={`/categories/${blog.category}`}
                className="text-primary hover:underline"
              >
                {blog?.category}
              </Link>
            </div>
          </div>

          <div className="mb-8 overflow-hidden rounded-lg">
            <Image
              src={blog.thumbnail || "/placeholder.svg"}
              alt={blog.title}
              width={1200}
              height={630}
              className="w-full object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Markdown content={blog.content} />
          </div>
          <div className="mt-8 border-t pt-4 md:mt-12 md:pt-8">
            <div className="flex items-center gap-4">
              <Image
                src={blog.author.avatar || "/placeholder.svg"}
                alt={blog.author.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div>
                <h3 className="font-bold">{blog.author.name}</h3>
                <p className="text-muted-foreground text-sm">
                  {blog.author.role}
                </p>
                <p className="mt-1 text-sm">{blog.author.bio}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
      <IncrementViews objectId={blog.objectId} views={blog.views} />
    </main>
  );
};

export default BlogPostPage;
