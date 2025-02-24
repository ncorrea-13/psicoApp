import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";

// Configurar la fuente
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: [ "400", "500", "600", "700"], // Agrega los pesos que necesites
});

export const metadata: Metadata = {
  title: "PsicoApp",
  description: "Bienvenid@ a PsicoApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
