import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

export default async function CalendarPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1>You are not authorized. Please <a href="/login" className="text-blue-500 underline">login</a>.</h1>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold">helloworld</h1>
    </div>
  );
}
