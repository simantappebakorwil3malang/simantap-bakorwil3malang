// lib/config.ts

const env = {
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  
  SM_FORM: process.env.LINK_SURAT_MASUK_FORM || "#",
  SM_LAMP: process.env.LINK_SURAT_MASUK_LAMP || "#",
  SM_HASIL: process.env.LINK_SURAT_MASUK_HASIL || "#",

  SK_FORM: process.env.LINK_SURAT_KELUAR_FORM || "#",
  SK_LAMP: process.env.LINK_SURAT_KELUAR_LAMP || "#",
  SK_HASIL: process.env.LINK_SURAT_KELUAR_HASIL || "#",

  BELANJA_HASIL: process.env.LINK_BELANJA_MASALAH_HASIL || "#",

  KEP_FORM: process.env.LINK_SK_FORM || "#",
  KEP_LAMP: process.env.LINK_SK_LAMP || "#",
  KEP_HASIL: process.env.LINK_SK_HASIL || "#",

  NOTULENSI_FORM: process.env.LINK_NOTULENSI_FORM || "#",
  NOTULENSI_LAMP: process.env.LINK_NOTULENSI_LAMP || "#",
  NOTULENSI_HASIL: process.env.LINK_NOTULENSI_HASIL || "#",

  CANVA: process.env.LINK_DOKUMENTASI_CANVA || "#",

  ANGGARAN_HASIL: process.env.LINK_ANGGARAN_HASIL || "#",

  SOP_FORM: process.env.LINK_SOP_FORM || "#",
  SOP_LAMP: process.env.LINK_SOP_LAMP || "#",
  SOP_HASIL: process.env.LINK_SOP_HASIL || "#",
};

if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD || !env.NEXTAUTH_SECRET) {
  throw new Error(
    "⚠️ CRITICAL ERROR: Kredensial admin di .env belum lengkap!"
  );
}

export const configEnv = {
  ADMIN_USERNAME: env.ADMIN_USERNAME as string,
  ADMIN_PASSWORD: env.ADMIN_PASSWORD as string,
  NEXTAUTH_SECRET: env.NEXTAUTH_SECRET as string,
  
  SURAT_MASUK: { FORM: env.SM_FORM, LAMP: env.SM_LAMP, HASIL: env.SM_HASIL },
  SURAT_KELUAR: { FORM: env.SK_FORM, LAMP: env.SK_LAMP, HASIL: env.SK_HASIL },
  BELANJA_MASALAH: { HASIL: env.BELANJA_HASIL },
  SURAT_KEPUTUSAN: { FORM: env.KEP_FORM, LAMP: env.KEP_LAMP, HASIL: env.KEP_HASIL },
  NOTULENSI: { FORM: env.NOTULENSI_FORM, LAMP: env.NOTULENSI_LAMP, HASIL: env.NOTULENSI_HASIL },
  DOKUMENTASI_CANVA: env.CANVA,
  PELAKSANAAN_ANGGARAN: { HASIL: env.ANGGARAN_HASIL },
  SOP: { FORM: env.SOP_FORM, LAMP: env.SOP_LAMP, HASIL: env.SOP_HASIL },
};