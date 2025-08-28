import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Password",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (credentials?.password === process.env.NEXTAUTH_PASSWORD) {
          return { id: "1", name: "Admin" };
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
