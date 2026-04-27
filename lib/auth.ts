import { NextAuthOptions, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { configEnv } from "./config"; 

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

// =====================================================================
// KONFIGURASI NEXTAUTH
// =====================================================================
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Kredensial SIMANTAP",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // 1. Pengecekan Kredensial Admin
        const isAdminUser = credentials?.username === configEnv.ADMIN_USERNAME;
        const isAdminPassword = credentials?.password === configEnv.ADMIN_PASSWORD;

        if (isAdminUser && isAdminPassword) {
          return { id: "1", name: "Admin Bakorwil III", role: "admin" };
        }
        
        // 2. Pengecekan Kredensial Staff
        const isStaffUser = credentials?.username === configEnv.STAFF_USERNAME;
        const isStaffPassword = credentials?.password === configEnv.STAFF_PASSWORD;

        if (isStaffUser && isStaffPassword) {
          return { id: "2", name: "Staff PE", role: "staff" };
        }

        // Jika salah username atau password, tolak akses
        return null;
      }
    })
  ],
  session: { 
    strategy: "jwt", 
    maxAge: 4 * 60 * 60 // Sesi otomatis berakhir dalam 4 jam
  },
  pages: { 
    signIn: "/login" 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  secret: configEnv.NEXTAUTH_SECRET,
};