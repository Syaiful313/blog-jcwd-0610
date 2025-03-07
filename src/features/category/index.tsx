import Link from "next/link";
import Image from "next/image";
import useGetCategoryWithBlogs from "@/hooks/api/category/useGetCategoryWithBlogs";

export default async function CategoriesPage() {
  const categories = await useGetCategoryWithBlogs();

  return (
    <main className="mx-4 md:mx-0">
      <div className="container mx-auto py-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">Categories</h1>
          <p className="text-muted-foreground mt-2">
            Browse content based on your interests
          </p>
        </div>

        <div className="space-y-16">
          {categories.map((category) => {
            const categoryPosts = category.blogs.slice(0, 3);

            return (
              <div key={category.objectId} className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{category.title}</h2>
                    <p className="text-muted-foreground">
                      {category.description}
                    </p>
                  </div>
                  <Link
                    href={`/categories/${category.slug}`}
                    className="text-primary hover:underline"
                  >
                    View all
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {categoryPosts.map((post) => (
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
                            <span className="text-muted-foreground text-xs">
                              {post.created
                                ? new Date(post.created).toLocaleDateString()
                                : ""}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold">{post.title}</h3>
                          <p className="text-muted-foreground line-clamp-2">
                            {post.description || post.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
