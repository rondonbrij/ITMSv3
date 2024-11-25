"use client";

import { useRouter } from "next/navigation";
import { AnimatedButton } from "@/components/ui/animated-button";
import Image from "next/image";

function HeroBanner() {
  const router = useRouter();

  const handleDirectionClick = (direction: "north" | "south") => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    router.push(`/trip-selection?direction=${direction}&date=${formattedDate}`);
  };

  return (
    <section className="relative min-h-[calc(100vh-5rem)] w-full flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/terminal.jpg"
          alt="Terminal Background"
          fill
          className="object-cover blur-[2px]"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="container relative w-full flex flex-col items-center justify-center text-center text-white px-5">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
          <span className="block text-2xl md:text-3xl font-medium mb-2 text-blue-200">
            Welcome to
          </span>
          Puerto Princesa
          <span className="block mt-2 text-3xl md:text-5xl text-yellow-400">
            Land Transportation Terminal
          </span>
        </h1>
        <p className="text-lg md:text-xl mb-12 max-w-2xl text-gray-200">
          Your gateway to seamless travel across Puerto Princesa City. Book your
          tickets online and experience convenient, reliable transportation
          services.
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <AnimatedButton
            direction="north"
            label="Going North"
            onClick={() => handleDirectionClick("north")}
          />
          <AnimatedButton
            direction="south"
            label="Going South"
            onClick={() => handleDirectionClick("south")}
          />
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
