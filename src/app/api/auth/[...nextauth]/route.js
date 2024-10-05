import NextAuth from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

// Exporting POST handler for NextAuth
export async function POST(req, res) {
  return NextAuth(authOptions)(req, res);
}
