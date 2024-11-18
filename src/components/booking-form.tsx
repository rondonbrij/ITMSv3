"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { CalendarIcon, MapPin, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { getDestinations } from "@/lib/mock-api";
import { Destination } from "@/types/types";

const FormSchema = z.object({
  destination: z.string({
    required_error: "Please select a destination.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  vehicleType: z.string({
    required_error: "Please select a vehicle type.",
  }),
  transporteeType: z.string({
    required_error: "Please select a transportee type.",
  }),
});

export default function BookingForm() {
  const router = useRouter();
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      destination: "",
      date: new Date(),
      vehicleType: "",
      transporteeType: "",
    },
  });

  // Fetch destinations from API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await getDestinations();
        setDestinations(response.data);
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  // Filter destinations based on input
  const filteredDestinations = destinations.filter((destination) =>
    destination.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  function onSubmit(values: z.infer<typeof FormSchema>) {
    // Redirect to trip selection page with form values as query params
    router.push(
      `/trip-selection?destination=${encodeURIComponent(
        values.destination
      )}&date=${format(values.date, "yyyy-MM-dd")}&vehicleType=${
        values.vehicleType
      }&travelType=${values.transporteeType}`
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex flex-wrap gap-4">
          <FormField
            control={form.control}
            name="destination"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        {field.value
                          ? destinations.find(
                              (destination) => destination.name === field.value
                            )?.name
                          : "Select destination"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder="Search destination..."
                        value={inputValue}
                        onValueChange={setInputValue}
                      />
                      <CommandList>
                        <CommandEmpty>No destination found.</CommandEmpty>
                        <CommandGroup>
                          {filteredDestinations.map((destination) => (
                            <CommandItem
                              key={destination.id}
                              value={destination.name}
                              onSelect={() => {
                                form.setValue("destination", destination.name);
                                setOpen(false);
                              }}
                            >
                              <MapPin className="mr-2 h-4 w-4" />
                              {destination.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value
                          ? format(field.value, "PPP")
                          : "Pick a date"}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="vehicleType"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <Truck className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Transport type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="BUS">BUS</SelectItem>
                    <SelectItem value="VAN">VAN</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="transporteeType"
            render={({ field }) => (
              <FormItem className="flex-1">
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <Users className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Transportee type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Passenger">Passenger</SelectItem>
                    <SelectItem value="Package">Package</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full">
          Search Available Trips
        </Button>
      </form>
    </Form>
  );
}
