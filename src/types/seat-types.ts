export type SeatStatus = "available" | "selected" | "processing" | "booked" | "pwd" | "driver"

export interface Seat {
  id: string
  number: number
  status: SeatStatus
  isRestricted?: boolean // For van front seats or PWD seats
  isFrontSeat?: boolean // For van age restriction
}

export interface PassengerDetails {
  firstName: string
  lastName: string
  email?: string
  phoneNumber: string
  birthday: Date
  seatNumber: number
}

export interface BookingData {
  destination: string
  date: Date
  vehicleType: "BUS" | "VAN"
  time: string
  company: string
  price: number
  selectedSeats: Seat[]
  passengers: PassengerDetails[]
}