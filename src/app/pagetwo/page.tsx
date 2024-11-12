"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown, MapPin, Truck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getAvailableTrips } from "@/api/api";
import { Trip } from "@/types/types";

type SortOption = "earliest" | "latest" | "cheapest";

const companies = [
  "Barakkah",
  "Victory Liner",
  "Five Star",
  "Genesis",
  "Philtranco",
  "JAM Liner",
  "DLTB",
];

export default function TripSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Filter states
  const [destination, setDestination] = useState(searchParams.get("destination") || "");
  const [date, setDate] = useState<Date>(
    searchParams.get("date") ? new Date(searchParams.get("date")!) : new Date()
  );
  const [vehicleType, setVehicleType] = useState(searchParams.get("vehicleType") || "");
  const [transporteeType, setTransporteeType] = useState(searchParams.get("travelType") || "");

  // Sort and filter states
  const [sortBy, setSortBy] = useState<SortOption>("earliest");
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [trips, setTrips] = useState<Trip[]>([]); // Initialize with empty array for fetched data

  // Fetch trips from API
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const params = {
          destination,
          date: format(date, "yyyy-MM-dd"),
          vehicleType,
          transporteeType,
        };
        const response = await getAvailableTrips(params);
        let fetchedTrips = response.data as Trip[];

        // Filter and sort fetched trips
        if (selectedCompany) {
          fetchedTrips = fetchedTrips.filter(trip => trip.transport_company.name === selectedCompany);
        }

        switch (sortBy) {
          case "earliest":
            fetchedTrips.sort((a, b) => a.departure_time.localeCompare(b.departure_time));
            break;
          case "latest":
            fetchedTrips.sort((a, b) => b.departure_time.localeCompare(a.departure_time));
            break;
          case "cheapest":
            fetchedTrips.sort((a, b) => a.price - b.price);
            break;
        }

        setTrips(fetchedTrips);
      } catch (error) {
        console.error("Failed to fetch trips:", error);
      }
    };

    fetchTrips();
  }, [destination, date, vehicleType, transporteeType, sortBy, selectedCompany]);

  const handleUpdate = () => {
    router.push({
      pathname: "/trip-selection",
      query: {
        destination,
        date: format(date, "yyyy-MM-dd"),
        vehicleType,
        travelType: transporteeType,
      },
    });
  };

  return (
    <div>
      {/* UI Components here */}
      {/* Map over trips to display fetched trip data */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company</TableHead>
            <TableHead>Departure Time</TableHead>
            <TableHead>Seats Left</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trips.map(trip => (
            <TableRow key={trip.id}>
              <TableCell>{trip.transport_company.name}</TableCell>
              <TableCell>{format(new Date(trip.departure_time), "hh:mm a")}</TableCell>
              <TableCell>{trip.vehicle.capacity}</TableCell>
              <TableCell>{trip.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
