import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-bricolage",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "AfterCare — The missing parent in your pocket",
  description:
    "The AI life navigator built by foster kids, for foster kids. Money, housing, school, health — figured out, step by step.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // Pinch-zoom stays enabled on purpose. Locking it out is a common app-like
  // touch, but it breaks zoom for low-vision users (WCAG 1.4.4) and this app
  // is read by youth in stressful moments who may need to enlarge a phone
  // number or an address.
  userScalable: true,
  // Draw under the notch / home indicator so the app can fill the screen.
  viewportFit: "cover",
  themeColor: "#06283d",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${bricolage.variable} ${jakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
