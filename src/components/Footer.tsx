import Link from "next/link";
import { BsLinkedin } from "react-icons/bs";
import { RiInstagramFill, RiTwitterFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="py-4 sm:py-6 border-t">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
            <h1 className="font-semibold text-lg">hotcoffee</h1>
            <p className="text-sm text-gray-600">2020 copyright all rights reserved</p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/" aria-label="Instagram">
              <RiInstagramFill className="text-lg sm:text-xl hover:text-gray-600 transition-colors" />
            </Link>
            <Link href="/" aria-label="Twitter">
              <RiTwitterFill className="text-lg sm:text-xl hover:text-gray-600 transition-colors" />
            </Link>
            <Link href="/" aria-label="LinkedIn">
              <BsLinkedin className="text-lg sm:text-xl hover:text-gray-600 transition-colors" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;