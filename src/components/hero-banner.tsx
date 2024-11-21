import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function HeroBanner() {
  const router = useRouter();

  const handleDirectionClick = (direction: "north" | "south") => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    router.push(`/trip-selection?direction=${direction}&date=${formattedDate}`);
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center">
      <div className="absolute inset-0 bg-cover bg-center banner">
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/50 to-yellow-500/50" />
      </div>
      <div className="container relative w-full flex flex-col items-center justify-center text-center text-white px-5">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Irawan Land Transportation Terminal
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Official Booking Website of Puerto Princesa City
        </p>
        <div className="flex justify-center space-x-4">
          <Button
            onClick={() => handleDirectionClick("north")}
            size="lg"
            className="bg-blue-500 text-primary-foreground hover:bg-yellow-500"
          >
            Going North
          </Button>
          <Button
            onClick={() => handleDirectionClick("south")}
            size="lg"
            className="bg-blue-500 text-primary-foreground hover:bg-yellow-500"
          >
            Going South
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
