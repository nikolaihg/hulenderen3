import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { sanityClient } from "../lib/sanity"; 
import Calendar from "../components/Calendar";


export default async function CalendarPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1>You are not authorized. Please <a href="/login" className="text-blue-500 underline">login</a>.</h1>
      </div>
    );
  }

  const query = `*[_type == "event"]{
    title,
    startDate,
    endDate
  }`;

  const sanityEvents = await sanityClient.fetch(query);

  const events = sanityEvents.map((e: any) => ({
    title: e.title,
    start: new Date(e.startDate),
    end: new Date(e.endDate),
  }));

  return <Calendar events={events} />;
}
