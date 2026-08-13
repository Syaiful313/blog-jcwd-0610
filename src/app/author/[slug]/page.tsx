import { formatDate } from "@/lib/utils";
import { getAuthorBySlug } from "@/utils/api";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

interface AuthorDetailProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: AuthorDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    return { title: "Author Not Found" };
  }

  return {
    title: author.name,
    description: author.bio,
    openGraph: {
      type: "profile",
      title: author.name,
      description: author.bio,
      images: author.avatar ? [author.avatar] : undefined,
    },
  };
}

const AuthorDetail = async ({ params }: AuthorDetailProps) => {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const blogs = author.blogs ?? [];

  return (
    <div className="mx-4 py-10 md:mx-0">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-12 flex flex-col items-center md:flex-row md:items-start md:gap-8">
          <Image
            src={author.avatar || "/placeholder.svg"}
            alt={author.name || "Author"}
            width={150}
            height={150}
            className="mb-4 rounded-xl md:mb-0"
          />
          <div>
            <h1 className="mb-2 text-center text-3xl font-bold md:text-left">
              {author.name}
            </h1>
            <p className="text-muted-foreground mb-4 text-center md:text-left">
              {author.role}
            </p>
            <div className="prose dark:prose-invert max-w-none">
              <p>{author.bio}</p>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-bold">Blogs by {author.name}</h2>

          {blogs.length === 0 ? (
            <p className="text-muted-foreground">No articles found.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {blogs.map((post) => (
                <Link
                  key={post.objectId}
                  href={`/blogs/${post.slug}`}
                  className="group"
                >
                  <div className="flex h-full flex-col space-y-3 overflow-hidden rounded-lg border">
                    <div className="overflow-hidden">
                      <Image
                        src={post.thumbnail || "/placeholder.svg"}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 space-y-2 p-4">
                      <div className="flex items-center gap-2">
                        <span className="bg-muted rounded-full px-2 py-1 text-xs">
                          {post.category}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {formatDate(post.created)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold">{post.title}</h3>
                      <p className="text-muted-foreground line-clamp-2">
                        {post.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthorDetail;
