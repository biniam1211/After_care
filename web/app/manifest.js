export default function manifest() {
  return {
    name: "AfterCare",
    short_name: "AfterCare",
    description:
      "The AI life navigator built by foster kids, for foster kids. Money, housing, school, health — figured out, step by step.",
    start_url: "/app",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#06283d",
    theme_color: "#06283d",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
