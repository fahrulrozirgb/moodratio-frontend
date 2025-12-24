"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [userData, setUserData] = useState({ name: "Loading...", xp: 0 });

  useEffect(() => {
    const ambilDataUser = async () => {
      const userId = localStorage.getItem("userId");
      if (userId) {
        try {
          const res = await fetch(`http://localhost:5000/api/user/${userId}`);
          if (res.ok) {
            const data = await res.json();
            setUserData(data);
          }
        } catch (err) {
          console.error("Gagal memuat data user:", err);
          setUserData({ name: "User", xp: 0 });
        }
      }
    };
    ambilDataUser();
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/login");
  };

  // LOGIKA DISESUAIKAN DENGAN REWARD PAGE
  const getBadge = (xp) => {
    if (xp >= 1000)
      return { label: "👑 Master", color: "bg-yellow-100 text-yellow-700" };
    if (xp >= 500)
      return { label: "🥷 Ninja", color: "bg-purple-100 text-purple-700" };
    if (xp >= 100)
      return { label: "⚔️ Warrior", color: "bg-blue-100 text-blue-700" };
    return { label: "🌱 Pemula", color: "bg-green-100 text-green-700" };
  };

  const badge = getBadge(userData.xp);

  const menu = [
    { nama: "Dashboard", path: "/dashboard", icon: "🏠" },
    { nama: "Mood Ratio", path: "/mood-ratio", icon: "📊" },
    { nama: "Tambah Proyek", path: "/add-project", icon: "➕" },
    { nama: "Klaim Reward", path: "/rewards", icon: "🎁" },
  ];

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-100 flex flex-col p-6 fixed left-0 top-0 z-50 text-black">
      <div className="mb-10 px-2 text-black">
        <h1 className="text-xl font-bold text-[#2D31FA] tracking-tight text-black">
          MoodRatio
        </h1>
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
          Planner System
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
              pathname === item.path
                ? "bg-[#2D31FA] text-white shadow-lg shadow-blue-200"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="font-semibold text-sm">{item.nama}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto border-t pt-6">
        <div className="flex items-center gap-3 mb-6 bg-gray-50 p-3 rounded-2xl">
          <div className="w-10 h-10 bg-[#2D31FA] rounded-full flex items-center justify-center text-white font-bold uppercase shadow-inner">
            {userData.name.charAt(0)}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-gray-800 truncate text-black">
              {userData.name}
            </p>
            <span
              className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase inline-block ${badge.color}`}
            >
              {badge.label}
            </span>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm"
        >
          <span className="text-lg">🚪</span>
          Keluar
        </button>
      </div>
    </div>
  );
}
