export const metadata = {
  // The root layout appends " · AfterCare", so this is just the page name —
  // otherwise the tab reads "AfterCare — Open the app · AfterCare".
  title: "Open the app",
  description:
    "Money, housing, school, health, paperwork — figured out step by step, free, with no judgment.",
};

export default function AppLayout({ children }) {
  return children;
}
