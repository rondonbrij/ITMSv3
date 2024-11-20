"use client";

import HeroBanner from "@/components/hero-banner";
import Operators from "@/components/operators";
import About from "@/components/about";
import FAQ from "@/components/faq";
import Blog from "@/components/blog";
import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <Operators />
      <About />
      <FAQ />
      <Blog />
      <Contact />
    </>
  );
}
