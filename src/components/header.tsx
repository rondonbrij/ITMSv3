"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import VisuallyHidden from "@/components/ui/visually-hidden";
import { DialogTitle } from "@/components/ui/dialog";

const Header: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "fil">("en");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "fil" : "en"));
  };

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { href: "/contact", label: "CONTACT" },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-black font-bold hover:text-blue-400 transition-colors"
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-md">
      <div className="container flex mx-auto px-4 h-20 items-center justify-between">
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-8 h-8 bg-yellow-400 rounded-lg" />
          <span className="text-black font-bold text-xl">Irawan Terminal</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <NavLinks />
        </nav>
        <div className="flex items-center gap-4">
          <Button
            onClick={toggleLanguage}
            variant="outline"
            size="sm"
            className="hidden md:block"
          >
            {language === "en" ? "English" : "Filipino"}
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-8 w-8" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <VisuallyHidden>
                <DialogTitle>Navigation Menu</DialogTitle>
              </VisuallyHidden>
              <nav className="flex flex-col gap-4">
                <NavLinks />
                <Button
                  onClick={toggleLanguage}
                  variant="outline"
                  size="sm"
                  className="mt-auto"
                >
                  {language === "en" ? "English" : "Filipino"}
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
