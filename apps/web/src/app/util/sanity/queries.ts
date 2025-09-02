import { groq } from "next-sanity";

export const eventsQuery = groq`
  *[_type == "event"]{
    title,
    startDate,
    bandCurfew,
    barCloses,
    endDate,
    eventDescription,
    colorCode,
    "displayColor": displayColor.hex
  }
`;

export interface SanityEvent {
  title: string;
  startDate: string;
  bandCurfew?: string;
  barCloses?: string;
  endDate: string;
  eventDescription?: string;
  colorCode: string;
  displayColor?: string;
}

// Color mapping for event types
export const eventColorMap: Record<string, string> = {
  'IA': '#8B5CF6', // Purple - Interne arrangement
  'DJ': '#F59E0B', // Amber - DJ-arrangement
  'IF': '#10B981', // Emerald - Internfest
  'K': '#EF4444', // Red - Konsert
  'M': '#3B82F6', // Blue - Mattisøkt
  'S': '#6B7280', // Gray - Styremøter
  'U': '#9CA3AF', // Light Gray - Ubekreftet
};

export const eventTypeNames: Record<string, string> = {
  'IA': 'Interne arrangement',
  'DJ': 'DJ-arrangement',
  'IF': 'Internfest',
  'K': 'Konsert',
  'M': 'Mattisøkt',
  'S': 'Styremøter',
  'U': 'Ubekreftet',
};