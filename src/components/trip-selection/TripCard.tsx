import { format, parseISO, addHours } from "date-fns";
import { Button } from "@/components/ui/button";
import { Trip, Checkpoint } from "@/types/mocktypes";
import { Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

interface TripCardProps {
  trip: Trip;
  checkpoint: Checkpoint | null;
  onBookNow: (tripId: string) => void;
}

const convertToPHTime = (isoString: string) => {
  const date = parseISO(isoString);
  return addHours(date, 8); // Add 8 hours for GMT+8
};

const formatDepartureTime = (isoTime: string) => {
  try {
    const phTime = convertToPHTime(isoTime);
    return format(phTime, "hh:mm a");
  } catch {
    return "Invalid Time";
  }
};

function getPriceForCheckpoint(trip: Trip, checkpointId: number) {
  try {
    for (const destination of trip.route.destinations) {
      for (const passageway of destination.passageways) {
        if (passageway.checkpoints.some((cp: Checkpoint) => cp.id === checkpointId)) {
          return passageway.price;
        }
      }
    }
    return 0; // Return 0 if checkpoint not found instead of throwing error
  } catch (error) {
    console.error('Error getting price for checkpoint:', error);
    return 0;
  }
}

const getDestinationName = (trip: Trip, checkpoint: Checkpoint | null) => {
  if (checkpoint) {
    return checkpoint.baranggay;
  }
  if (trip.route?.name) {
    return trip.route.name;
  }
  // Derive destination name from the route's destinations
  if (trip.route.destinations.length > 0) {
    return trip.route.destinations[trip.route.destinations.length - 1].name;
  }
  return "Unknown Destination";
};

export function TripCard({ trip, checkpoint, onBookNow }: TripCardProps) {
  const price = checkpoint ? getPriceForCheckpoint(trip, checkpoint.id) : 0;
  const formattedPrice = Number(price).toFixed(2);

  // Get destination name by passing trip and checkpoint as arguments
  const destinationName = getDestinationName(trip, checkpoint);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{destinationName}</h3>
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
          {trip.effective_capacity}
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

