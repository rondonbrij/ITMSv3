"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

import React from "react";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex mx-auto px-4 h-20 items-center justify-between">
        {/* <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">iWantSeats</span>
        </Link> */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push("/book.co")}
        >
          <div className="w-8 h-8 bg-yellow-400 rounded-lg" />
          <span className="text-black font-bold text-xl">ITMS</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link
            href="/"
            className="text-black hover:text-blue-400 transition-colors"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-black hover:text-blue-400 transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-black hover:text-blue-400 transition-colors"
          >
            Contact us
          </Link>
        </nav>
        <Button size="sm" className="hidden md:inline-flex">
          Login
        </Button>
        <Button variant="outline" size="icon" className="md:hidden">
          <MenuIcon className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
    </header>
  );
};

export default Header;
