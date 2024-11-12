import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Destinations() {
  const destinations = [
    {
      title: "BAGUIO CITY",
      image: "/placeholder.svg",
      description: "Known as the summer capital of the Philippines",
    },
    {
      title: "LAOAG",
      image: "/placeholder.svg",
      description: "Gateway to the historic Ilocos region",
    },
    {
      title: "KORONADAL",
      image: "/placeholder.svg",
      description: "The gateway to South Cotabato's attractions",
    },
  ];

  return (
    <section className="py-12">
      <div className="container">
        <h2 className="text-2xl font-bold text-center mb-8">Destinations</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {destinations.map((destination, index) => (
            <Card key={index}>
              <CardHeader className="p-0">
                <div className="relative h-48 w-full">
                  <Image
                    src={destination.image}
                    alt={destination.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="mb-2">{destination.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {destination.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Destinations;
