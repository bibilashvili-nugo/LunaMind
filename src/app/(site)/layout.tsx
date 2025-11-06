import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./Providers";
import { ScrollToTop } from "@/utils/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Evectus",
  description:
    "Evectus არის ონლაინ სასწავლო პლატფორმა, სადაც შეგიძლიათ აირჩიოთ პროფესიონალი რეპეტიტორი და ისწავლოთ სხვადასხვა საგნები: მათემატიკა, ქართული, ისტორია, გეოგრაფია, ქიმია, ფიზიკა, ბიოლოგია, ხელოვნება, ინგლისური, რუსული, გერმანული, ესპანური, ფრანგული, დაწყებითი კლასები. პლატფორმა საშუალებას გაძლევთ დაჯავშნოთ ინდივიდუალური გაკვეთილები, სწავლოთ ონლაინ სახლში ან ნებისმიერ სხვა ადგილას და გააუმჯობესოთ შედეგები სასწავლო პროცესში.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <ScrollToTop />
          {children}
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              className: "font-helveticaneue-medium",
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
