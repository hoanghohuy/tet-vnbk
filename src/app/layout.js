import "./globals.css";
// import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Script from "next/script";
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: "Tết đoàn viên, nhận liền ưu đãi - Tour Tết 2024 | Vietnam Booking",
  description:
    "Tết đoàn viên, nhận liền ưu đãi - Tour Tết 2024 | Vietnam Booking",
  keywords: "tour tet, tet 2024, tết, vietnam booking, event tet",
  openGraph: {
    images: [`https://event.vietnambooking.com/thumbnail.png`],
    title: `Tết đoàn viên, nhận liền ưu đãi - Tour Tết 2024 | Vietnam Booking`,
    url: `https://event.vietnambooking.com`,
    type: `website`,
    description: `Tết đoàn viên, nhận liền ưu đãi - Tour Tết 2024 | Vietnam Booking`,
  },
  twitter: {
    card: "summary",
    url: `https://event.vietnambooking.com`,
    title: `Tết đoàn viên, nhận liền ưu đãi - Tour Tết 2024 | Vietnam Booking`,
    description: `Tết đoàn viên, nhận liền ưu đãi - Tour Tết 2024 | Vietnam Booking`,
    images: [`https://event.vietnambooking.com/thumbnail.png`],
    site: "@vnbkcorp",
    creator: "@vnbkcorp",
  },
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <Script
          strategy="afterInteractive"
          src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js"
        />
        <Script
          strategy="afterInteractive"
          src="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"
        />
        <Script
          strategy="afterInteractive"
          src="https://cdn.jsdelivr.net/npm/sweetalert2@11"
        />
        <body>{children}</body>
        <Analytics />
      </html>
    </>
  );
}
