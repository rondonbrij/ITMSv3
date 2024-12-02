"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Search } from "lucide-react";
import {
  Command,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Destinations in Palawan
const destinations = [
  "El Nido",
  "Port Barton",
  "Sabang",
  "San Vicente",
  "Taytay",
  "Roxas",
  "Brooke's Point",
  "Narra",
  "Quezon",
  "Aborlan",
];

function HeroBanner() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const handleDestinationSelect = (destination: string) => {
    setInputValue(destination);
    setOpen(false);
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    router.push(
      `/trip-selection?destination=${destination}&date=${formattedDate}`
    );
  };

  const filteredDestinations = inputValue
    ? destinations.filter((dest) =>
        dest.toLowerCase().includes(inputValue.toLowerCase())
      )
    : destinations;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setOpen(true);
    // Ensure input remains focused
    inputRef.current?.focus();
  };

  const handlePopoverOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    // Ensure input remains focused when popover opens/closes
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
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
        <div className="w-full max-w-sm">
          <Popover open={open} onOpenChange={handlePopoverOpenChange}>
            <PopoverTrigger asChild>
              <div className="relative" ref={inputContainerRef}>
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Where do you want to go?"
                  className="w-full pl-4 pr-10 py-2 text-left bg-white text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={inputValue}
                  onChange={handleInputChange}
                  onClick={() => setOpen(true)}
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </PopoverTrigger>
            <PopoverContent
              className="p-0"
              align="start"
              style={{ width: inputContainerRef.current?.offsetWidth }}
            >
              <Command>
                <CommandList>
                  <CommandEmpty>No destination found.</CommandEmpty>
                  <CommandGroup className="max-h-60 overflow-y-auto">
                    {filteredDestinations.map((destination) => (
                      <CommandItem
                        key={destination}
                        value={destination}
                        onSelect={handleDestinationSelect}
                      >
                        {destination}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
