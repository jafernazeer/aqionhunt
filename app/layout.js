import "./globals.css";

export const metadata = {
  title: "AqionVox Agentic Pitch & Voice AI Experience Portal",
  description: "Automated client acquisition landing pages and real-time Voice AI testing portal built by AqionLabs.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
