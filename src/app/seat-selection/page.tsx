"use client";

import { useState, useEffect } from 'react'
import { BusLayout } from '@/components/seat-selection/bus-layout'
import { VanLayout } from '@/components/seat-selection/van-layout'
import { PassengerForm } from '@/components/seat-selection/passenger-form'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Seat, PassengerDetails } from "@/types/seat-types" // Add this import

export default function SeatSelectionPage() {
  const [vehicleType, setVehicleType] = useState<'BUS' | 'VAN'>('BUS')
  const [seats, setSeats] = useState<Seat[]>([])
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])
  const [passengers, setPassengers] = useState<PassengerDetails[]>([])

  useEffect(() => {
    // Simulating fetching seat data
    const totalSeats = vehicleType === 'BUS' ? 66 : 15
    const newSeats = Array.from({ length: totalSeats }, (_, i) => ({
      id: `seat-${i + 1}`,
      number: i + 1,
      status: Math.random() > 0.8 ? 'booked' : 'available',
    }))
    setSeats(newSeats)
  }, [vehicleType])

  const handleSeatClick = (clickedSeat: Seat) => {
    if (clickedSeat.status === 'booked') return

    const updatedSeats = seats.map(seat =>
      seat.id === clickedSeat.id
        ? { ...seat, status: seat.status === 'selected' ? 'available' : 'selected' }
        : seat
    )
    setSeats(updatedSeats)
    setSelectedSeats(updatedSeats.filter(seat => seat.status === 'selected'))
  }

  const handlePassengerSubmit = (data: PassengerDetails) => {
    setPassengers(prev => [
      ...prev.filter(p => p.seatNumber !== data.seatNumber),
      data
    ])
  }

  const handleContinue = () => {
    if (selectedSeats.length !== passengers.length) {
      alert('Please fill in details for all selected seats.')
      return
    }
    // Here you would typically proceed to the next step (e.g., payment)
    console.log('Proceeding with booking:', { selectedSeats, passengers })
  }

  return (
    <div className="container mx-auto p-6 grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Choose seat</CardTitle>
        </CardHeader>
        <CardContent>
          {vehicleType === 'BUS' ? (
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
            {selectedSeats.map(seat => (
              <PassengerForm
                key={seat.id}
                seatNumber={seat.number}
                onSubmit={handlePassengerSubmit}
              />
            ))}
            <div className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Fare per seat:</span>
                <span>₱ 500.00</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>₱ {(selectedSeats.length * 500).toFixed(2)}</span>
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
  )
}