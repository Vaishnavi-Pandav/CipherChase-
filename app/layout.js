import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://upsurge-cipherchase.vercel.app/"),

  title: {
    default: "CipherChase – Upsurge 2K26 Crime Hunt",
    template: "%s | CipherChase",
  },

  description:
    "CipherChase is a crime-themed QR evidence trail game for Upsurge 2K26. Scan clues, crack the case, and race to the top of the Most Wanted leaderboard!",

  keywords: [
    "CipherChase",
    "Upsurge 2K26",
    "crime treasure hunt",
    "QR evidence hunt",
    "mystery game",
    "crime scene event",
    "treasure hunt",
  ],

  authors: [{ name: "Vaishnavi Pandav" }],
  creator: "Vaishnavi Pandav",
  icons: {
    icon: "/CipherChase.jpg",
    apple: "/CipherChase.jpg",
  },

  openGraph: {
    title: "CipherChase – Upsurge 2K26 Crime Hunt",
    description:
      "Follow the evidence. Crack the case. Win the prize. Join CipherChase — a crime-themed QR evidence hunt at Upsurge 2K26!",
    url: "https://upsurge-cipherchase.vercel.app/",
    siteName: "CipherChase",
    images: [
      {
        url: "/CipherChase.jpg",
        width: 1200,
        height: 630,
        alt: "CipherChase Cybersecurity Treasure Hunt Banner",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "CipherChase – Upsurge 2K26 Crime Hunt",
    description:
      "Hunt. Decode. Survive. Join CipherChase — a crime-scene QR evidence hunt at Upsurge 2K26!",
    images: ["/CipherChase.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0008",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
