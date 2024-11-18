"use client";

import { Seat as SeatType } from "@/types/seat-types";
import { Seat } from "./seat";

interface VanLayoutProps {
  seats: SeatType[];
  onSeatClick: (seat: SeatType) => void;
}

export function VanLayout({ seats, onSeatClick }: VanLayoutProps) {
  const renderSeatRow = (start: number, end: number) => {
    return (
      <div className="flex justify-center gap-2">
        {seats.slice(start, end).map((seat) => (
          <Seat key={seat.id} seat={seat} onClick={onSeatClick} size="sm" />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-center">
        <Seat
          seat={{ id: "driver", number: 0, status: "driver" }}
          onClick={() => {}}
          size="sm"
        />
      </div>
      {renderSeatRow(0, 3)}
      {renderSeatRow(3, 5)}
      {renderSeatRow(5, 8)}
      {renderSeatRow(8, 11)}
      {renderSeatRow(11, 14)}
    </div>
  );
}
