import './globals.css'
// import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Script from 'next/script';

export const metadata = {
  title: 'Tour Tết 2024 Vietnam Booking',
  description: 'Tour Tết 2024 Vietnam Booking',
}

export default function RootLayout({ children }) {
  return (
    <>
    <html lang="en">
      <Script strategy="afterInteractive" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.1/jquery.min.js" />
      <Script strategy="afterInteractive" src="https://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js" />
      <body>{children}</body>
    </html>
    </>
  )
}
