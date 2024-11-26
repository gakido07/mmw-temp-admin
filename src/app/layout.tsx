import type { Metadata } from "next";
import "./globals.css";
import ClientsProvider from "@/Components/ClientsProvider/ClientsProvider";



export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ClientsProvider>
          {children}
        </ClientsProvider>
      </body>
    </html>
  );
}
