import IncrementViews from "@/components/IncrementViews";
import Markdown from "@/components/Markdown";
import { Button } from "@/components/ui/button";
import { formatDate, toIsoDate } from "@/lib/utils";
import { getBlogBySlug } from "@/utils/api";
import { ArrowLeft, Calendar, User } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return { title: "Blog Post Not Found" };
  }

  const images = blog.thumbnail ? [blog.thumbnail] : undefined;

  return {
    title: blog.title,
    description: blog.description,
    openGraph: {
      type: "article",
      title: blog.title,
      description: blog.description,
      publishedTime: toIsoDate(blog.created),
      modifiedTime: toIsoDate(blog.updated),
      authors: blog.author?.name ? [blog.author.name] : undefined,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      images,
    },
  };
}

const BlogPostPage = async ({ params }: BlogDetailProps) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const { author } = blog;

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
                <time dateTime={toIsoDate(blog.created)}>
                  {formatDate(blog.created)}
                </time>
              </div>
              {author && (
                <div className="flex items-center">
                  <User className="mr-1 h-4 w-4" />
                  <Link href={`/author/${author.slug}`}>
                    <span>{author.name}</span>
                  </Link>
                </div>
              )}

              <p>{blog.category}</p>
            </div>
          </div>

          <div className="mb-8 overflow-hidden rounded-lg">
            <Image
              src={blog.thumbnail || "/placeholder.svg"}
              alt={blog.title}
              width={1200}
              height={630}
              priority
              className="w-full object-cover"
            />
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <Markdown content={blog.content} />
          </div>
          {author && (
            <div className="mt-8 border-t pt-4 md:mt-12 md:pt-8">
              <div className="flex items-center gap-4">
                <Image
                  src={author.avatar || "/placeholder.svg"}
                  alt={author.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-bold">{author.name}</h3>
                  <p className="text-muted-foreground text-sm">{author.role}</p>
                  <p className="mt-1 text-sm">{author.bio}</p>
                </div>
              </div>
            </div>
          )}
        </article>
      </div>
      <IncrementViews objectId={blog.objectId} />
    </main>
  );
};

export default BlogPostPage;
