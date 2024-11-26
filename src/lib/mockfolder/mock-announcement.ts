import { Announcement, PaginatedAnnouncements } from "@/types/types";

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "New Terminal Wing Opening Soon",
    description:
      "Experience enhanced comfort and convenience with our upcoming terminal expansion project.",
    content: `Experience enhanced comfort and convenience with our upcoming terminal expansion project. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque tellus at libero posuere vestibulum. Donec rutrum mauris at erat scelerisque aliquam. Ut et pellentesque tellus. Sed sed dictum felis, at sollicitudin nisl. Quisque hendrerit ipsum quam, sed faucibus turpis tincidunt nec. 

    Duis in lectus id odio imperdiet malesuada. Praesent quis fermentum velit. Mauris vulputate, orci quis tincidunt imperdiet, lorem quam rutrum elit, in tempus tortor nunc malesuada risus.`,
    date: "2024-02-15",
    images: ["/placeholder.svg?height=400&width=600"],
    slug: "new-terminal-wing-opening",
  },
  {
    id: "2",
    title: "Digital Ticketing System Launch",
    description:
      "We're modernizing our booking process with a new digital ticketing system.",
    content:
      "We're modernizing our booking process with a new digital ticketing system. Lorem ipsum dolor sit amet...",
    date: "2024-02-10",
    images: [],
    slug: "digital-ticketing-launch",
  },
  {
    id: "3",
    title: "Holiday Schedule Updates",
    description:
      "Important updates to our service schedule during the upcoming holiday season.",
    content:
      "Important updates to our service schedule during the upcoming holiday season. Lorem ipsum dolor sit amet...",
    date: "2024-02-05",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ],
    slug: "holiday-schedule-updates",
  },
  // Add more mock announcements...
];

export async function getAnnouncements(
  page: number = 1,
  pageSize: number = 10
): Promise<PaginatedAnnouncements> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedData = announcements.slice(start, end);

  return {
    data: paginatedData,
    total: announcements.length,
    page,
    pageSize,
    totalPages: Math.ceil(announcements.length / pageSize),
  };
}

export async function getLatestAnnouncements(
  limit: number = 3
): Promise<Announcement[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return announcements.slice(0, limit);
}

export async function getAnnouncement(
  slug: string
): Promise<Announcement | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return announcements.find((a) => a.slug === slug) || null;
}

export async function getOtherAnnouncements(
  currentSlug: string,
  limit: number = 10
): Promise<Announcement[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return announcements.filter((a) => a.slug !== currentSlug).slice(0, limit);
}
