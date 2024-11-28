"use client";

import * as React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "north" | "south";
  label: string;
}

export function AnimatedButton({
  direction,
  label,
  className,
  ...props
}: AnimatedButtonProps) {
  return (
    <button
      className={cn(
        "bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group overflow-hidden",
        className
      )}
      type="button"
      {...props}
    >
      <div
        className={cn(
          "absolute inset-0 bg-blue-500 flex items-center justify-center transition-transform duration-500 ease-out",
          direction === "north"
            ? "translate-y-full group-hover:translate-y-0"
            : "-translate-y-full group-hover:translate-y-0"
        )}
      >
        {direction === "north" ? (
          <ArrowUp className="w-6 h-6 text-white transition-transform duration-1000 group-hover:-translate-y-10" />
        ) : (
          <ArrowDown className="w-6 h-6 text-white transition-transform duration-1000 group-hover:translate-y-10" />
        )}
      </div>
      <span className="relative z-10 group-hover:text-white transition-colors duration-500">
        {label}
      </span>
    </button>
  );
}
