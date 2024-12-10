"use client";

import { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // Added useRouter
import { BusLayout } from "@/components/seat-selection/bus-layout";
import { VanLayout } from "@/components/seat-selection/van-layout";
import {
  PassengerForm,
  PassengerFormHandles,
} from "@/components/seat-selection/passenger-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Seat, PassengerDetails } from "@/types/seat-types";
import { mockAPI } from "@/lib/mockapi";  // Add this import at the top
import { Trip } from "@/types/mocktypes"; // Import Trip type

export default function SeatSelectionPage() {
  const searchParams = useSearchParams();
  const tripId = searchParams.get("tripId");
  const destination = searchParams.get("destination") || "";

  const [trip, setTrip] = useState<Trip | null>(null); // Add state for trip
  const [vehicleType, setVehicleType] = useState<"BUS" | "VAN">("BUS");
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [passengers, setPassengers] = useState<PassengerDetails[]>([]);
  const [farePerSeat, setFarePerSeat] = useState<number>(0);
  const [bookedSeats, setBookedSeats] = useState<number[]>([]); // New state to hold booked seat numbers
  const [completedForms, setCompletedForms] = useState<Set<number>>(new Set());
  const router = useRouter(); // Initialize router

  // Store refs to each PassengerForm
  const passengerFormRefs = useRef<Map<number, PassengerFormHandles>>(
    new Map()
  );

  useEffect(() => {
    const fetchTripDetails = async () => {
      if (tripId) {
        try {
          const trip = await mockAPI.trip.get(tripId);
          if (!trip) {
            throw new Error("Trip not found");
          }
          setTrip(trip);
          setFarePerSeat(trip.price);
          setVehicleType(trip.effective_vehicle_type as "BUS" | "VAN"); // Update vehicle type based on trip details
        } catch (err) {
          const error = err as Error;
          console.error("Failed to fetch trip details:", error.message);
          // Optionally set an error state here
          // setError("Failed to fetch trip details");
        }
      }
    };
    fetchTripDetails();
  }, [tripId, destination]);

  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (tripId) {
        try {
          // Since this is mock data, you might want to simulate booked seats
          const seats = []; // Add mock booked seats as needed
          setBookedSeats(seats);
        } catch (err) {
          const error = err as Error;
          console.error("Failed to fetch bookings:", error.message);
          // Optionally set an error state here
          // setError("Failed to fetch bookings");
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
      // Remove from completed forms when deselecting
      setCompletedForms((prev) => {
        const next = new Set(prev);
        next.delete(clickedSeat.number);
        return next;
      });
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

  // Modify handlePassengerSubmit to ensure correct data types
  const handlePassengerSubmit = (data: PassengerDetails) => {
    const updatedData = {
      ...data,
      birthday: new Date(data.birthday),
      seatNumber: Number(data.seatNumber),
    };
    setPassengers((prev) => [
      ...prev.filter((p) => p.seatNumber !== updatedData.seatNumber),
      updatedData,
    ]);
    setCompletedForms((prev) => new Set([...prev, updatedData.seatNumber]));
  };

  const handleContinue = async () => {
    let allFormsCompleted = true;
    const passengersData: PassengerDetails[] = [];

    for (const seat of selectedSeats) {
      const formRef = passengerFormRefs.current.get(seat.number);
      if (formRef) {
        const isValid = await formRef.trigger();
        if (isValid) {
          const values = formRef.getValues();
          passengersData.push({
            ...values,
            birthday: new Date(values.birthday),
            seatNumber: seat.number,
          });
        } else {
          allFormsCompleted = false;
          break;
        }
      } else {
        allFormsCompleted = false;
        break;
      }
    }

    if (!allFormsCompleted || passengersData.length !== selectedSeats.length) {
      alert("Please fill in details for all selected seats.");
      return;
    }

    // All forms are valid, proceed
    setPassengers(passengersData);

    // Store booking data in localStorage
    localStorage.setItem(
      "bookingData",
      JSON.stringify({
        selectedSeats,
        passengers: passengersData,
        tripId,
        destination,
        farePerSeat,
      })
    );

    // Navigate to the payment page
    router.push("/payment");
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
                ref={(ref) => {
                  if (ref) {
                    passengerFormRefs.current.set(seat.number, ref);
                  } else {
                    passengerFormRefs.current.delete(seat.number);
                  }
                }}
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
