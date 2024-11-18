"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BusLayout } from "@/components/seat-selection/bus-layout";
import { VanLayout } from "@/components/seat-selection/van-layout";
import { PassengerForm } from "@/components/seat-selection/passenger-form";
import { WarningDialog } from "@/components/seat-selection/warning-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Seat, BookingData, PassengerDetails } from "@/types/seat-types";
import { toast } from "@/hooks/use-toast";

// Mock function to simulate fetching seat data from the backend
const fetchSeatData = async (vehicleType: "BUS" | "VAN"): Promise<Seat[]> => {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const totalSeats = vehicleType === "BUS" ? 66 : 14;
  return Array.from({ length: totalSeats }, (_, i) => ({
    id: `seat-${i + 1}`,
    number: i + 1,
    status: Math.random() > 0.8 ? "booked" : "available",
    isRestricted: vehicleType === "VAN" && (i === 0 || i === 1 || i === 2),
    isFrontSeat: vehicleType === "VAN" && (i === 0 || i === 1 || i === 2),
  }));
};

export default function SeatSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState<BookingData>({
    destination: searchParams.get("destination") || "",
    date: new Date(searchParams.get("date") || Date.now()),
    vehicleType: (searchParams.get("vehicleType") as "BUS" | "VAN") || "BUS",
    time: searchParams.get("time") || "",
    company: searchParams.get("company") || "",
    price: Number(searchParams.get("price")) || 0,
    selectedSeats: [],
    passengers: [],
  });
  const [seats, setSeats] = useState<Seat[]>([]);
  const [warningDialog, setWarningDialog] = useState<{
    open: boolean;
    title: string;
    description: string;
    confirmLabel: string;
    cancelLabel: string;
    onConfirm: () => void;
    onCancel: () => void;
  }>({
    open: false,
    title: "",
    description: "",
    confirmLabel: "",
    cancelLabel: "",
    onConfirm: () => {},
    onCancel: () => {},
  });

  useEffect(() => {
    const loadSeatData = async () => {
      const seatData = await fetchSeatData(bookingData.vehicleType);
      setSeats(seatData);
    };
    loadSeatData();
  }, [bookingData.vehicleType]);

  const handleSeatClick = (clickedSeat: Seat) => {
    if (clickedSeat.status === "booked" || clickedSeat.status === "processing")
      return;

    if (clickedSeat.isRestricted) {
      if (bookingData.vehicleType === "VAN" && clickedSeat.isFrontSeat) {
        setWarningDialog({
          open: true,
          title: "Age Restriction for Front Seats",
          description:
            "Front seats are reserved for passengers aged 12 and above. By selecting this seat, you confirm that the passenger meets this age requirement.",
          confirmLabel: "I am over 12",
          cancelLabel: "Cancel",
          onConfirm: () => selectSeat(clickedSeat),
          onCancel: () => setWarningDialog({ ...warningDialog, open: false }),
        });
      } else {
        setWarningDialog({
          open: true,
          title: "Priority Seating",
          description:
            "This seat is reserved for passengers with disabilities, senior citizens, or pregnant women. By selecting this seat, you confirm that you meet these criteria.",
          confirmLabel: "I Agree",
          cancelLabel: "Cancel",
          onConfirm: () => selectSeat(clickedSeat),
          onCancel: () => setWarningDialog({ ...warningDialog, open: false }),
        });
      }
    } else {
      selectSeat(clickedSeat);
    }
  };

  const selectSeat = (seat: Seat) => {
    const updatedSeats = seats.map((s) =>
      s.id === seat.id
        ? { ...s, status: s.status === "selected" ? "available" : "selected" }
        : s
    );
    setSeats(updatedSeats);
    setBookingData((prev) => ({
      ...prev,
      selectedSeats: updatedSeats.filter((s) => s.status === "selected"),
    }));
  };

  const handlePassengerSubmit = (data: PassengerDetails) => {
    setBookingData((prev) => ({
      ...prev,
      passengers: [
        ...prev.passengers.filter((p) => p.seatNumber !== data.seatNumber),
        data,
      ],
    }));
  };

  const handleContinue = async () => {
    if (bookingData.selectedSeats.length !== bookingData.passengers.length) {
      toast({
        title: "Incomplete passenger details",
        description: "Please fill in the details for all selected seats.",
        variant: "destructive",
      });
      return;
    }

    // Simulate sending processing status to backend
    const processingSeats = seats.map((seat) =>
      bookingData.selectedSeats.some((s) => s.id === seat.id)
        ? { ...seat, status: "processing" }
        : seat
    );
    setSeats(processingSeats);

    // Simulate API call to update seat status
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Navigate to payment page
    router.push(
      `/payment?bookingData=${encodeURIComponent(JSON.stringify(bookingData))}`
    );
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Select Your Seats</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Seat Map</CardTitle>
          </CardHeader>
          <CardContent>
            {bookingData.vehicleType === "BUS" ? (
              <BusLayout seats={seats} onSeatClick={handleSeatClick} />
            ) : (
              <VanLayout seats={seats} onSeatClick={handleSeatClick} />
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <div>
              <p>Fare per seat: ₱{bookingData.price.toFixed(2)}</p>
              <p>
                Total: ₱
                {(bookingData.price * bookingData.selectedSeats.length).toFixed(
                  2
                )}
              </p>
            </div>
            <Button
              onClick={handleContinue}
              disabled={bookingData.selectedSeats.length === 0}
            >
              Continue
            </Button>
          </CardFooter>
        </Card>
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Passenger Details</h2>
          {bookingData.selectedSeats.map((seat) => (
            <PassengerForm
              key={seat.id}
              seatNumber={seat.number}
              onSubmit={handlePassengerSubmit}
              defaultValues={bookingData.passengers.find(
                (p) => p.seatNumber === seat.number
              )}
            />
          ))}
        </div>
      </div>
      <WarningDialog {...warningDialog} />
    </div>
  );
}
