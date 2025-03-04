"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { posts, categories } from "@/lib/data"
import { formatDate } from "@/lib/utils"

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory ? post.category.slug === selectedCategory : true
    return matchesSearch && matchesCategory
  })

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen)
  }

  return (
    <div className="container mx-auto py-6 md:py-10">
      <div className="flex flex-col space-y-4 mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Article</h1>
            <p className="text-muted-foreground mt-1 md:mt-2">Explore our latest articles and insights</p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search articles..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Mobile category filter toggle */}
        <div className="md:hidden">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
            onClick={toggleMobileFilter}
          >
            {selectedCategory ? 
              categories.find(c => c.slug === selectedCategory)?.title : 
              "All Categories"}
            {isMobileFilterOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
        {/* Mobile Category Sidebar */}
        {isMobileFilterOpen && (
          <div className="md:hidden bg-background p-4 rounded-lg border mb-6">
            <h2 className="text-lg font-semibold mb-3">Categories</h2>
            <div className="space-y-2">
              <Button
                variant={selectedCategory === "" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedCategory("")
                  setIsMobileFilterOpen(false)
                }}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.slug ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setSelectedCategory(category.slug)
                    setIsMobileFilterOpen(false)
                  }}
                >
                  {category.title}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden md:block md:col-span-1">
          <div className="sticky top-20">
            <h2 className="text-xl font-bold mb-4">Categories</h2>
            <div className="space-y-2">
              <Button
                variant={selectedCategory === "" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("")}
              >
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.slug ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category.slug)}
                >
                  {category.title}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="md:col-span-3">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-lg font-medium">No posts found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {filteredPosts.map((post) => (
                <Link key={post.id} href={`/articles/${post.slug}`} className="group">
                  <div className="space-y-2 border rounded-lg overflow-hidden h-full flex flex-col">
                    <div className="overflow-hidden">
                      <Image
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="h-40 sm:h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 p-3 sm:p-4 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">{post.category.title}</span>
                        <span className="text-xs text-muted-foreground">{formatDate(post.date)}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold">{post.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center gap-2 pt-2">
                        <Image
                          src={post.author.avatar || "/placeholder.svg"}
                          alt={post.author.name}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-xs sm:text-sm text-muted-foreground">{post.author.name}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}