import type { Metadata } from "next";
import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "ITMS",
  description:
    "Book bus and van tickets online for your travel needs in Palawan.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen font-sans antialiased">
        <Header />
        <main className="flex flex-grow flex-col items-center justify-center w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
//         <main className="flex-grow w-full max-w-7xl px-4">{children}</main>
