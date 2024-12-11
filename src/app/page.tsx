"use client";

import HeroBanner from "@/components/hero-banner";
// import Operators from "@/components/operators";
import About from "@/components/about";
import FAQ from "@/components/faq";
import News from "@/components/news";
// import Contact from "@/components/contact";

export default function Home() {
  return (
    <>
      <HeroBanner />
      {/* <Operators /> */}
      <About />
      <News />
      <FAQ />

      {/* <Contact /> */}
    </>
  );
}
