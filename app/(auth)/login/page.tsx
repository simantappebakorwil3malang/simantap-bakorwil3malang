"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Lock, ShieldAlert } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false, 
      });

      if (res?.error) {
        setError("Username atau password salah.");
        setIsLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch {
      setError("Terjadi kesalahan pada sistem. Coba lagi.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 sm:p-8">
      <Card className="w-full max-w-md shadow-xl border-border animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="bg-primary/10 p-4 rounded-full">
              <Lock className="w-7 h-7 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Login Admin
          </CardTitle>
          <CardDescription className="text-base">
              Sistem Informasi Manajemen Administrasi Terpadu
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {error && (
              // Menggunakan warna destructive bawaan Shadcn untuk error box
              <div className="p-3.5 bg-destructive/10 border border-destructive/20 rounded-md flex items-center text-destructive text-sm font-medium">
                <ShieldAlert className="w-4 h-4 mr-2 shrink-0" />
                {error}
              </div>
            )}

            <div className="space-y-2.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                disabled={isLoading}
                className="h-11 focus-visible:ring-primary transition-shadow"
              />
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
                className="h-11 focus-visible:ring-primary transition-shadow"
              />
            </div>
          </CardContent>

          <CardFooter className="py-6">
            <Button
              type="submit"
              className="w-full h-11 text-base font-medium shadow-md hover:shadow-lg transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Memverifikasi..." : "Masuk ke Dashboard"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}