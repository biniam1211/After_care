const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://aftercare.vercel.app";

export default function sitemap() {
  const now = new Date();
  const routes = ["", "/what-we-do", "/features", "/resources", "/approach", "/about", "/get-involved", "/partners", "/get-help", "/stories", "/careers", "/faq", "/contact", "/privacy", "/terms", "/app"];
  return routes.map((path) => ({
    url: `${SITE}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/app" ? 0.9 : 0.6,
  }));
}
