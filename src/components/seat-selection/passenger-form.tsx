import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Calendar, Mail, Phone, User } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const phoneRegex = /^(\+63|0)[0-9]{10}$/

const passengerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email().optional(),
  phoneNumber: z.string().regex(phoneRegex, "Invalid phone number format"),
  birthday: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
})

interface PassengerFormProps {
  seatNumber: number
  onSubmit: (data: z.infer<typeof passengerSchema> & { seatNumber: number }) => void
}

export function PassengerForm({ seatNumber, onSubmit }: PassengerFormProps) {
  const form = useForm<z.infer<typeof passengerSchema>>({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      birthday: "",
    },
  })

  const handleSubmit = (values: z.infer<typeof passengerSchema>) => {
    onSubmit({ ...values, seatNumber })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 border rounded-lg p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">Passenger {seatNumber}</h3>
          <Badge variant="secondary" className="bg-green-500 text-white">
            Seat No. {seatNumber}
          </Badge>
        </div>
        <p className="text-red-500 text-sm">Please enter your name as same as in id</p>
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input className="pl-9" placeholder="First Name" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                    <Input className="pl-9" placeholder="Last Name" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input className="pl-9" placeholder="Email" type="email" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input className="pl-9" placeholder="Phone Number" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birthday</FormLabel>
              <FormControl>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                  <Input className="pl-9" type="date" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}