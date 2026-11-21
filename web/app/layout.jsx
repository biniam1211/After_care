import { Archivo, Bricolage_Grotesque, Fraunces, Plus_Jakarta_Sans } from "next/font/google";
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

// Org site: Fraunces (soft editorial serif) + Archivo (strong grotesk).
// Product /app keeps Bricolage + Jakarta via its own CSS variables.
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-archivo",
  display: "swap",
});

// Prefer APP_URL in every deploy. Fallback keeps metadataBase valid when unset.
const SITE_URL = process.env.APP_URL || "http://localhost:3000";

const DESCRIPTION =
  "The AI life navigator built by foster kids, for foster kids. Driver's license help, money, housing, school, health and paperwork — figured out step by step. Free forever.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "AfterCare — Built by foster kids, for foster kids",
    template: "%s · AfterCare",
  },
  description: DESCRIPTION,
  applicationName: "AfterCare",
  keywords: [
    "foster youth",
    "aging out of foster care",
    "former foster youth resources",
    "foster youth driver's license California",
    "Chafee Grant",
    "AB 12 extended foster care",
    "foster care California",
    "Biniam Efrem",
  ],
  // The link travels by text message and DM far more than by search, so the
  // share card matters more than the keywords do.
  openGraph: {
    type: "website",
    siteName: "AfterCare",
    title: "AfterCare — Built by foster kids, for foster kids",
    description: DESCRIPTION,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AfterCare — Built by foster kids, for foster kids",
    description: DESCRIPTION,
  },
  robots: { index: true, follow: true },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "AfterCare",
    statusBarStyle: "black-translucent",
  },
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
  // Product /app + PWA still use harbor navy; org pages set ink via CSS.
  themeColor: "#06283d",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${jakarta.variable} ${fraunces.variable} ${archivo.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
