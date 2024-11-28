"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchBookingDetails } from "@/lib/api";
import { BookingDetails } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function PaymentPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null); // Adjust type as needed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("gcash");
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showPaidButton, setShowPaidButton] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const storedBookingData = localStorage.getItem("bookingData");
    if (storedBookingData) {
      const bookingData = JSON.parse(storedBookingData);

      // Convert passenger birthdays back to Date objects
      bookingData.passengers = bookingData.passengers.map(
        (passenger: PassengerDetails) => ({
          ...passenger,
          birthday: new Date(passenger.birthday),
        })
      );

      setBooking(bookingData);
      setLoading(false);
    } else {
      setError("No booking data found.");
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !booking) {
    return <div>{error || "Booking not found"}</div>;
  }

  const { passengers, selectedSeats, tripId, destination, farePerSeat } =
    booking;
  const numberOfPassengers = passengers.length;
  const totalPrice = farePerSeat * numberOfPassengers;

  const handlePaid = () => {
    setShowConfirmation(true);
  };

  const handleReturnHome = () => {
    router.push("/");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/2 space-y-6">
          {/* Trip Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Trip Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Trip ID: {tripId}</p>
              <p>Destination: {destination}</p>
              <p>Fare per Seat: ₱{farePerSeat}</p>
            </CardContent>
          </Card>

          {/* Passenger Details */}
          {passengers.map((passenger: PassengerDetails, index: number) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl font-bold">
                  Passenger {index + 1} Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>First Name: {passenger.firstName}</p>
                <p>Last Name: {passenger.lastName}</p>
                <p>Birthdate: {passenger.birthday.toDateString()}</p>
                <p>Phone Number: {passenger.phoneNumber}</p>
                {passenger.email && <p>Email: {passenger.email}</p>}
                <p>Seat Number: {passenger.seatNumber}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="w-full md:w-1/2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">Payment</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="gcash" id="gcash" />
                  <Label htmlFor="gcash">GCash</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="credit" id="credit" disabled />
                  <Label htmlFor="credit" className="opacity-50">
                    Credit/Debit Card (Currently Unavailable)
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === "gcash" && (
                <div className="space-y-4">
                  <p className="font-semibold">Scan QR using the GCash App</p>
                  <Card className="relative">
                    <CardContent className="p-4">
                      <Image
                        src="/images/qr.png"
                        alt="GCash QR Code"
                        width={isEnlarged ? 400 : 200}
                        height={isEnlarged ? 400 : 200}
                        className="mx-auto"
                      />
                      <Button
                        onClick={() => setIsEnlarged(!isEnlarged)}
                        className="mt-4 w-full"
                      >
                        {isEnlarged ? "Retract" : "Enlarge"}
                      </Button>
                    </CardContent>
                  </Card>
                  <div className="space-y-2 text-sm">
                    <p>Instructions:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Open GCash app on your phone</li>
                      <li>Select &#34;Pay QR&#34;</li>
                      <li>Align your phone camera to scan the QR code</li>
                      <li>Press the &#34;Pay&#34; button in the GCash app</li>
                    </ol>
                  </div>
                </div>
              )}

              <p className="font-bold text-lg">
                Total Payment: ₱{totalPrice.toFixed(2)}
              </p>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) =>
                    setAgreeTerms(checked as boolean)
                  }
                />
                <label htmlFor="terms" className="text-sm">
                  I agree to the terms and conditions
                </label>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => router.back()}>
                  Back
                </Button>
                {paymentMethod === "gcash" &&
                  agreeTerms &&
                  (showPaidButton ? (
                    <Button onClick={handlePaid}>Paid</Button>
                  ) : (
                    <Button disabled>Pay Now</Button>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Booking Confirmed</AlertDialogTitle>
            <AlertDialogDescription>
              Your booking tickets will be sent to you in a moment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleReturnHome}>
              Return Home
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
