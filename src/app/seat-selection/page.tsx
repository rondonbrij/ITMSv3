"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BusLayout } from "@/components/seat-selection/bus-layout";
import { VanLayout } from "@/components/seat-selection/van-layout";
import { PassengerForm } from "@/components/seat-selection/passenger-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Seat, PassengerDetails } from "@/types/seat-types";
import { mockAPI } from "@/lib/mock-api";
import { getBookings } from "@/lib/mock-api"; // Add this import

export default function SeatSelectionPage() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get("tripId");
  const destination = searchParams.get("destination") || "";

  const [vehicleType, setVehicleType] = useState<"BUS" | "VAN">("BUS");
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [passengers, setPassengers] = useState<PassengerDetails[]>([]);
  const [farePerSeat, setFarePerSeat] = useState<number>(0);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]); // New state to hold booked seat numbers

  useEffect(() => {
    const fetchTripDetails = async () => {
      if (tripId) {
        try {
          const response = await mockAPI.getTrip(Number(tripId));
          const trip = response.data;
          setVehicleType(trip.vehicle.vehicle_type as "BUS" | "VAN");

          // Calculate fare based on destination/checkpoint
          if (destination) {
            const checkpoint = trip.route.checkpoints.find(
              (cp) => cp.name.toLowerCase() === destination.toLowerCase()
            );
            if (checkpoint) {
              const checkpointPrice = trip.checkpointPrices.find(
                (cp) => cp.checkpointId === checkpoint.id
              );
              if (checkpointPrice) {
                setFarePerSeat(checkpointPrice.price);
                return;
              }
            }
          }
          // If no specific destination or checkpoint price found, use full trip price
          setFarePerSeat(trip.price);
        } catch (error) {
          console.error("Failed to fetch trip details:", error);
        }
      }
    };
    fetchTripDetails();
  }, [tripId, destination]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (tripId) {
        try {
          const response = await mockAPI.getBookings();
          const allBookings = response.data;
          const tripBookings = allBookings.filter(
            (booking) => booking.trip.id === Number(tripId)
          );
          const seats = tripBookings.flatMap((booking) =>
            booking.passenger_info.map((info) => info.seatNumber)
          );
          setBookedSeats(seats);
        } catch (error) {
          console.error("Failed to fetch bookings:", error);
        }
      }
    };
    fetchBookedSeats();
  }, [tripId]);

  useEffect(() => {
    // Fetch booked seats and initialize seat statuses
    const initializeSeats = () => {
      const totalSeats = vehicleType === "BUS" ? 66 : 15;
      const newSeats = Array.from({ length: totalSeats }, (_, i) => ({
        id: `seat-${i + 1}`,
        number: i + 1,
        status: bookedSeats.includes(i + 1) ? "booked" : "available",
      }));
      setSeats(newSeats);
    };
    initializeSeats();
  }, [vehicleType, bookedSeats]);

  const handleSeatClick = (clickedSeat: Seat) => {
    if (clickedSeat.status === "booked") return;

    let updatedSeats: Seat[] = [];
    let updatedSelectedSeats: Seat[] = [];

    if (clickedSeat.status === "selected") {
      // Deselect the seat
      updatedSeats = seats.map((seat) =>
        seat.id === clickedSeat.id ? { ...seat, status: "available" } : seat
      );
      updatedSelectedSeats = selectedSeats.filter(
        (seat) => seat.id !== clickedSeat.id
      );
    } else {
      // Select the seat
      updatedSeats = seats.map((seat) =>
        seat.id === clickedSeat.id ? { ...seat, status: "selected" } : seat
      );
      updatedSelectedSeats = [
        ...selectedSeats,
        { ...clickedSeat, status: "selected" },
      ];
    }

    setSeats(updatedSeats);
    setSelectedSeats(updatedSelectedSeats);
  };

  const handlePassengerSubmit = (data: PassengerDetails) => {
    setPassengers((prev) => [
      ...prev.filter((p) => p.seatNumber !== data.seatNumber),
      data,
    ]);
  };

  const handleContinue = () => {
    if (selectedSeats.length !== passengers.length) {
      alert("Please fill in details for all selected seats.");
      return;
    }
    // Here you would typically proceed to the next step (e.g., payment)
    console.log("Proceeding with booking:", { selectedSeats, passengers });
  };

  return (
    <div className="container mx-auto p-6 grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Choose seat</CardTitle>
        </CardHeader>
        <CardContent>
          {vehicleType === "BUS" ? (
            <BusLayout seats={seats} onSeatClick={handleSeatClick} />
          ) : (
            <VanLayout seats={seats} onSeatClick={handleSeatClick} />
          )}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Passenger Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedSeats.map((seat, index) => (
              <PassengerForm
                key={seat.id}
                passengerNumber={index + 1} // Assign based on selection order
                seatNumber={seat.number}
                onSubmit={handlePassengerSubmit}
              />
            ))}
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fare per seat:</span>
                <span>₱ {farePerSeat.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>₱ {(selectedSeats.length * farePerSeat).toFixed(2)}</span>
              </div>
            </div>
            <Button
              className="w-full bg-black hover:bg-gray-800 text-white"
              onClick={handleContinue}
            >
              CONTINUE
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
