import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://www.theloopedmind.com"),
  title: "The Looped Mind — Built to Imagine. Wired to Repeat.",
  description:
    "A brand for the serial entrepreneur. The memoir, the loop, and the trait packs from Kathy Swanstrom.",
  openGraph: {
    title: "The Looped Mind",
    description: "Built to Imagine. Wired to Repeat.",
    url: "https://www.theloopedmind.com",
    siteName: "The Looped Mind",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Looped Mind",
    description: "Built to Imagine. Wired to Repeat.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,400&family=Spline+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
