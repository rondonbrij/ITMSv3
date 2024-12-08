"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { format, parse, isValid } from "date-fns";
import {
  CalendarIcon,
  MapPin,
  PoundSterlingIcon as PhilippinePeso,
  ClockIcon as ClockArrowDown,
  ArrowUpIcon as ClockArrowUp,
  Bus,
  Building2,
  Eye,
} from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { tripAPI, checkpointAPI, transportCompanyAPI } from "@/lib/api";
import { Trip, Checkpoint, TransportCompany } from "@/types/types";
import { useAcknowledgment } from "@/components/acknowledgment-modal-provider";
import { PrivacyPolicyModal } from "@/components/privacy-policy-modal";
import { TermsOfServiceModal } from "@/components/terms-of-service-modal";
import { TripCard } from "@/components/trip-selection/TripCard";
import { TripSkeleton } from "@/components/trip-selection/TripSkeleton";
import { useMediaQuery } from "@/hooks/useMediaQuery";

type SortOption = "earliest" | "latest" | "cheapest";

function tripIncludesCheckpoint(trip: Trip, checkpointId: number): boolean {
  return trip.checkpoints.some((checkpoint) => checkpoint.id === checkpointId);
}

// Update getPriceForCheckpoint function to handle undefined checkpointPrices
function getPriceForCheckpoint(trip: Trip, checkpointId: number) {
  const checkpointPrice = trip.checkpointPrices?.find(
    (cp) => cp.checkpointId === checkpointId
  );
  // Convert price to number before returning
  return checkpointPrice ? Number(checkpointPrice.price) : Number(trip.price);
}

const formatDepartureTime = (time: string) => {
  try {
    // Assuming time comes in "HH:mm" format from backend
    const parsedTime = parse(time, "HH:mm", new Date());
    if (isValid(parsedTime)) {
      return format(parsedTime, "hh:mm a");
    }
    return "Invalid Time";
  } catch {
    return "Invalid Time";
  }
};

