// app/dashboard/page.tsx
import Image from "next/image";
import Papa from "papaparse";
import NavCard from "@/components/dashboard/NavCard";
import * as Icons from "lucide-react"; 
import { LucideIcon } from "lucide-react";

interface SheetRow {
  MenuName: string;
  IconName: string;
  LinkForm?: string;
  LinkLampiran?: string;
  LinkHasil?: string;
}

// Fungsi untuk menarik data dari Google Sheets CSV
async function getNavigationData(): Promise<SheetRow[]> {
  // 2. Mengambil link dari .env (Server-side)
  const csvUrl = process.env.SHEET_CSV_URL; 
  
  if (!csvUrl) {
    console.error("⚠️ SHEET_CSV_URL belum diisi di file .env");
    return [];
  }

  try {
    const response = await fetch(csvUrl, { cache: 'no-store' });
    const csvText = await response.text();
    
    // 3. Memberikan tipe SheetRow ke PapaParse agar outputnya terstruktur
    const parsed = Papa.parse<SheetRow>(csvText, {
      header: true,      
      skipEmptyLines: true,
    });

    return parsed.data;
  } catch (error) {
    console.error("Gagal mengambil data CSV:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const sheetData = await getNavigationData();

  const dynamicNavItems = sheetData.map((row) => {
    const iconKey = row.IconName as keyof typeof Icons;
    const IconComponent = (Icons[iconKey] as LucideIcon) || Icons.Folder; 
    
    const buttons: { label: string; url: string; type: "primary" | "outline" | "brand" }[] = [];

    if (row.IconName === "Image" && row.LinkForm && row.LinkForm !== "-") {
      // Khusus untuk Canva
      buttons.push({ label: "Buka di Canva", url: row.LinkForm, type: "brand" });
    } else if (row.LinkForm && row.LinkForm !== "-") {
      // Logika normal untuk Form yang lain
      buttons.push({ label: "Isi Form", url: row.LinkForm, type: "primary" });
    }
    
    if (row.LinkLampiran && row.LinkLampiran !== "-") {
      buttons.push({ label: "Lampiran", url: row.LinkLampiran, type: "outline" });
    }
    
    if (row.LinkHasil && row.LinkHasil !== "-") {
      buttons.push({ label: "Lihat Hasil", url: row.LinkHasil, type: "outline" });
    }

    return {
      title: row.MenuName || "Menu Baru",
      icon: IconComponent,
      buttons: buttons,
    };
  });

  return (
    <div className="space-y-8">
      {/* SECTION 1: HERO BANNER (Sambutan & Foto Kegiatan) */}
      <section className="bg-card text-card-foreground rounded-2xl border border-border shadow-sm overflow-hidden transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="p-8 md:p-10 flex flex-col justify-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
              Portal Navigasi SIMANTAP <br/>
              <span className="text-primary text-xl md:text-2xl">PE BAKORWIL MALANG</span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed text-justify">
              Selamat datang di SIMANTAP – Sistem Informasi Manajemen Administrasi Terpadu Bakorwil III Malang Bidang Pembangunan Ekonomi. Sistem ini dirancang untuk mendukung pengelolaan administrasi, monitoring anggaran, dokumentasi kegiatan, serta belanja masalah secara terintegrasi, transparan, dan akuntabel.
            </p>
          </div>
          
          <div className="relative h-64 lg:h-auto bg-slate-200">
            <Image 
              src="/pasar-murah.jpg" 
              alt="Kegiatan Pasar Murah Bakorwil III Malang"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linier-to-t from-black/60 to-transparent flex items-end p-6">
              <span className="text-white font-medium text-sm md:text-base drop-shadow-md">
                Kegiatan Pasar Murah Bidang Pembangunan Ekonomi
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Grid Menu Utama (Data dari Google Sheets) */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {dynamicNavItems.map((item, index) => (
            <NavCard 
              key={index}
              title={item.title}
              icon={item.icon}
              buttons={item.buttons}
            />
          ))}
          
          {/* Fallback jika Google Sheets kosong atau gagal dimuat */}
          {dynamicNavItems.length === 0 && (
            <div className="col-span-full text-center p-8 border border-dashed rounded-xl text-muted-foreground flex flex-col items-center gap-2">
              <Icons.FileWarning className="w-8 h-8 text-muted-foreground/50" />
              <p>Belum ada data menu atau link CSV belum dikonfigurasi.</p>
              <p className="text-sm">Silakan tambahkan baris baru di Google Sheets Anda.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}