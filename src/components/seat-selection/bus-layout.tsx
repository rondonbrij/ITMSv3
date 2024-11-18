"use client";

import { Seat as SeatType } from "@/types/seat-types";
import { Seat } from "./seat";

interface BusLayoutProps {
  seats: SeatType[];
  onSeatClick: (seat: SeatType) => void;
}

export function BusLayout({ seats, onSeatClick }: BusLayoutProps) {
  const renderSeatRow = (start: number, end: number) => {
    return (
      <div className="flex justify-center gap-2">
        {seats.slice(start, end).map((seat) => (
          <Seat key={seat.id} seat={seat} onClick={onSeatClick} />
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
        />
      </div>
      {renderSeatRow(0, 4)}
      {renderSeatRow(4, 8)}
      {renderSeatRow(8, 12)}
      {renderSeatRow(12, 16)}
      {renderSeatRow(16, 20)}
      {renderSeatRow(20, 24)}
      {renderSeatRow(24, 28)}
      {renderSeatRow(28, 32)}
      {renderSeatRow(32, 36)}
      {renderSeatRow(36, 40)}
      {renderSeatRow(40, 44)}
      {renderSeatRow(44, 48)}
      {renderSeatRow(48, 52)}
      {renderSeatRow(52, 56)}
      {renderSeatRow(56, 60)}
      {renderSeatRow(60, 64)}
      {renderSeatRow(64, 66)}
    </div>
  );
}
