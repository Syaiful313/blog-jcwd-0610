"use client";
import useGetAuthor from "@/hooks/api/author/useGetAuthor";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface AuthorParams {
  slug: string;
}

interface AuthorDetailProps {
  params: Promise<AuthorParams>;
}

const AuthorDetail: FC<AuthorDetailProps> = ({ params }) => {
  const [slug, setSlug] = useState<string>("");
  const { data: authors = [], isPending, isError } = useGetAuthor(slug);

  useEffect(() => {
    const fetchParams = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug || "");
    };

    fetchParams();
  }, [params]);

  const author = authors[0];

  if (isError) return <p>Error fetching author details.</p>;

  if (isPending) {
    return (
      <div className="mx-4 md:mx-0 py-10">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-12 flex flex-col items-center md:flex-row md:items-start md:gap-8">
            <Skeleton className="h-[150px] w-[150px] rounded-xl" />
            <div className="w-full">
              <Skeleton className="h-10 w-2/3 mb-2 mx-auto md:mx-0" />
              <Skeleton className="h-6 w-1/3 mb-4 mx-auto md:mx-0" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          <div className="mt-12">
            <Skeleton className="h-8 w-1/3 mb-6" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border rounded-lg overflow-hidden h-full flex flex-col">
                  <Skeleton className="h-48 w-full" />
                  <div className="flex-1 p-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-4 md:mx-0 py-10">
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
          <h2 className="text-2xl font-bold mb-6">Blogs by {author.name}</h2>

          {author.blogs.length === 0 ? (
            <p className="text-muted-foreground">No articles found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {author.blogs.map((post) => (
                <Link key={post.objectId} href={`/blogs/${post.slug}`} className="group">
                  <div className="space-y-3 border rounded-lg overflow-hidden h-full flex flex-col">
                    <div className="overflow-hidden">
                      <Image
                        src={post.thumbnail || "/placeholder.svg"}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 p-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">{post.category}</span>
                        <span className="text-xs text-muted-foreground">{formatDate(post.created)}</span>
                      </div>
                      <h3 className="text-xl font-bold">{post.title}</h3>
                      <p className="text-muted-foreground line-clamp-2">{post.description}</p>
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