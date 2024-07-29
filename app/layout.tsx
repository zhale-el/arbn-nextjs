import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import ClientOnly from "./components/ClientOnly";
import Modal from "./components/modals/Modal";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Aribnb",
  description: "Aribnb clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientOnly>
          <Modal title="Hello World" isOpen />
          <Navbar />
        </ClientOnly>

        {children}
      </body>
    </html>
  );
}
