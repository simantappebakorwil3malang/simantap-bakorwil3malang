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
      name: "Kredensial Admin",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const isValidUser = credentials?.username === configEnv.ADMIN_USERNAME;
        const isValidPassword = credentials?.password === configEnv.ADMIN_PASSWORD;

        if (isValidUser && isValidPassword) {
          return { id: "1", name: "Admin Bakorwil III", role: "admin" };
        }
        
        return null;
      }
    })
  ],
  session: { 
    strategy: "jwt", 
    maxAge: 4 * 60 * 60 
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