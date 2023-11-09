export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://trader-keys.vercel.app"
    : "http://localhost:3000";
