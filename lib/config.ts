// lib/config.ts

const env = {
  ADMIN_USERNAME: process.env.ADMIN_USERNAME,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,
  STAFF_USERNAME: process.env.STAFF_USERNAME,
  STAFF_PASSWORD: process.env.STAFF_PASSWORD,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
};

// Pastikan SEMUA kredensial wajib sudah terisi, baik untuk Admin maupun Staff
if (
  !env.ADMIN_USERNAME || 
  !env.ADMIN_PASSWORD || 
  !env.STAFF_USERNAME || 
  !env.STAFF_PASSWORD || 
  !env.NEXTAUTH_SECRET
) {
  throw new Error(
    "⚠️ CRITICAL ERROR: Kredensial Admin/Staff atau NEXTAUTH_SECRET di file .env belum lengkap!"
  );
}

export const configEnv = {
  ADMIN_USERNAME: env.ADMIN_USERNAME as string,
  ADMIN_PASSWORD: env.ADMIN_PASSWORD as string,
  STAFF_USERNAME: env.STAFF_USERNAME as string,
  STAFF_PASSWORD: env.STAFF_PASSWORD as string,
  NEXTAUTH_SECRET: env.NEXTAUTH_SECRET as string,
};