export default function TripSelection() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setShowAcknowledgmentModal, hasAgreed } = useAcknowledgment();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const [checkpoint, setCheckpoint] = useState<Checkpoint | null>(null);
  const [date, setDate] = useState<Date>(
    searchParams.get("date") ? new Date(searchParams.get("date")!) : new Date()
  );
  const [vehicleType, setVehicleType] = useState<string>(
    searchParams.get("vehicleType") || ""
  );
  const [sortBy, setSortBy] = useState<SortOption>("earliest");
  const [selectedCompany, setSelectedCompany] = useState<string>("all");
  const [trips, setTrips] = useState<Trip[]>([]);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([]);
  const [companies, setCompanies] = useState<TransportCompany[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTermsOfService, setShowTermsOfService] = useState(false);

  useEffect(() => {
    if (!hasAgreed) {
      setShowAcknowledgmentModal(true);
    }
  }, [hasAgreed, setShowAcknowledgmentModal]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await transportCompanyAPI.list();
        setCompanies(response);
      } catch (error) {
        console.error("Failed to fetch transport companies:", error);
        setError(
          "Failed to fetch transport companies. Please try again later."
        );
      }
    };
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) => {
    if (vehicleType === "BUS") {
      return ["Cherry Bus", "Roro Bus"].includes(company.name);
    }
    if (vehicleType === "VAN") {
      return [
        "Langgam Transport",
        "Lexus Transport",
        "Palshutex Transport",
        "Quezon Transport",
        "Barakkah Transport",
      ].includes(company.name);
    }
    return true;
  });

  const handleBookNow = (tripId: string) => {
    if (hasAgreed) {
      router.push(
        `/seat-selection?tripId=${tripId}&checkpointId=${checkpoint?.id}`
      );
    } else {
      setShowAcknowledgmentModal(true);
    }
  };

  const fetchTrips = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await tripAPI.list();
      let fetchedTrips = response;

      if (vehicleType && vehicleType !== "ALL") {
        fetchedTrips = fetchedTrips.filter(
          (trip) =>
            trip.vehicle &&
            trip.vehicle.vehicle_type.toUpperCase() ===
              vehicleType.toUpperCase()
        );
      }

      if (checkpoint) {
        fetchedTrips = fetchedTrips.filter((trip) =>
          tripIncludesCheckpoint(trip, checkpoint.id)
        );
      }

      if (selectedCompany && selectedCompany !== "all") {
        fetchedTrips = fetchedTrips.filter(
          (trip) => trip.transport_company.name === selectedCompany
        );
      }

      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      fetchedTrips = fetchedTrips.filter((trip) => {
        if (format(date, "yyyy-MM-dd") === format(now, "yyyy-MM-dd")) {
          return trip.departure_time > currentTime;
        }
        return true;
      });

      fetchedTrips = fetchedTrips.filter(
        (trip) => trip.vehicle && trip.vehicle.capacity > 0
      );

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
          fetchedTrips.sort((a, b) => {
            const priceA = checkpoint
              ? getPriceForCheckpoint(a, checkpoint.id)
              : a.price;
            const priceB = checkpoint
              ? getPriceForCheckpoint(b, checkpoint.id)
              : b.price;
            return priceA - priceB;
          });
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

  useEffect(() => {
    const fetchCheckpoints = async () => {
      try {
        const response = await checkpointAPI.list();
        setCheckpoints(response);
      } catch (error) {
        setError("Failed to fetch checkpoints. Please try again later.");
        console.error("Failed to fetch checkpoints:", error);
      }
    };
    fetchCheckpoints();
  }, []);

  useEffect(() => {
    fetchTrips();
  }, [checkpoint, date, vehicleType, sortBy, selectedCompany]);

  // Move companies state update to useEffect to avoid setState during render
  useEffect(() => {
    if (trips.length > 0) {
      const uniqueCompanies = Array.from(
        new Set(trips.map((trip) => trip.transport_company.name))
      );
      const formattedCompanies = uniqueCompanies.map((name) => ({
        id: name,
        name: name,
      }));
      setCompanies(formattedCompanies);
    }
  }, [trips]);

  // WebSocket connection for real-time updates
  useEffect(() => {
    // Only set up WebSocket on client-side
    if (typeof window !== "undefined") {
      const socket = new WebSocket("ws://your-websocket-server-url");

      socket.onmessage = (event) => {
        const updatedTrip = JSON.parse(event.data);
        setTrips((prevTrips) =>
          prevTrips.map((trip) =>
            trip.id === updatedTrip.id ? { ...trip, ...updatedTrip } : trip
          )
        );
      };

      return () => {
        socket.close();
      };
    }
  }, []);

  return (
    <div className="container mx-auto py-8 px-4 space-y-8 bg-white">
      <PrivacyPolicyModal
        isOpen={showPrivacyPolicy}
        onClose={() => setShowPrivacyPolicy(false)}
      />

      <TermsOfServiceModal
        isOpen={showTermsOfService}
        onClose={() => setShowTermsOfService(false)}
      />

      <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-between flex-1 w-full">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-[200px] justify-start"
            >
              <MapPin className="mr-2 h-4 w-4" />
              {checkpoint ? checkpoint.baranggay : "Select checkpoint"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search checkpoint..." />
              <CommandList>
                <CommandEmpty>No checkpoint found.</CommandEmpty>
                <CommandGroup>
                  {checkpoints.map((cp) => (
                    <CommandItem
                      key={cp.id}
                      value={cp.baranggay}
                      onSelect={() => setCheckpoint(cp)}
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>{cp.baranggay}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full sm:w-[200px] justify-start"
            >
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

        <Select
          value={vehicleType}
          onValueChange={(value) => {
            setVehicleType(value);
            setSelectedCompany("all");
          }}
        >
          <SelectTrigger className="start w-full pl-4 sm:w-[200px]">
            <div className="flex items-center flex-row">
              <Bus className="mr-4 h-4 w-4" />
              <SelectValue placeholder="Transport type" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Types</SelectItem>
            <SelectItem value="BUS">Bus</SelectItem>
            <SelectItem value="VAN">Van</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={sortBy}
          onValueChange={(value) => setSortBy(value as SortOption)}
        >
          <SelectTrigger className="start w-full pl-4 sm:w-[200px]">
            <div className="flex items-center flex-row">
              {sortBy === "earliest" && (
                <ClockArrowUp className="mr-4 h-4 w-4" />
              )}
              {sortBy === "latest" && (
                <ClockArrowDown className="mr-4 h-4 w-4" />
              )}
              {sortBy === "cheapest" && (
                <PhilippinePeso className="mr-4 h-4 w-4" />
              )}
              <SelectValue placeholder="Sort by" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="earliest">Earliest to Latest</SelectItem>
            <SelectItem value="latest">Latest to Earliest</SelectItem>
            <SelectItem value="cheapest">Cheapest</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCompany} onValueChange={setSelectedCompany}>
          <SelectTrigger className="start w-full pl-4 sm:w-[200px]">
            <div className="flex items-center flex-row">
              <Building2 className="mr-4 h-4 w-4" />
              <SelectValue placeholder="Filter by Company" />
            </div>
          </SelectTrigger>
          <SelectContent className="max-h-[200px] overflow-y-auto">
            <SelectItem key="all" value="all">
              All Companies
            </SelectItem>
            {filteredCompanies.map((company) => (
              <SelectItem key={`company-${company.id}`} value={company.name}>
                {company.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {error && (
        <div className="p-4 text-red-500 bg-red-50 rounded-lg">{error}</div>
      )}

      {isLoading ? (
        <div className="flex flex-col gap-4">
          {[...Array(5)].map((_, index) => (
            <TripSkeleton key={index} isMobile={isMobile} />
          ))}
        </div>
      ) : (
        <>
          {!error && trips.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No trips found for the selected criteria.
            </div>
          )}

          {!error && trips.length > 0 && (
            <>
              <div className="sm:hidden space-y-4">
                {trips.map((trip) => (
                  <TripCard
                    key={trip.id}
                    trip={trip}
                    checkpoint={checkpoint}
                    onBookNow={handleBookNow}
                  />
                ))}
              </div>
              <div className="hidden sm:block border rounded-lg overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Route</TableHead>
                      <TableHead>Seats left</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead className="text-right">Book</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trips.map((trip) => (
                      <TableRow key={trip.id}>
                        <TableCell>
                          {trip.departure_time
                            ? formatDepartureTime(trip.departure_time)
                            : "No Time"}
                        </TableCell>
                        <TableCell>{trip.transport_company.name}</TableCell>
                        <TableCell>{trip.route.name}</TableCell>
                        <TableCell>
                          {trip.vehicle ? trip.vehicle.capacity : "N/A"}
                        </TableCell>
                        <TableCell>
                          ₱
                          {checkpoint
                            ? Number(
                                getPriceForCheckpoint(trip, checkpoint.id)
                              ).toFixed(2)
                            : Number(trip.price).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Trip Notes</DialogTitle>
                                <DialogDescription>
                                  {trip.notes ||
                                    "No notes available for this trip."}
                                </DialogDescription>
                              </DialogHeader>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            onClick={() => handleBookNow(trip.id)}
                            className="bg-blue-500 hover:bg-primary text-white"
                          >
                            Book Seats
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
