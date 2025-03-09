import Link from "next/link";
import { BsLinkedin } from "react-icons/bs";
import { RiInstagramFill, RiTwitterFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="border-t py-4 sm:py-6">
      <div className="container mx-auto">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
          <div className="flex flex-col gap-2 text-center sm:flex-row sm:items-center sm:gap-4 sm:text-left">
            <h1 className="text-lg font-semibold">hotcoffee</h1>
            <p className="text-sm text-gray-600">
              2020 copyright all rights reserved
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" aria-label="Instagram">
              <RiInstagramFill className="text-lg transition-colors hover:text-gray-600 sm:text-xl" />
            </Link>
            <Link href="/" aria-label="Twitter">
              <RiTwitterFill className="text-lg transition-colors hover:text-gray-600 sm:text-xl" />
            </Link>
            <Link href="/" aria-label="LinkedIn">
              <BsLinkedin className="text-lg transition-colors hover:text-gray-600 sm:text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
