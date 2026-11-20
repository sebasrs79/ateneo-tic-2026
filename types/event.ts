export interface EventCoordinates {
  lat: number;
  lng: number;
}

export interface EventDetails {
  title: string;
  edition: string;
  cohort: string;
  organizer: string;
  institution: string;
  locationCity: string;
  locationVenue: string;
  dateIso: string;
  dateDisplay: string;
  timeDisplay: string;
  landingUrl: string;
  mapsUrl: string;
  coordinates: EventCoordinates;
  whatsappShareMessage: string;
}

export interface StatItem {
  value: string;
  label: string;
  detail: string;
}

export interface PillarItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export interface ScheduleItem {
  id: string;
  time: string;
  timeIso: string;
  title: string;
  description: string;
  icon: string;
  badge: string;
}

export interface CarouselItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  tag: string;
}

export interface MetaData {
  siteUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterCard: string;
  themeColor: string;
}

export interface AteneoData {
  event: EventDetails;
  stats: StatItem[];
  pillars: PillarItem[];
  schedule: ScheduleItem[];
  carousel: CarouselItem[];
  metadata: MetaData;
}
