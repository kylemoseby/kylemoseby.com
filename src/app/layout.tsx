import type { Metadata } from "next";
import { Jersey_15 } from "next/font/google";
import "./globals.css";

const jersey15 = Jersey_15({
  weight: ['400'],
  variable: "--jersey-15-regular",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kyle Moseby /// Seattle, Washington",
  description: "The personal site of Kyle Moseby.",
  keywords: [
    'Kyle Moseby',
    'Kyle',
    'Moseby',
    'Seattle',
    'White Center',
    'Washington',
    'JavaScript',
    'Python',
    'Photographer'
  ],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly < {
  children: React.ReactNode;
} > ) {
  return (
    <html lang="en">
      <body
        className={`${jersey15.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}