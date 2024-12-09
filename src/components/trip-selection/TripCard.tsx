import { format, parse } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trip, Checkpoint } from "@/types/types";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TripCardProps {
  trip: Trip;
  checkpoint: Checkpoint | null;
  onBookNow: (tripId: string) => void;
}

const formatDepartureTime = (time: string) => {
  try {
    const parsedTime = parse(time, "HH:mm", new Date());
    return format(parsedTime, "hh:mm a");
  } catch {
    return "Invalid Time";
  }
};

function getPriceForCheckpoint(trip: Trip, checkpointId: number) {
  const checkpointPrice = trip.checkpointPrices?.find(
    (cp) => cp.checkpointId === checkpointId
  );
  return checkpointPrice ? Number(checkpointPrice.price) : Number(trip.price);
}

const hasCheckpoint = (trip: Trip, checkpointId: number | undefined) => {
  if (!checkpointId) return false;
  return trip.checkpoints.some((cp) => cp.id === checkpointId);
};

export function TripCard({ trip, checkpoint, onBookNow }: TripCardProps) {
  const price =
    checkpoint && hasCheckpoint(trip, checkpoint.id)
      ? getPriceForCheckpoint(trip, checkpoint.id)
      : trip.price;
  const formattedPrice = Number(price).toFixed(2);

  // Get destination name with fallback
  const getDestinationName = () => {
    if (checkpoint) {
      return checkpoint.baranggay;
    }
    if (trip.route?.name) {
      return trip.route.name;
    }
    return "Unknown Destination";
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{getDestinationName()}</h3>
      <div className="text-sm text-gray-600 mb-2">
        {trip.transport_company?.name || "Unknown Company"}
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-lg font-bold">
          {formatDepartureTime(trip.departure_time)}
        </div>
        <div className="text-lg font-bold">₱{formattedPrice}</div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm">
          <span className="font-medium">Seats left:</span>{" "}
          {trip.vehicle ? trip.vehicle.capacity : "N/A"}
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View Notes
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Trip Notes</DialogTitle>
              <DialogDescription>
                {trip.notes || "No notes available for this trip."}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Button
        onClick={() => onBookNow(trip.id)}
        className="w-full bg-blue-500 hover:bg-primary text-white"
      >
        Book Seats
      </Button>
    </div>
  );
}
