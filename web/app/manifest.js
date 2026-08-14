// Makes the app installable to a phone's home screen straight from the
// browser — an icon, no address bar, no app store, no $99 developer account.
// For a youth who cannot or will not install from a store, this is the whole
// distribution story.

export default function manifest() {
  return {
    name: "AfterCare — The missing parent in your pocket",
    short_name: "AfterCare",
    description:
      "The AI life navigator built by foster kids, for foster kids. Money, housing, school, health and paperwork — figured out step by step.",
    // Installing lands on the product, not the marketing page.
    start_url: "/app",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#06283d",
    theme_color: "#06283d",
    categories: ["education", "lifestyle", "social"],
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
