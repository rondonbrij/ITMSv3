import { Seat } from './seat'

interface BusLayoutProps {
  seats: Seat[]
  onSeatClick: (seat: Seat) => void
}

export function BusLayout({ seats, onSeatClick }: BusLayoutProps) {
  // Helper function to render a row with specific seat numbers
  const renderRow = (seatNumbers: number[]) => {
    return (
      <div className="flex gap-2">
        {seatNumbers.map((num) => {
          const seat = seats.find(s => s.number === num) || {
            id: `seat-${num}`,
            number: num,
            status: 'available'
          }
          return <Seat key={seat.id} seat={seat} onClick={() => onSeatClick(seat)} />
        })}
      </div>
    )
  }

  return (
    <div className="flex">
      <div className="flex-1 space-y-4">
        {/* Driver's seat */}
        <div className="flex justify-center mb-6">
          <Seat
            seat={{ id: "driver", number: 0, status: "driver" }}
            onClick={() => {}}
          />
        </div>

        {/* Main seating area */}
        <div className="grid grid-cols-2 gap-x- gap-y-2">
          {/* Left column - 3 seats */}
          <div className="space-y-2">
            {renderRow([1, 2, 3])}
            {renderRow([6, 7, 8])}
            {renderRow([11, 12, 13])}
            {renderRow([16, 17, 18])}
            {renderRow([21, 22, 23])}
            {renderRow([26, 27, 28])}
            {renderRow([31, 32, 33])}
            {renderRow([36, 37, 38])}
            {renderRow([41, 42, 43])}
            {renderRow([46, 47, 48])}
            {renderRow([51, 52, 53])}
            {renderRow([56, 57, 58])}
          </div>

          {/* Right column - 2 seats */}
          <div className="space-y-2">
            {renderRow([4, 5])}
            {renderRow([9, 10])}
            {renderRow([14, 15])}
            {renderRow([19, 20])}
            {renderRow([24, 25])}
            {renderRow([29, 30])}
            {renderRow([34, 35])}
            {renderRow([39, 40])}
            {renderRow([44, 45])}
            {renderRow([49, 50])}
            {renderRow([54, 55])}
            {renderRow([59, 60])}
          </div>
        </div>

        {/* Bottom row - 5 seats */}
        <div className="flex justify-center mt-2">
          {renderRow([61, 62, 63, 64, 65, 66])}
        </div>
      </div>

      {/* Legend section */}
      <div className="ml-4 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-black" />
          <span>Driver</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-300" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#90EE90]" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#87CEEB]" />
          <span>PWD</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-300" />
          <span>Processing</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500" />
          <span>Booked</span>
        </div>
        <p className="text-sm text-muted-foreground">
          Note: Actual seat arrangement may vary depending on the vehicle.
        </p>
      </div>
    </div>
  )
}