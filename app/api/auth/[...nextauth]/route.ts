import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

// Inisialisasi handler NextAuth
const handler = NextAuth(authOptions);

// Export sebagai GET dan POST untuk App Router
export { handler as GET, handler as POST };