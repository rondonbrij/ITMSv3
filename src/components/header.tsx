"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { AlignJustify } from "lucide-react";

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/services", label: "SERVICES" },
    { href: "/announcements", label: "ANNOUNCEMENTS" },
    { href: "/contact", label: "CONTACT US" },
  ];

  const NavLinks = ({
    className,
    onClick,
  }: {
    className?: string;
    onClick?: () => void;
  }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`font-bold text-sm tracking-wide transition-colors hover:text-blue-600 ${className}`}
          onClick={onClick}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  const toggleSheet = () => setIsOpen(!isOpen);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-20 items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/images/ppltlogo.svg"
              alt="PPLT Logo"
              width={48}
              height={48}
              className="rounded-lg"
            />
            <div className="flex flex-col leading-none">
              <span className="hidden md:block text-sm font-medium text-gray-600">
                Puerto Princesa
              </span>
              <span className="hidden md:block text-base font-bold">
                Land Transportation Terminal
              </span>
              <span className="md:hidden text-lg font-bold">PPLTT</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex md:gap-8 md:justify-end md:flex-1">
          <NavLinks />
        </nav>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button onClick={toggleSheet} className="p-2">
                <AlignJustify className="h-8 w-8" />
                <span className="sr-only">Toggle Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="right" className=" sm:w-[400px] w-[300px]">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col items-center justify-center gap-8 h-full">
                <NavLinks onClick={toggleSheet} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
