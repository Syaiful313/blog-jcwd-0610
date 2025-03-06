"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import useGetBlogs from "@/hooks/api/blog/useGetBlogs";
import { categories } from "@/lib/data";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const { blogs, isLoading } = useGetBlogs();

  const filteredPosts = blogs.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory
      ? post.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  const toggleMobileFilter = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 md:py-10 min-h-screen">
      <div className="mb-6 flex flex-col space-y-4 md:mb-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold md:text-4xl">Blog</h1>
            <p className="text-muted-foreground mt-1 md:mt-2">
              Explore our latest articles and insights
            </p>
          </div>
          <div className="relative w-full md:w-64">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4" />
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
            className="flex w-full items-center justify-between"
            onClick={toggleMobileFilter}
          >
            {selectedCategory
              ? blogs.find((c) => c.slug === selectedCategory)?.category
              : "All Categories"}
            {isMobileFilterOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-10">
        {/* Mobile Category Sidebar */}
        {isMobileFilterOpen && (
          <div className="bg-background mb-6 rounded-lg border p-4 md:hidden">
            <h2 className="mb-3 text-lg font-semibold">Categories</h2>
            <div className="space-y-2">
              <Button
                variant={selectedCategory === "" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => {
                  setSelectedCategory("");
                  setIsMobileFilterOpen(false);
                }}
              >
                All Categories
              </Button>
              {categories.map((post) => (
                <Button
                  key={post.title}
                  variant={selectedCategory === post.slug ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    setSelectedCategory(post.slug);
                    setIsMobileFilterOpen(false);
                  }}
                >
                  {post.title}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden md:col-span-1 md:block">
          <div className="sticky top-20">
            <h2 className="mb-4 text-xl font-bold">Categories</h2>
            <div className="space-y-2">
              <Button
                variant={selectedCategory === "" ? "default" : "ghost"}
                className="w-full justify-start"
                onClick={() => setSelectedCategory("")}
              >
                All Categories
              </Button>
              {categories.map((post) => (
                <Button
                  key={post.title}
                  variant={selectedCategory === post.slug ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(post.title)}
                >
                  {post.title}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        <div className="md:col-span-3">
          {filteredPosts.length === 0 ? (
            <div className="py-10 text-center">
              <h3 className="text-lg font-medium">No posts found</h3>
              <p className="text-muted-foreground mt-2">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
              {filteredPosts.map((post) => (
                <Link
                  key={post.objectId}
                  href={`/blogs/${post.slug}`}
                  className="group"
                >
                  <div className="flex h-full flex-col space-y-2 overflow-hidden rounded-lg border">
                    <div className="overflow-hidden">
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-48"
                      />
                    </div>
                    <div className="flex-1 space-y-2 p-3 sm:p-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-muted rounded-full px-2 py-1 text-xs">
                          {post.category}
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {formatDate(post.created)}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold sm:text-xl">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2 text-sm">
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
}
