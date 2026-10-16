import type { Metadata } from "next";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import { ToastContainer } from "react-toastify";
import { Suspense } from "react";

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে জানুন।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="bn"
      className={`${notoSerifBengali.className} h-full antialiased`}
    >

      <body className="flex min-h-screen flex-col bg-green-50/50">
        <Header />
        <Suspense
          fallback={
            <div className="py-3 text-center text-sm text-green-700">
              বাজারদর লোড হচ্ছে...
            </div>
          }
        >
          <Marquee />
        </Suspense>

        <main className="flex-1">
          {children}
        </main>

        <Footer />

        <ToastContainer
          position="top-center"
          autoClose={3000}
        />

      </body>

    </html>
  );
}