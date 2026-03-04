// app/dashboard/page.tsx
import { 
  Inbox, 
  Send, 
  AlertCircle, 
  FileSignature, 
  BookOpen, 
  Image as ImageIcon, 
  PieChart, 
  Info 
} from "lucide-react";
import NavCard from "@/components/dashboard/NavCard";
import { configEnv } from "@/lib/config";

const navItems = [
  { 
    title: "Surat Masuk", 
    icon: Inbox, 
    buttons: [
      { label: "Isi Form", url: configEnv.SURAT_MASUK.FORM, type: "primary" as const }, 
      { label: "Lampiran", url: configEnv.SURAT_MASUK.LAMP, type: "outline" as const }, 
      { label: "Lihat Hasil", url: configEnv.SURAT_MASUK.HASIL, type: "outline" as const }
    ] 
  },
  { 
    title: "Surat Keluar", 
    icon: Send, 
    buttons: [
      { label: "Isi Form", url: configEnv.SURAT_KELUAR.FORM, type: "primary" as const }, 
      { label: "Lampiran", url: configEnv.SURAT_KELUAR.LAMP, type: "outline" as const }, 
      { label: "Lihat Hasil", url: configEnv.SURAT_KELUAR.HASIL, type: "outline" as const }
    ] 
  },
  { 
    title: "Belanja Masalah", 
    icon: AlertCircle, 
    buttons: [
      { label: "Lihat Hasil (Spreadsheet)", url: configEnv.BELANJA_MASALAH.HASIL, type: "primary" as const }
    ] 
  },
  { 
    title: "Surat Keputusan (SK)", 
    icon: FileSignature, 
    buttons: [
      { label: "Isi Form", url: configEnv.SURAT_KEPUTUSAN.FORM, type: "primary" as const }, 
      { label: "Lampiran", url: configEnv.SURAT_KEPUTUSAN.LAMP, type: "outline" as const }, 
      { label: "Lihat Hasil", url: configEnv.SURAT_KEPUTUSAN.HASIL, type: "outline" as const }
    ] 
  },
  { 
    title: "Notulensi Kegiatan", 
    icon: BookOpen, 
    buttons: [
      { label: "Isi Form", url: configEnv.NOTULENSI.FORM, type: "primary" as const }, 
      { label: "Lampiran", url: configEnv.NOTULENSI.LAMP, type: "outline" as const }, 
      { label: "Lihat Hasil", url: configEnv.NOTULENSI.HASIL, type: "outline" as const }
    ] 
  },
  { 
    title: "Dokumentasi Kegiatan", 
    icon: ImageIcon, 
    buttons: [
      { label: "Buka di Canva", url: configEnv.DOKUMENTASI_CANVA, type: "brand" as const }
    ] 
  },
  { 
    title: "Pelaksanaan Anggaran", 
    icon: PieChart, 
    buttons: [
      { label: "Lihat Hasil (Spreadsheet)", url: configEnv.PELAKSANAAN_ANGGARAN.HASIL, type: "primary" as const }
    ] 
  },
  { 
    title: "SOP", 
    icon: Info, 
    buttons: [
      { label: "Isi Form", url: configEnv.SOP.FORM, type: "primary" as const }, 
      { label: "Lampiran", url: configEnv.SOP.LAMP, type: "outline" as const }, 
      { label: "Lihat Hasil", url: configEnv.SOP.HASIL, type: "outline" as const }
    ] 
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <section className="bg-card text-card-foreground p-6 md:p-8 rounded-xl border border-border shadow-sm transition-colors duration-300">
        <div className="w-full">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Portal Navigasi Arsip Terpadu
          </h2>
          <p className="text-muted-foreground text-base md:text-lg">
            Selamat datang di sistem manajemen arsip internal Bakorwil III Malang. Silakan gunakan menu di bawah ini untuk mengakses form, lampiran, dan rekapitulasi data dengan cepat dan aman.
          </p>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {navItems.map((item, index) => (
            <NavCard 
              key={index}
              title={item.title}
              icon={item.icon}
              buttons={item.buttons}
            />
          ))}
        </div>
      </section>
    </div>
  );
}