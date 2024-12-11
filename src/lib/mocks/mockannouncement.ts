import { Announcement, PaginatedAnnouncements } from "@/types/mocktypes";

export const announcements: Announcement[] = [
  {
    id: "1",
    title: "New Terminal Wing Opening Soon",
    description:
      "Experience enhanced comfort and convenience with our upcoming terminal expansion project.",
    content: `Experience enhanced comfort and convenience with our upcoming terminal expansion project. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean scelerisque tellus at libero posuere vestibulum. Donec rutrum mauris at erat scelerisque aliquam. Ut et pellentesque tellus. Sed sed dictum felis, at sollicitudin nisl. Quisque hendrerit ipsum quam, sed faucibus turpis tincidunt nec. 

    Duis in lectus id odio imperdiet malesuada. Praesent quis fermentum velit. Mauris vulputate, orci quis tincidunt imperdiet, lorem quam rutrum elit, in tempus tortor nunc malesuada risus.`,
    date: "2024-02-15",
    images: ["/images/placeholder.png"],
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
      "/images/placeholder.png",
      "/images/placeholder.png",
    ],
    slug: "holiday-schedule-updates",
  },
  {
    id: "4",
    title: "New Safety Protocols Implementation",
    description: "Enhanced safety measures being implemented across all terminals.",
    content: "We are implementing new safety protocols across all our terminals to ensure passenger well-being. Lorem ipsum dolor sit amet...",
    date: "2024-01-30",
    images: ["/images/placeholder.png"],
    slug: "safety-protocols-implementation",
  },
  {
    id: "5",
    title: "Transportation Fleet Expansion",
    description: "Adding 50 new vehicles to our transportation fleet.",
    content: `We're excited to announce the addition of 50 new vehicles to our transportation fleet. This expansion will significantly improve our service capacity and reduce waiting times. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
    date: "2024-01-25",
    images: [
      "/images/placeholder.png",
      "/images/placeholder.png",
      "/images/placeholder.png",
    ],
    slug: "fleet-expansion-2024",
  },
  {
    id: "6",
    title: "Mobile App Update Available",
    description: "New features and improvements in our mobile application.",
    content: "Download the latest version of our mobile app to access new features including real-time tracking and digital payments.",
    date: "2024-01-20",
    images: [],
    slug: "mobile-app-update-2024",
  },
  {
    id: "7",
    title: "Annual Maintenance Schedule",
    description: "Upcoming maintenance works across various terminals.",
    content: "View our comprehensive maintenance schedule for 2024. Please plan your travels accordingly.",
    date: "2024-01-15",
    images: ["/images/placeholder.png"],
    slug: "annual-maintenance-2024",
  },
  {
    id: "8",
    title: "Customer Service Enhancement Program",
    description: "New initiatives to improve passenger experience.",
    content: "We're launching several new customer service initiatives aimed at enhancing your travel experience.",
    date: "2024-01-10",
    images: [
      "/images/placeholder.png",
      "/images/placeholder.png",
    ],
    slug: "customer-service-enhancement",
  },
  {
    id: "9",
    title: "Green Initiative Launch",
    description: "New environmental sustainability program across all terminals.",
    content: `We're proud to announce our new environmental sustainability program. This initiative includes solar panel installations, waste reduction measures, and the introduction of electric vehicles in our ground operations. Together, we can make a difference for our planet.`,
    date: "2024-01-05",
    images: [
      "/images/placeholder.png",
      "/images/placeholder.png",
    ],
    slug: "green-initiative-2024",
  },
  {
    id: "10",
    title: "Wi-Fi Service Upgrade",
    description: "Enhanced connectivity throughout terminal buildings.",
    content: "We've upgraded our Wi-Fi infrastructure to provide faster and more reliable internet access across all terminal areas.",
    date: "2023-12-28",
    images: ["/images/placeholder.png"],
    slug: "wifi-upgrade-announcement",
  },
  {
    id: "11",
    title: "New Food Court Opening",
    description: "Exciting new dining options coming to Terminal 3.",
    content: "Discover a world of flavors at our new food court, featuring local and international cuisine options to enhance your travel experience.",
    date: "2023-12-20",
    images: [
      "/images/placeholder.png",
      "/images/placeholder.png",
      "/images/placeholder.png",
    ],
    slug: "new-food-court-opening",
  },
  {
    id: "12",
    title: "Lost & Found System Update",
    description: "Improved digital system for lost item recovery.",
    content: "We're implementing a new digital system for lost and found items, making it easier to report and recover lost belongings.",
    date: "2023-12-15",
    images: [],
    slug: "lost-found-system-update",
  },
  {
    id: "13",
    title: "Special Holiday Services",
    description: "Extended operating hours during the festive season.",
    content: `To accommodate increased holiday travel, we're extending our operating hours and adding extra services. Check our holiday schedule for detailed information.`,
    date: "2023-12-10",
    images: ["/images/placeholder.png"],
    slug: "holiday-services-2023",
  },
  {
    id: "14",
    title: "Accessibility Improvements",
    description: "New facilities for passengers with special needs.",
    content: "We're introducing new accessibility features and services to ensure comfortable travel for all passengers.",
    date: "2023-12-05",
    images: [
      "/images/placeholder.png",
      "/images/placeholder.png",
    ],
    slug: "accessibility-improvements",
  },
  {
    id: "15",
    title: "New Lounge Opening",
    description: "Exclusive lounge for premium passengers.",
    content: "We're opening a new lounge for our premium passengers, offering luxurious amenities and services.",
    date: "2023-12-01",
    images: ["/images/placeholder.png"],
    slug: "new-lounge-opening",
  },
  {
    id: "16",
    title: "Baggage Handling System Upgrade",
    description: "Improved efficiency in baggage handling.",
    content: "Our new baggage handling system will enhance efficiency and reduce waiting times for baggage claim.",
    date: "2023-11-25",
    images: [],
    slug: "baggage-handling-upgrade",
  },
  {
    id: "17",
    title: "New Art Installation",
    description: "Local artists' work displayed in Terminal 2.",
    content: "Enjoy the new art installation featuring works by local artists in Terminal 2.",
    date: "2023-11-20",
    images: [
      "/images/placeholder.png",
      "/images/placeholder.png",
    ],
    slug: "new-art-installation",
  },
  {
    id: "18",
    title: "Flight Information Display System Update",
    description: "Upgraded displays for real-time flight information.",
    content: "We've upgraded our flight information display system to provide real-time updates and improved visibility.",
    date: "2023-11-15",
    images: ["/images/placeholder.png"],
    slug: "flight-info-display-update",
  },
  {
    id: "19",
    title: "New Parking Facilities",
    description: "Expanded parking options for passengers.",
    content: "We're expanding our parking facilities to provide more options and convenience for passengers.",
    date: "2023-11-10",
    images: [],
    slug: "new-parking-facilities",
  },
  {
    id: "20",
    title: "Terminal Renovation Project",
    description: "Major renovations to enhance passenger experience.",
    content: "Our terminal renovation project will bring modern amenities and improved facilities for a better passenger experience.",
    date: "2023-11-05",
    images: [
      "/images/placeholder.png",
      "/images/placeholder.png",
    ],
    slug: "terminal-renovation-project",
  },
  {
    id: "21",
    title: "New Retail Stores Opening",
    description: "Exciting new shopping options in Terminal 1.",
    content: "Discover a variety of new retail stores opening in Terminal 1, offering a range of products and services.",
    date: "2023-11-01",
    images: ["/images/placeholder.png"],
    slug: "new-retail-stores-opening",
  },
  {
    id: "22",
    title: "Enhanced Security Measures",
    description: "New security protocols for passenger safety.",
    content: "We're implementing enhanced security measures to ensure the safety and security of all passengers.",
    date: "2023-10-25",
    images: [],
    slug: "enhanced-security-measures",
  },
  {
    id: "23",
    title: "New Check-In Kiosks",
    description: "Self-service check-in kiosks for faster processing.",
    content: "Our new self-service check-in kiosks will streamline the check-in process and reduce wait times.",
    date: "2023-10-20",
    images: [
      "/images/placeholder.png",
      "/images/placeholder.png",
    ],
    slug: "new-check-in-kiosks",
  },
  {
    id: "24",
    title: "New Airline Partnership",
    description: "Partnership with a new international airline.",
    content: "We're excited to announce a new partnership with an international airline, offering more destinations and services.",
    date: "2023-10-15",
    images: ["/images/placeholder.png"],
    slug: "new-airline-partnership",
  },
  {
    id: "25",
    title: "New VIP Services",
    description: "Exclusive services for VIP passengers.",
    content: "We're introducing new VIP services, including private lounges and dedicated check-in counters.",
    date: "2023-10-10",
    images: [],
    slug: "new-vip-services",
  },
  {
    id: "26",
    title: "New Terminal Shuttle Service",
    description: "Convenient shuttle service between terminals.",
    content: "Our new terminal shuttle service provides convenient transportation between terminals for passengers.",
    date: "2023-10-05",
    images: [
      "/images/placeholder.png",
      "/images/placeholder.png",
    ],
    slug: "new-terminal-shuttle-service",
  },
  {
    id: "27",
    title: "New Pet Relief Areas",
    description: "Designated areas for pets in terminals.",
    content: "We're introducing new pet relief areas in our terminals to accommodate passengers traveling with pets.",
    date: "2023-10-01",
    images: ["/images/placeholder.png"],
    slug: "new-pet-relief-areas",
  },
  {
    id: "28",
    title: "New Charging Stations",
    description: "Additional charging stations for electronic devices.",
    content: "We've installed new charging stations throughout our terminals to keep your devices powered up.",
    date: "2023-09-25",
    images: [],
    slug: "new-charging-stations",
  },
  {
    id: "29",
    title: "New Children's Play Area",
    description: "Fun and safe play area for children.",
    content: "Our new children's play area provides a fun and safe environment for kids to enjoy while waiting for flights.",
    date: "2023-09-20",
    images: [
      "/images/placeholder.png",
      "/images/placeholder.png",
    ],
    slug: "new-childrens-play-area",
  },
  {
    id: "30",
    title: "New Fitness Center",
    description: "Fitness center for passengers to stay active.",
    content: "Stay active while traveling with our new fitness center, equipped with modern exercise equipment.",
    date: "2023-09-15",
    images: ["/images/placeholder.png"],
    slug: "new-fitness-center",
  },
  {
    id: "31",
    title: "New Spa Services",
    description: "Relaxing spa services available in Terminal 2.",
    content: "Unwind with our new spa services, offering massages, facials, and other relaxing treatments.",
    date: "2023-09-10",
    images: [],
    slug: "new-spa-services",
  },
  {
    id: "32",
    title: "New Business Center",
    description: "Business center with workstations and meeting rooms.",
    content: "Our new business center provides workstations, meeting rooms, and other amenities for business travelers.",
    date: "2023-09-05",
    images: [
      "/images/placeholder.png",
      "/images/placeholder.png",
    ],
    slug: "new-business-center",
  },
  {
    id: "33",
    title: "New Medical Clinic",
    description: "On-site medical clinic for passenger health needs.",
    content: "Our new on-site medical clinic provides healthcare services for passengers in need.",
    date: "2023-09-01",
    images: ["/images/placeholder.png"],
    slug: "new-medical-clinic",
  },
  {
    id: "34",
    title: "New Car Rental Services",
    description: "Expanded car rental options for passengers.",
    content: "We've expanded our car rental services to offer more options and convenience for passengers.",
    date: "2023-08-25",
    images: [],
    slug: "new-car-rental-services",
  }
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
