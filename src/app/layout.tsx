import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "../components/ClientLayout";

// Attempt to load some standard fonts or fallback to system
// const inter = Inter({ subsets: ["latin"] }); 
// If google fonts are not set up, we rely on standard tailwind fonts or custom fonts if user added them.
// Minimal setup for now.

export const metadata: Metadata = {
    title: "Winterfall",
    description: "Gamedev",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-white text-slate-900 antialiased overflow-x-hidden selection:bg-gray-200 selection:text-black">
                <ClientLayout>
                    {children}
                </ClientLayout>
            </body>
        </html>
    );
}
