import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { sanityClient } from "../lib/sanity";
import Calendar from "../components/Calendar";
import Link from 'next/link';

interface SanityEvent {
  title: string;
  startDate: string;
  endDate: string;
}

export default async function CalendarPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1>You are not authorized. Please <Link href="/" className="text-blue-500 underline">login</Link>.</h1>
      </div>
    );
  }

  const query = `*[_type == "event"]{
    title,
    startDate,
    endDate
  }`;

  const sanityEvents: SanityEvent[] = await sanityClient.fetch(query);
  
  const events = sanityEvents.map((e: SanityEvent) => ({
    title: e.title,
    start: new Date(e.startDate),
    end: new Date(e.endDate),
  }));

  return <Calendar events={events} />;
}