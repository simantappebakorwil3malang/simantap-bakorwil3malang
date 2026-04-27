import NextAuth, { NextAuthOptions, DefaultSession, DefaultUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// ==========================================
// 1. MODULE AUGMENTATION YANG BENAR
// ==========================================
declare module "next-auth" {
  // Menggabungkan tipe User bawaan dengan tambahan 'role'
  interface User extends DefaultUser {
    role: string;
  }

  // Menggabungkan tipe Session bawaan dengan tambahan 'role' di dalam 'user'
  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
  }
}

// ==========================================
// 2. KONFIGURASI NEXTAUTH
// ==========================================
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Cek apakah yang login adalah Admin
        if (
          credentials?.username === process.env.ADMIN_USERNAME &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          return { id: "1", name: "Administrator", role: "admin" };
        }
        
        // Cek apakah yang login adalah Staff
        if (
          credentials?.username === process.env.STAFF_USERNAME &&
          credentials?.password === process.env.STAFF_PASSWORD
        ) {
          return { id: "2", name: "Staff PE", role: "staff" };
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role; 
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };