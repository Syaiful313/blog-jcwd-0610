import Link from "next/link"
import Image from "next/image"
import { categories, getPostsByCategory } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export default function CategoriesPage() {
  return (
    <div className="container px-4 sm:px-6 mx-auto py-6 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold">Categories</h1>
        <p className="text-muted-foreground mt-1 sm:mt-2">Browse content based on your interests</p>
      </div>

      <div className="space-y-10 sm:space-y-16">
        {categories.map((category) => {
          const categoryPosts = getPostsByCategory(category.slug).slice(0, 3)

          return (
            <div key={category.id} className="space-y-4 sm:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">{category.title}</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">{category.description}</p>
                </div>
                <Link 
                  href={`/categories/${category.slug}`} 
                  className="text-primary hover:underline text-sm sm:text-base whitespace-nowrap"
                >
                  View all
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {categoryPosts.map((post) => (
                  <Link key={post.id} href={`/articles/${post.slug}`} className="group">
                    <div className="space-y-2 sm:space-y-3 border rounded-lg overflow-hidden h-full flex flex-col">
                      <div className="overflow-hidden">
                        <Image
                          src={post.coverImage || "/placeholder.svg"}
                          alt={post.title}
                          width={600}
                          height={400}
                          className="h-40 sm:h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">{formatDate(post.date)}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold line-clamp-2">{post.title}</h3>
                        <p className="text-sm sm:text-base text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}