"use client";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Sidebar hanya muncul jika BUKAN di halaman login, register, atau landing
  const isAuthPage =
    pathname === "/login" || pathname === "/register" || pathname === "/";

  return (
    <html lang="id">
      <body className="bg-[#F8F9FD] flex">
        <GoogleOAuthProvider clientId="633033039034-louql75ipqo2dcquml83e85rds82gt26.apps.googleusercontent.com">
          {/* Tambahkan Toaster di sini */}
          <Toaster position="top-center" reverseOrder={false} />

          {!isAuthPage && <Sidebar />}

          <main className={`flex-1 ${!isAuthPage ? "ml-64" : ""}`}>
            {children}
          </main>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
