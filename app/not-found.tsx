// app/not-found.tsx
import Link from "next/link";
import { FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4 text-center">
      <div className="bg-blue-100 p-4 rounded-full mb-6">
        <FileQuestion className="w-12 h-12 text-blue-700" />
      </div>
      <h1 className="text-4xl font-bold text-slate-900 mb-2">404</h1>
      <h2 className="text-2xl font-semibold text-slate-800 mb-4">Halaman Tidak Ditemukan</h2>
      <p className="text-slate-500 max-w-md mb-8">
        Maaf, tautan atau halaman yang Anda cari tidak tersedia di Sistem Navigasi Arsip Bakorwil III Malang.
      </p>
      <Link href="/dashboard">
        <Button className="bg-blue-700 hover:bg-blue-800 text-white min-h-11 px-8">
          Kembali ke Dashboard
        </Button>
      </Link>
    </div>
  );
}