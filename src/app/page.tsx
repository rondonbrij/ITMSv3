"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import HeroBanner from "@/components/hero-banner";
import Operators from "@/components/operators";
import About from "@/components/about";
import FAQ from "@/components/faq";
import Blog from "@/components/blog";
import Contact from "@/components/contact";

export default function Home() {
  const router = useRouter();

  const handleDirectionClick = (direction: "north" | "south") => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    router.push(`/trip-selection?direction=${direction}&date=${formattedDate}`);
  };

  return (
    <>
      <HeroBanner />
      <div className="-mt-24 w-full relative p-12 z-10 mb-12">
        <div className="container bg-background rounded-lg m-auto shadow-lg p-6 flex justify-center space-x-4">
          <Button
            onClick={() => handleDirectionClick("north")}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Going North
          </Button>
          <Button
            onClick={() => handleDirectionClick("south")}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Going South
          </Button>
        </div>
      </div>
      <Operators />
      <About />
      <FAQ />
      <Blog />
      <Contact />
    </>
  );
}
