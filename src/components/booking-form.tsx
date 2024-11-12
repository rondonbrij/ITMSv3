"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  CalendarIcon,
  Check,
  ChevronDown,
  ChevronsUpDown,
  MapPin,
  Truck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  destination: z.string(),
  date: z.date(),
  vehicleType: z.enum(["BUS", "VAN"]),
  travelType: z.enum(["Passenger", "Package"]),
});

const destinations = [
  { id: "1", name: "BALER", region: "CENTRAL LUZON" },
  { id: "2", name: "TAGUM", region: "DAVAO DEL NORTE" },
  { id: "3", name: "DAVAO ECOLAND TERMINAL", region: "DAVAO DEL SUR" },
  { id: "4", name: "TACLOBAN", region: "EASTERN VISAYAS" },
  { id: "5", name: "LAOAG", region: "ILOCOS NORTE" },
];

function BookingForm({ featured = false }: { featured?: boolean }) {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      destination: "",
      date: new Date(),
      vehicleType: undefined,
      travelType: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams({
      destination: values.destination,
      date: values.date.toISOString(),
      vehicleType: values.vehicleType,
      travelType: values.travelType,
    });
    router.push(`/steptwo?${params.toString()}`);
  }

  return (
    <div className={`w-full ${featured ? "bg-muted p-6 rounded-lg" : ""}`}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col md:flex-row items-end gap-4"
        >
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
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <MapPin className="mr-2 h-4 w-4 shrink-0" />
                          {field.value
                            ? destinations.find(
                                (destination) => destination.id === field.value
                              )?.name
                            : "Select destination"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0">
                      <Command>
                        <CommandInput placeholder="Search destination..." />
                        <CommandEmpty>No destination found.</CommandEmpty>
                        {Array.from(
                          new Set(destinations.map((d) => d.region))
                        ).map((region) => (
                          <CommandGroup key={region} heading={region}>
                            {destinations
                              .filter((d) => d.region === region)
                              .map((destination) => (
                                <CommandItem
                                  key={destination.id}
                                  value={destination.name}
                                  onSelect={() => {
                                    form.setValue(
                                      "destination",
                                      destination.id
                                    );
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      destination.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {destination.name}
                                </CommandItem>
                              ))}
                          </CommandGroup>
                        ))}
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
                      <SelectTrigger>
                        <Truck className="mr-2 h-4 w-4 shrink-0" />
                        <SelectValue placeholder="Select vehicle type" />
                        <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
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
                      <SelectTrigger>
                        <Users className="mr-2 h-4 w-4 shrink-0" />
                        <SelectValue placeholder="Select transportee type" />
                        <ChevronDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
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
  );
}

export default BookingForm;
