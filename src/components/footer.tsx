import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Puerto Princesa Land Transportation Terminal
            </h3>
            <p className="text-sm text-muted-foreground">
              Providing safe and reliable transportation services to connect
              people and places across Puerto Princesa.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <Link
                href="/about"
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                About Us
              </Link>
              <Link
                href="/news"
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                News
              </Link>
              <Link
                href="/careers"
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                Careers
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <nav className="space-y-2">
              <Link
                href="/contact"
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                Contact Us
              </Link>
              <Link
                href="/faq"
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                FAQ
              </Link>
              <Link
                href="/help"
                className="block text-sm text-muted-foreground hover:text-primary"
              >
                Help Center
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Stay Updated</h4>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-[240px]"
              />
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <div className="flex gap-4">
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-primary"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 PPPLT Booking. All rights reserved.
            </p>
            <nav className="flex gap-6">
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-primary"
              >
                Terms of Service
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
