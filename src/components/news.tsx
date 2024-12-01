"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  image: string;
  slug: string;
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "New Terminal Wing Opening Soon",
    description:
      "Experience enhanced comfort and convenience with our upcoming terminal expansion project.",
    date: "2024-02-15",
    image: "/images/placeholder.png",
    slug: "new-terminal-wing-opening",
  },
  {
    id: "2",
    title: "Digital Ticketing System Launch",
    description:
      "We're modernizing our booking process with a new digital ticketing system.",
    date: "2024-02-10",
    image: "/images/placeholder.png",
    slug: "digital-ticketing-launch",
  },
  {
    id: "3",
    title: "Holiday Schedule Updates",
    description:
      "Important updates to our service schedule during the upcoming holiday season.",
    date: "2024-02-05",
    image: "/images/placeholder.png",
    slug: "holiday-schedule-updates",
  },
  {
    id: "4",
    title: "New Routes Announcement",
    description:
      "Expanding our service with new routes to popular destinations.",
    date: "2024-02-01",
    image: "/images/placeholder.svg",
    slug: "new-routes-announcement",
  },
  {
    id: "5",
    title: "Safety Measures Enhancement",
    description:
      "Learn about our upgraded safety protocols for passenger well-being.",
    date: "2024-01-28",
    image: "/images/placeholder.svg",
    slug: "safety-measures-enhancement",
  },
  {
    id: "6",
    title: "Community Service Initiative",
    description:
      "Join us in our latest community service programs and activities.",
    date: "2024-01-25",
    image: "/images/placeholder.svg",
    slug: "community-service-initiative",
  },
];

export default function News() {
  return (
    <section className="py-12 px-4 md:px-6">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-center mb-8">Latest News</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.slice(0, 3).map((item) => (
            <Card
              key={item.id}
              className="overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center text-sm text-muted-foreground">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  {new Date(item.date).toLocaleDateString()}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Link href={`/announcements/${item.slug}`} className="w-full">
                  <Button
                    variant="outline"
                    className="w-full border-primary bg- hover:bg-primary hover:text-primary-foreground"
                  >
                    Read more
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link href="/announcements">
            <Button
              variant="outline"
              size="lg"
              className=" bg-blue-500 text-white hover:bg-primary hover:text-primary-foreground"
            >
              See More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
