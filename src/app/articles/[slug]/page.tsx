import { getPostBySlug, getRecentPosts } from "@/lib/data";
import { formatContent, formatDate } from "@/lib/utils";
import { Calendar, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface BlogPostParams {
  slug: string;
}

export default function BlogPostPage({ params }: { params: BlogPostParams }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRecentPosts(3)
    .filter((p) => p.id !== post.id)
    .slice(0, 2);
  const contentParagraphs = formatContent(post.content);

  return (
    <div className="container py-10">
      <article className="mx-auto max-w-3xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold md:text-5xl">{post.title}</h1>
          <div className="text-muted-foreground flex items-center justify-center gap-4">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center">
              <User className="mr-1 h-4 w-4" />
              <span>{post.author.name}</span>
            </div>
            <Link
              href={`/categories/${post.category.slug}`}
              className="text-primary hover:underline"
            >
              {post.category.title}
            </Link>
          </div>
        </div>

        <div className="mb-8 overflow-hidden rounded-lg">
          <Image
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            width={1200}
            height={630}
            className="w-full object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          {contentParagraphs.map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="flex items-center gap-4">
            <Image
              src={post.author.avatar || "/placeholder.svg"}
              alt={post.author.name}
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h3 className="font-bold">{post.author.name}</h3>
              <p className="text-muted-foreground text-sm">
                {post.author.role}
              </p>
              <p className="mt-1 text-sm">{post.author.bio}</p>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="mb-6 text-2xl font-bold">Related Posts</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {relatedPosts.map((relatedPost) => (
              <Link
                key={relatedPost.id}
                href={`/articles/${relatedPost.slug}`}
                className="group"
              >
                <div className="space-y-3 overflow-hidden rounded-lg border">
                  <div className="overflow-hidden">
                    <Image
                      src={relatedPost.coverImage || "/placeholder.svg"}
                      alt={relatedPost.title}
                      width={600}
                      height={400}
                      className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-2 p-4">
                    <h3 className="text-lg font-bold">{relatedPost.title}</h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
