import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { AcknowledgmentModalProvider } from "@/components/acknowledgment-modal-provider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
          <AcknowledgmentModalProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </AcknowledgmentModalProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "PPLT - Puerto Princesa Land Transportation Terminal",
  description:
    "Book bus and van tickets online for your travel needs in Palawan.",
};
