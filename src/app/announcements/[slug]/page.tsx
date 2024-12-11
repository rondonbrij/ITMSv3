import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
// import { Announcement } from "@/types/mocktypes";
import {
  getAnnouncement,
  getOtherAnnouncements,
} from "@/lib/mocks/mockannouncement";

async function AnnouncementContent({ slug }: { slug: string }) {
  const [announcement, otherAnnouncements] = await Promise.all([
    getAnnouncement(slug),
    getOtherAnnouncements(slug),
  ]);

  if (!announcement) return <div>Announcement not found</div>;

  return (
    <div className="grid lg:grid-cols-[1fr,300px] gap-8">
      <article className="space-y-6">
        <h1 className="text-4xl font-bold">{announcement.title}</h1>
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="w-4 h-4 mr-2" />
          {new Date(announcement.date).toLocaleDateString()}
        </div>
        <div className="prose max-w-none">
          <p>{announcement.content}</p>
        </div>
        {announcement.images.length > 0 && (
          <div className="space-y-4">
            {announcement.images.map((image, index) => (
              <div key={index} className="relative h-[400px] w-full">
                <Image
                  src={image}
                  alt={`${announcement.title} - Image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        )}
      </article>

      <aside>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Other Announcements</h2>
            <div className="space-y-4">
              {otherAnnouncements.map((other) => (
                <Link
                  key={other.id}
                  href={`/announcements/${other.slug}`}
                  className="block"
                >
                  <h3 className="font-medium hover:text-primary transition-colors">
                    {other.title}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground mt-1">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    {new Date(other.date).toLocaleDateString()}
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}

export default function AnnouncementPage({
  params,
}: {
  params: { slug: string };
}) {
  return (
    <div className="container mx-auto py-8 px-4">
      <Suspense fallback={<AnnouncementSkeleton />}>
        <AnnouncementContent slug={params.slug} />
      </Suspense>
    </div>
  );
}

function AnnouncementSkeleton() {
  return (
    <div className="grid lg:grid-cols-[1fr,300px] gap-8">
      <div className="space-y-4 animate-pulse">
        <div className="h-8 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/4" />
        <div className="h-40 bg-muted rounded" />
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded" />
          <div className="h-4 bg-muted rounded" />
          <div className="h-4 bg-muted rounded w-3/4" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-8 bg-muted rounded" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-6 bg-muted rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
