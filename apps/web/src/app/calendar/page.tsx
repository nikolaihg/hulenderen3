import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { sanityClient } from "../lib/sanity";
import Calendar, { CalendarEvent } from "../components/Calendar";
import Link from 'next/link';
import { eventsQuery, SanityEvent, eventColorMap } from "../util/sanity/queries";

export default async function CalendarPage() {
  const session = await getServerSession(authOptions);
 
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1>You are not authorized. Please
          <Link href="/" className="text-blue-500 underline">login</Link>.
        </h1>
      </div>
    );
  }

  const sanityEvents: SanityEvent[] = await sanityClient.fetch(eventsQuery);
 
  const events: CalendarEvent[] = sanityEvents.map((e: SanityEvent) => ({
    id: e.title + e.startDate, // Simple ID generation
    title: e.title,
    start: new Date(e.startDate),
    end: new Date(e.endDate),
    bandCurfew: e.bandCurfew ? new Date(e.bandCurfew) : undefined,
    barCloses: e.barCloses ? new Date(e.barCloses) : undefined,
    eventDescription: e.eventDescription,
    colorCode: e.colorCode,
    color: e.displayColor || eventColorMap[e.colorCode] || '#3174ad',
  }));

  return (
    <div>
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold mb-4">Event Calendar</h1>
        <div className="flex flex-wrap gap-2">
          {Object.entries(eventColorMap).map(([code, color]) => (
            <div key={code} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: color }}
              />
              <span className="text-sm">[{code}]</span>
            </div>
          ))}
        </div>
      </div>
      <Calendar events={events} />
    </div>
  );
}