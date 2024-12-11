"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { generateETicket } from "@/lib/eticket";

export default function PaymentPage() {
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [eTicketUrl, setETicketUrl] = useState("");

  useEffect(() => {
    const storedBookingData = localStorage.getItem("bookingData");
    if (storedBookingData) {
      const bookingData = JSON.parse(storedBookingData);
      bookingData.passengers = bookingData.passengers.map(
        (passenger: any) => ({
          ...passenger,
          birthday: new Date(passenger.birthday),
        })
      );
      bookingData.tripDate = new Date(bookingData.tripDate);
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

  const { passengers, farePerSeat, tripDate, tripTime, vehicleCompany, checkpointName } = booking;
  const numberOfPassengers = passengers.length;
  const totalPrice = farePerSeat * numberOfPassengers;

  const sendConfirmationEmail = async (booking: any, eTicketUrl: string) => {
    const primaryPassenger = booking.passengers[0];
    const emailHtml = `
      <h1>Booking Confirmation</h1>
      <p>Dear ${primaryPassenger.firstName},</p>
      <p>Your booking has been confirmed. Here are the details:</p>
      <ul>
        <li>Trip Date: ${format(new Date(booking.tripDate), "MMMM d, yyyy")}</li>
        <li>Trip Time: ${booking.tripTime}</li>
        <li>Trip Route: Irawan to ${booking.checkpointName}</li>
        <li>Vehicle Company: ${booking.vehicleCompany}</li>
      </ul>
      <p>Your e-ticket is attached to this email.</p>
      <p>Thank you for choosing our service!</p>
    `;

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: primaryPassenger.email,
          subject: 'Booking Confirmation',
          html: emailHtml,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  };

  const handlePaid = async () => {
    try {
      // Generate e-ticket
      const eTicketData = await generateETicket(booking);
      setETicketUrl(eTicketData.url);

      // Send confirmation email
      await sendConfirmationEmail(booking, eTicketData.url);

      setShowConfirmation(true);
    } catch (error) {
      console.error("Error processing payment:", error);
      setError("Failed to process payment. Please try again.");
    }
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
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
              <p>Trip Date: {format(new Date(tripDate), "MMMM d, yyyy")}</p>
              <p>Trip Time: {tripTime}</p>
              <p>Trip Route: Irawan to {checkpointName}</p>
              <p>Vehicle Company: {vehicleCompany}</p>
              <p>Fare per Seat: ₱{farePerSeat}</p>
            </CardContent>
          </Card>

          {/* Passenger Details */}
          {passengers.map((passenger: any, index: number) => (
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
                <Button onClick={handlePaid} disabled={!agreeTerms}>
                  Pay Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <AlertDialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Booking Confirmed</AlertDialogTitle>
            <AlertDialogDescription>
              Your booking is confirmed and an e-ticket has been sent to your email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex flex-col space-y-2">
            <Button onClick={() => window.open(eTicketUrl, '_blank')}>
              Download E-Ticket
            </Button>
            <AlertDialogAction onClick={handleCloseConfirmation}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

