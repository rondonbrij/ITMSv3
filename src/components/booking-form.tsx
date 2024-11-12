"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { CalendarIcon, Check, ChevronsUpDown, MapPin, Truck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { getDestinations, createBooking } from "@/lib/api"
import { Destination } from "@/types/types"

// Define schema for form validation
const formSchema = z.object({
  destination: z.string(),
  date: z.date(),
  vehicleType: z.enum(["BUS", "VAN"]),
  travelType: z.enum(["Passenger", "Package"]),
})

function BookingForm({ featured = false }: { featured?: boolean }) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [destinations, setDestinations] = React.useState<Destination[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      date: new Date(),
      vehicleType: undefined,
      travelType: undefined,
    },
  })

  // Fetch destinations from the API
  React.useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await getDestinations()
        setDestinations(response.data)
      } catch (error) {
        console.error("Failed to fetch destinations:", error)
      }
    }
    fetchDestinations()
  }, [])

  const filteredDestinations = destinations.filter(destination =>
    destination.name.toLowerCase().includes(inputValue.toLowerCase()) ||
    destination.region.toLowerCase().includes(inputValue.toLowerCase())
  )

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const bookingData = {
        destination_id: values.destination,
        travel_date: values.date.toISOString(),
        vehicle_type: values.vehicleType,
        travel_type: values.travelType,
      }
      const response = await createBooking(bookingData)
      router.push(`/steptwo?bookingId=${response.data.id}`)
    } catch (error) {
      console.error("Failed to create booking:", error)
    }
  }

  return (
    <div className={`w-full ${featured ? "bg-muted p-6 rounded-lg" : ""}`}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row items-end gap-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-grow w-full">
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-start items-center",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <MapPin className="mr-2 h-4 w-4 shrink-0" />
                          <span className="flex-1 text-left">
                            {field.value
                              ? destinations.find(
                                  (destination) => destination.id === field.value
                                )?.name
                              : "Select destination"}
                          </span>
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent>
                      <Command>
                        <CommandInput
                          placeholder="Search destination"
                          value={inputValue}
                          onValueChange={setInputValue}
                        />
                        <CommandList>
                          <CommandEmpty>No destinations found.</CommandEmpty>
                          <CommandGroup>
                            {filteredDestinations.map((destination) => (
                              <CommandItem
                                key={destination.id}
                                value={destination.id.toString()}
                                onSelect={() => {
                                  field.onChange(destination.id.toString())
                                  setOpen(false)
                                }}
                              >
                                <MapPin className="mr-2 h-4 w-4" />
                                <span>{destination.name}</span>
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vehicleType"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="justify-start items-center">
                        <Truck className="mr-2 h-4 w-4 shrink-0" />
                        <SelectValue placeholder="Select vehicle type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="BUS">BUS</SelectItem>
                      <SelectItem value="VAN">VAN</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="travelType"
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="justify-start items-center">
                        <Users className="mr-2 h-4 w-4 shrink-0" />
                        <SelectValue placeholder="Select transportee type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Passenger">Passenger</SelectItem>
                      <SelectItem value="Package">Package</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full md:w-auto">
            Search
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default BookingForm