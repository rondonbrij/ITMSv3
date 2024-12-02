import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trip } from "@/types/types";

interface TripCardProps {
  trip: Trip;
  destination: string;
  onBookNow: (tripId: string) => void;
}

export function TripCard({ trip, destination, onBookNow }: TripCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{trip.route.name}</h3>
      <div className="text-sm text-gray-600 mb-2">
        {trip.transport_company.name}
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">
          {format(parse(trip.departure_time, "HH:mm", new Date()), "hh:mm a")}
        </div>
        <div className="text-lg font-bold">
          ₱{getPriceForDestination(trip, destination).toFixed(2)}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm">
          <span className="font-medium">Seats left:</span>{" "}
          {trip.vehicle ? trip.vehicle.capacity : "N/A"}
        </div>
        <Button
          onClick={() => onBookNow(trip.id)}
          className="bg-blue-500 hover:bg-primary text-white"
        >
          Book Seats
        </Button>
      </div>
    </div>
  );
}

function getPriceForDestination(trip: Trip, destination: string) {
  if (!destination) {
    return trip.price;
  }
  const checkpoint = trip.route.checkpoints.find(
    (cp) => cp.name.toLowerCase() === destination.toLowerCase()
  );
  if (!checkpoint) {
    return trip.price;
  }
  const checkpointPrice = trip.checkpointPrices.find(
    (cp) => cp.checkpointId === checkpoint.id
  );
  return checkpointPrice ? checkpointPrice.price : trip.price;
}
