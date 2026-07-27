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
    default: "CipherChase – Cybersecurity Treasure Hunt",
    template: "%s | CipherChase",
  },

  description:
    "CipherChase is a thrilling cybersecurity-themed QR treasure hunt. Crack the codes, solve puzzles, and race to the top of the leaderboard!",

  keywords: [
    "CipherChase",
    "cybersecurity treasure hunt",
    "QR hacking game",
    "code breaking competition",
    "cyber security event",
    "treasure hunt",
  ],

  authors: [{ name: "Rishabh Gokhe" }],
  creator: "Rishabh Gokhe",
  icons: {
    icon: "/CipherChase.jpg",
    apple: "/CipherChase.jpg",
  },

  openGraph: {
    title: "CipherChase – Cybersecurity Treasure Hunt",
    description:
      "Crack the code. Hack the system. Win the prize. Join CipherChase — a cybersecurity-themed QR treasure hunt!",
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
    title: "CipherChase – Cybersecurity Treasure Hunt",
    description:
      "Scan. Hack. Win. Join CipherChase — a cybersecurity QR-based treasure hunt with puzzles and prizes!",
    images: ["/CipherChase.jpg"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0e17",
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
