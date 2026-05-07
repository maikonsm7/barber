import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google"
import { AuthOptions } from "next-auth";
import prismaClient from "./prisma"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  session: {
    strategy: "database", // Importante quando se usa Adapter
  }
}