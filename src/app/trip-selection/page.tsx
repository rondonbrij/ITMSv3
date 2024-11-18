"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, isBefore, parseISO } from "date-fns";
import { CalendarIcon, MapPin, Truck } from "lucide-react";
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
import { getAvailableTrips, getDestinations, mockAPI } from "@/lib/mock-api";
import { Trip, Destination, TransportCompany } from "@/types/types";

type SortOption = "earliest" | "latest" | "cheapest";

function tripIncludesDestination(trip: Trip, destinationName: string): boolean {
  return trip.route.checkpoints.some(
    (checkpoint) => checkpoint.name === destinationName
  );
}

export default function TripSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );
  const [date, setDate] = useState<Date>(
    searchParams.get("date") ? new Date(searchParams.get("date")!) : new Date()
  );
  const [direction, setDirection] = useState(
    searchParams.get("direction") || ""
  );
  const [vehicleType, setVehicleType] = useState(
    searchParams.get("vehicleType") || ""
  );
  const [sortBy, setSortBy] = useState<SortOption>("earliest");
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [companies, setCompanies] = useState<TransportCompany[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await mockAPI.getTransportCompanies();
        setCompanies(response.data);
      } catch (error) {
        console.error("Failed to fetch transport companies:", error);
        setError(
          "Failed to fetch transport companies. Please try again later."
        );
      }
    };
    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchTrips = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const params = {
          destination,
          date: format(date, "yyyy-MM-dd"),
          vehicleType,
          direction,
        };
        const response = await getAvailableTrips(params);
        let fetchedTrips = response.data as Trip[];

        // Filter trips based on direction
        if (direction) {
          fetchedTrips = fetchedTrips.filter(
            (trip) => trip.route.direction === direction
          );
        }

        // Filter trips based on destination
        if (destination) {
          fetchedTrips = fetchedTrips.filter((trip) =>
            tripIncludesDestination(trip, destination)
          );
        }

        // Filter out trips that have already departed
        const now = new Date();
        fetchedTrips = fetchedTrips.filter((trip) => {
          const tripTime = parseISO(
            `${format(date, "yyyy-MM-dd")}T${trip.departure_time}`
          );
          return isBefore(now, tripTime);
        });

        if (selectedCompany && selectedCompany !== "all") {
          fetchedTrips = fetchedTrips.filter(
            (trip) => trip.transport_company.name === selectedCompany
          );
        }

        switch (sortBy) {
          case "earliest":
            fetchedTrips.sort((a, b) =>
              a.departure_time.localeCompare(b.departure_time)
            );
            break;
          case "latest":
            fetchedTrips.sort((a, b) =>
              b.departure_time.localeCompare(a.departure_time)
            );
            break;
          case "cheapest":
            fetchedTrips.sort((a, b) => a.price - b.price);
            break;
        }

        setTrips(fetchedTrips);
      } catch (error) {
        setError("Failed to fetch trips. Please try again later.");
        console.error("Failed to fetch trips:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrips();
  }, [destination, date, vehicleType, direction, sortBy, selectedCompany]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await getDestinations();
        setDestinations(response.data);
      } catch (error) {
        setError("Failed to fetch destinations. Please try again later.");
        console.error("Failed to fetch destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-4 flex-1">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                {destination || "Select destination"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
              <Command>
                <CommandInput placeholder="Search destination..." />
                <CommandList>
                  <CommandEmpty>No destination found.</CommandEmpty>
                  <CommandGroup>
                    {destinations.map((dest) => (
                      <CommandItem
                        key={dest.id}
                        value={dest.name}
                        onSelect={(value) => {
                          setDestination(value);
                        }}
                      >
                        <MapPin className="mr-2 h-4 w-4" />
                        <span>{dest.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {format(date, "PPP")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  if (newDate) {
                    setDate(newDate);
                  }
                }}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Select value={vehicleType} onValueChange={setVehicleType}>
            <SelectTrigger className="w-[200px]">
              <Truck className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Transport type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BUS">Bus</SelectItem>
              <SelectItem value="VAN">Van</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex gap-4">
        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortOption)}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="earliest">Earliest to Latest</SelectItem>
            <SelectItem value="latest">Latest to Earliest</SelectItem>
            <SelectItem value="cheapest">Cheapest</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Filter by Company" />
          </SelectTrigger>
          <SelectContent className="max-h-[200px] overflow-y-auto">
            <SelectItem value="all">All Companies</SelectItem>
            {companies.map((company) => (
              <SelectItem key={company.id} value={company.name}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded-lg">{error}</div>
      )}

      {isLoading && <div className="p-4 text-center">Loading trips...</div>}

      {!isLoading && !error && trips.length === 0 && (
        <div className="p-4 text-center text-gray-500">
          No trips found for the selected criteria.
        </div>
      )}

      {!isLoading && !error && trips.length > 0 && (
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Seats left</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trips.map((trip) => (
                <TableRow key={trip.id}>
                  <TableCell>
                    {format(
                      parseISO(
                        `${format(date, "yyyy-MM-dd")}T${trip.departure_time}`
                      ),
                      "hh:mm a"
                    )}
                  </TableCell>
                  <TableCell>{trip.transport_company.name}</TableCell>
                  <TableCell>{trip.vehicle.capacity}</TableCell>
                  <TableCell>₱{trip.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() =>
                        router.push(`/seat-selection?tripId=${trip.id}`)
                      }
                      className="bg-emerald-500 hover:bg-emerald-600 text-white"
                    >
                      Book Seats
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
