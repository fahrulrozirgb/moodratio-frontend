"use client";
// components/Header.jsx (Ganti nama file Anda menjadi Topbar.jsx jika mau)
import React from "react";
// import { useRouter } from 'next/navigation'; // UNCOMMENT jika menggunakan App Router

export default function Header({ title, showBackButton = false }) {
  // const router = useRouter(); // UNCOMMENT jika menggunakan App Router

  // Fungsi untuk kembali (hanya placeholder)
  const handleBack = () => {
    // router.back(); // Gunakan ini di aplikasi nyata
    alert("Tombol Kembali Ditekan");
  };

  return (
    <div className="flex justify-between items-center py-4">
      <div className="flex items-center">
        {showBackButton && (
          <button
            onClick={handleBack}
            className="mr-4 text-2xl p-1 rounded-full hover:bg-gray-100 transition"
          >
            ←
          </button>
        )}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="border rounded-full py-2 pl-4 pr-10 bg-white shadow-sm focus:ring-purple-500 focus:border-purple-500"
          />
          <span className="absolute right-3 top-2.5 text-gray-400">🔍</span>
        </div>

        {/* Notifikasi */}
        <span className="text-2xl cursor-pointer hover:text-purple-600 transition">
          🔔
        </span>
      </div>
    </div>
  );
}
