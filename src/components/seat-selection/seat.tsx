"use client";

import { cn } from "@/lib/utils";
import { Seat as SeatType } from "@/types/seat-types";

interface SeatProps {
  seat: SeatType;
  onClick: (seat: SeatType) => void;
  size?: "sm" | "md";
}

export function Seat({ seat, onClick, size = "md" }: SeatProps) {
  const seatStyles = {
    available: "bg-white hover:bg-gray-100 border-gray-200",
    selected: "bg-green-500 hover:bg-green-600 text-white border-green-600",
    processing: "bg-yellow-500 text-white border-yellow-600 cursor-not-allowed",
    booked: "bg-red-500 text-white border-red-600 cursor-not-allowed",
    pwd: "bg-blue-500 hover:bg-blue-600 text-white border-blue-600",
    driver: "bg-black text-white cursor-not-allowed",
  };

  return (
    <button
      onClick={() =>
        seat.status !== "booked" &&
        seat.status !== "processing" &&
        seat.status !== "driver" &&
        onClick(seat)
      }
      disabled={
        seat.status === "booked" ||
        seat.status === "processing" ||
        seat.status === "driver"
      }
      className={cn(
        "relative rounded-md border-2 transition-colors",
        size === "sm" ? "w-8 h-8 text-xs" : "w-10 h-10 text-sm",
        seatStyles[seat.status],
        "hover:scale-105 transition-transform",
        "disabled:opacity-50 disabled:cursor-not-allowed"
      )}
      title={`Seat ${seat.number}`}
    >
      {seat.number}
    </button>
  );
}
