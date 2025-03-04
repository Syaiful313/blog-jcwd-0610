"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import { BsLinkedin } from "react-icons/bs";
import { RiInstagramFill, RiTwitterFill } from "react-icons/ri";
import { Input } from "./ui/input";
import { useState } from "react";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <nav className="container mx-auto p-4 sm:p-6">
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold sm:text-2xl">HotCoffee</h1>
          </Link>

          <div className="mx-8 hidden max-w-md flex-grow md:block">
            <Input type="text" placeholder="Search" className="w-full" />
          </div>

          <div className="hidden items-center gap-6 lg:flex">
            <Link href="/" className="transition-colors hover:text-gray-600">
              Home
            </Link>
            <Link
              href="/articles"
              className="transition-colors hover:text-gray-600"
            >
              Articles
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

          <div className="flex items-center gap-2 md:gap-4 lg:hidden">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="rounded-full p-2 hover:bg-gray-100 md:hidden"
              aria-label="Toggle search"
            >
              <Search size={20} />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full p-2 hover:bg-gray-100">
                <Menu size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/" className="w-full">
                    Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/articles" className="w-full">
                    Articles
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/categories" className="w-full">
                    Category
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href="/about" className="w-full">
                    About
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer md:hidden">
                  <div className="flex w-full items-center justify-between">
                    <span>Follow us</span>
                    <div className="flex gap-3">
                      <Link href="/">
                        <RiInstagramFill className="text-lg" />
                      </Link>
                      <Link href="/">
                        <RiTwitterFill className="text-lg" />
                      </Link>
                      <Link href="/">
                        <BsLinkedin className="text-lg" />
                      </Link>
                    </div>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {showSearch && (
          <div className="flex w-full pb-2 md:hidden">
            <Input type="text" placeholder="Search" className="w-full" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
