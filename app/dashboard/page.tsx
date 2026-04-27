// app/dashboard/page.tsx
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import Papa from "papaparse";
import NavCard from "@/components/dashboard/NavCard";
import HeroSlider from "@/components/dashboard/HeroSlider"; // <-- Import komponen baru
import * as Icons from "lucide-react"; 
import { LucideIcon } from "lucide-react";

// 1. Tambahkan BannerImage dan BannerTitle di Interface
interface SheetRow {
  MenuName: string;
  IconName: string;
  LinkForm?: string;
  LinkLampiran?: string;
  LinkHasil?: string;
  BannerImage?: string; // <-- Kolom baru di Sheet
  BannerTitle?: string; // <-- Kolom baru di Sheet
}

async function getNavigationData(): Promise<SheetRow[]> {
  const csvUrl = process.env.SHEET_CSV_URL; 
  
  if (!csvUrl) {
    console.error("⚠️ SHEET_CSV_URL belum diisi di file .env");
    return [];
  }

  try {
    const response = await fetch(csvUrl, { cache: 'no-store' });
    const csvText = await response.text();
    
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
  
  const session = await getServerSession(authOptions);
  const userRole = session?.user?.role || "staff";

  const bannerData = sheetData
    .filter(row => row.BannerImage && row.BannerImage.trim() !== "" && row.BannerImage !== "-")
    .map(row => ({
      imageUrl: row.BannerImage!,
      title: row.BannerTitle || "Kegiatan Bakorwil III Malang"
    }));

  const dynamicNavItems = sheetData.map((row) => {
    const iconKey = row.IconName as keyof typeof Icons;
    const IconComponent = (Icons[iconKey] as LucideIcon) || Icons.Folder; 
    
    const buttons: { label: string; url: string; type: "primary" | "outline" | "brand" }[] = [];

    // Logika tombol Canva dan Form biasa (Berlaku untuk Admin & Staff)
    if (row.IconName === "Image" && row.LinkForm && row.LinkForm !== "-") {
      buttons.push({ label: "Buka di Canva", url: row.LinkForm, type: "brand" });
    } else if (row.LinkForm && row.LinkForm !== "-") {
      buttons.push({ label: "Isi Form", url: row.LinkForm, type: "primary" });
    }
    
    // Logika Lampiran/SOP (Berlaku untuk Admin & Staff)
    if (row.LinkLampiran && row.LinkLampiran !== "-") {
      buttons.push({ label: "Lampiran", url: row.LinkLampiran, type: "outline" });
    }
    
    // 4. Logika Lihat Hasil (HANYA MUNCUL JIKA ROLE === ADMIN)
    if (row.LinkHasil && row.LinkHasil !== "-" && userRole === "admin") {
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
      {/* SECTION 1: HERO BANNER */}
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
          
          {/* 3. Panggil Komponen Slider di sini */}
          <div className="relative h-64 lg:h-auto min-h-64">
            <HeroSlider banners={bannerData} />
          </div>

        </div>
      </section>

      {/* SECTION 2: Grid Menu Utama */}
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