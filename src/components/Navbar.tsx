"use client";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { BsLinkedin } from "react-icons/bs";
import { RiInstagramFill, RiTwitterFill } from "react-icons/ri";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="mx-4 md:mx-0">
      <div className="container mx-auto py-4 md:py-6">
        <div className="flex w-full flex-col gap-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-xl font-bold sm:text-2xl">HotCoffee</h1>
            </Link>

            <div className="hidden items-center gap-6 lg:flex">
              <Link href="/" className="transition-colors hover:text-gray-600">
                Home
              </Link>
              <Link
                href="/blogs"
                className="transition-colors hover:text-gray-600"
              >
                Blog
              </Link>
              <Link
                href="/categories"
                className="transition-colors hover:text-gray-600"
              >
                Category
              </Link>
              <Link
                href="/about"
                className="transition-colors hover:text-gray-600"
              >
                About
              </Link>
            </div>

            <div className="hidden items-center gap-4 md:flex">
              <Link href="/" className="transition-colors hover:text-gray-600">
                <RiInstagramFill className="text-xl" />
              </Link>
              <Link href="/" className="transition-colors hover:text-gray-600">
                <RiTwitterFill className="text-xl" />
              </Link>
              <Link href="/" className="transition-colors hover:text-gray-600">
                <BsLinkedin className="text-xl" />
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 md:gap-4 lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="rounded-full p-2 hover:bg-gray-100"
              >
                <Menu size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Full screen mobile menu (Socio Space style) */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black">
          {/* Header with logo and close button */}
          <div className="flex items-center justify-between p-4">
            <div className="text-2xl font-bold text-white">
              <span className="flex items-center">
                <span className="text-xl">HotCoffee</span>
              </span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 text-white"
            >
              <X size={24} />
            </button>
          </div>

          {/* Menu items */}
          <div className="flex flex-col items-center py-8 text-white">
            <Link href="/" className="py-4 text-4xl font-light">
              HOME
            </Link>
            <Link href="/blog" className="py-4 text-4xl font-light">
              BLOG
            </Link>
            <Link href="/categories" className="py-4 text-4xl font-light">
              CATEGORY
            </Link>
            <Link href="/about" className="py-4 text-4xl font-light">
              ABOUT
            </Link>
              <span className="py-4 text-4xl font-light">Follow us</span>
              <div className="flex gap-3">
                <Link href="/">
                  <RiInstagramFill className="text-4xl" />
                </Link>
                <Link href="/">
                  <RiTwitterFill className="text-4xl" />
                </Link>
                <Link href="/">
                  <BsLinkedin className="text-4xl" />
                </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
