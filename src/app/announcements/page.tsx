"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { PaginatedAnnouncements } from "@/types/types";
import { getAnnouncements } from "@/lib/mockfolder/mock-announcement";
export default function AnnouncementsPage() {
  const [paginatedAnnouncements, setPaginatedAnnouncements] =
    useState<PaginatedAnnouncements | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setIsLoading(true);
      try {
        const data = await getAnnouncements(currentPage, 10);
        setPaginatedAnnouncements(data);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnnouncements();
  }, [currentPage]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-4xl font-bold mb-8">Announcements</h1>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-6 bg-muted rounded mb-2 w-3/4" />
                <div className="h-4 bg-muted rounded mb-4 w-1/4" />
                <div className="h-4 bg-muted rounded w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!paginatedAnnouncements) return null;

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">Announcements</h1>
      <div className="space-y-4">
        {paginatedAnnouncements.data.map((announcement) => (
          <Card key={announcement.id} className="overflow-hidden">
            <Link href={`/announcements/${announcement.slug}`}>
              <CardContent className="p-6">
                <div className="grid sm:grid-cols-[200px,1fr] gap-4">
                  {announcement.images[0] ? (
                    <div className="relative h-40 sm:h-full">
                      <Image
                        src={announcement.images[0]}
                        alt={announcement.title}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                  ) : (
                    <div className="h-40 sm:h-full bg-muted rounded-md flex items-center justify-center text-muted-foreground">
                      No image available
                    </div>
                  )}
                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold hover:text-primary transition-colors">
                      {announcement.title}
                    </h2>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      {new Date(announcement.date).toLocaleDateString()}
                    </div>
                    <p className="text-muted-foreground line-clamp-2">
                      {announcement.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
              />
            </PaginationItem>
            {[...Array(paginatedAnnouncements.totalPages)].map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < paginatedAnnouncements.totalPages) {
                    setCurrentPage(currentPage + 1);
                  }
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
