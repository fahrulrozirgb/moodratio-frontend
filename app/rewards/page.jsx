"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RewardPage() {
  const [user, setUser] = useState({ name: "", xp: 0 });
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return router.push("/login");

    try {
      const [resUser, resBoard] = await Promise.all([
        fetch(
          `https://moodratio-backend-production.up.railway.app/api/user/${userId}`
        ),
        fetch(
          "https://moodratio-backend-production.up.railway.app/api/leaderboard"
        ),
      ]);
      if (resUser.ok) setUser(await resUser.json());
      if (resBoard.ok) setLeaderboard(await resBoard.json());
    } catch (err) {
      console.error("Gagal memuat data reward:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getRank = (xp) => {
    if (xp >= 1000)
      return {
        title: "Grand Master Planner",
        icon: "👑",
        color: "text-yellow-600",
        bg: "bg-yellow-50",
      };
    if (xp >= 500)
      return {
        title: "Productivity Ninja",
        icon: "🥷",
        color: "text-purple-600",
        bg: "bg-purple-50",
      };
    if (xp >= 100)
      return {
        title: "Focus Warrior",
        icon: "⚔️",
        color: "text-blue-600",
        bg: "bg-blue-50",
      };
    return {
      title: "Novice Achiever",
      icon: "🌱",
      color: "text-green-600",
      bg: "bg-green-50",
    };
  };

  const badges = [
    { name: "First Task", xp: 10, img: "🏅", desc: "Selesaikan tugas pertama" },
    { name: "Warrior", xp: 100, img: "🛡️", desc: "Capai 100 XP pertama" },
    { name: "Ninja", xp: 500, img: "🌑", desc: "Konsisten tingkat tinggi" },
    { name: "King", xp: 1000, img: "💎", desc: "Legenda produktivitas" },
  ];

  const rank = getRank(user.xp);
  const unlockedBadges = badges.filter((b) => user.xp >= b.xp).length;

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8F9FD] text-[#2D31FA] font-bold">
        Memuat Pencapaian...
      </div>
    );

  return (
    // Penyesuaian: md:ml-64 agar tidak tertutup sidebar di desktop
    <div className="min-h-screen bg-[#F8F9FD] p-4 md:p-10 md:ml-64 text-black transition-all">
      {/* Header: Tambah mt-12 di HP agar tidak tertutup tombol menu */}
      <header className="mb-10 mt-12 md:mt-0 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0062ff] tracking-tight">
            Pusat Reward 🏆
          </h1>
          <p className="text-gray-500 font-medium text-sm">
            Ubah kerja kerasmu menjadi prestasi nyata.
          </p>
        </div>
        <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border font-bold text-xs md:text-sm">
          Badge Terbuka:{" "}
          <span className="text-[#2D31FA]">
            {unlockedBadges}/{badges.length}
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Status Card: Sticky hanya di desktop */}
        <div className="lg:col-span-4">
          <div className="bg-white p-8 md:p-10 rounded-[35px] md:rounded-[45px] shadow-sm border border-gray-100 text-center md:sticky md:top-10">
            <div
              className={`w-24 h-24 md:w-32 md:h-32 ${rank.bg} rounded-full flex items-center justify-center text-5xl md:text-6xl mx-auto mb-6 shadow-inner`}
            >
              {rank.icon}
            </div>
            <h2
              className={`text-xl md:text-2xl font-black ${rank.color} uppercase tracking-tighter`}
            >
              {rank.title}
            </h2>
            <p className="text-gray-400 text-[10px] font-bold mt-2 uppercase tracking-widest">
              Pangkat Kamu
            </p>

            <div className="mt-8 md:mt-10 bg-gray-50 p-5 md:p-7 rounded-[30px] md:rounded-[35px] border border-gray-100">
              <div className="flex justify-between items-end mb-3">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                  XP Progress
                </span>
                <span className="text-base md:text-lg font-black text-[#2D31FA]">
                  {user.xp}{" "}
                  <span className="text-xs text-gray-400">/ 1000</span>
                </span>
              </div>
              <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden p-1">
                <div
                  className="bg-gradient-to-r from-[#2D31FA] to-[#6366f1] h-full rounded-full transition-all duration-1000 ease-out shadow-lg"
                  style={{ width: `${Math.min((user.xp / 1000) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-[9px] text-gray-400 mt-4 font-medium">
                {user.xp >= 1000
                  ? "Kamu telah mencapai level maksimal! 🔥"
                  : `Butuh ${1000 - user.xp} XP lagi untuk level berikutnya.`}
              </p>
            </div>
          </div>
        </div>

        {/* Badges & Leaderboard */}
        <div className="lg:col-span-8 space-y-8">
          {/* Badge Grid: grid-cols-2 agar tetap rapi di HP */}
          <div className="bg-white p-6 md:p-10 rounded-[35px] md:rounded-[45px] shadow-sm border border-gray-100">
            <h3 className="text-lg md:text-xl font-black mb-8 text-gray-800 flex items-center gap-3">
              Koleksi Badge{" "}
              <span className="text-[10px] bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-bold">
                Personal
              </span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
              {badges.map((b) => {
                const isUnlocked = user.xp >= b.xp;
                return (
                  <div
                    key={b.name}
                    className={`group relative p-4 md:p-6 rounded-[25px] md:rounded-[35px] text-center border-2 transition-all duration-500 ${
                      isUnlocked
                        ? "border-blue-50 bg-blue-50/50 hover:bg-blue-100"
                        : "border-gray-50 bg-gray-50/50 grayscale opacity-40 hover:grayscale-0 hover:opacity-100"
                    }`}
                  >
                    <div
                      className={`text-4xl md:text-5xl mb-3 transition-transform duration-500 ${
                        isUnlocked ? "group-hover:scale-110" : ""
                      }`}
                    >
                      {b.img}
                    </div>
                    <p className="text-[9px] md:text-[11px] font-black uppercase tracking-widest text-gray-800">
                      {b.name}
                    </p>
                    {/* Tooltip Mobile: Dibuat lebih kecil agar teks muat */}
                    <div className="absolute inset-0 bg-[#2D31FA] text-white opacity-0 group-hover:opacity-100 rounded-[25px] md:rounded-[35px] flex items-center justify-center p-2 transition-opacity duration-300 text-[8px] md:text-[10px] font-bold leading-tight cursor-default whitespace-pre-line">
                      {isUnlocked
                        ? `Berhasil Didapat!\n${b.desc}`
                        : `Terkunci\nButuh ${b.xp} XP`}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leaderboard Section */}
          <div className="bg-white p-6 md:p-10 rounded-[35px] md:rounded-[45px] shadow-sm border border-gray-100 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-2">
              <h3 className="text-lg md:text-xl font-black text-gray-800">
                Top Global Planner 🌏
              </h3>
              <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">
                Update Real-time
              </span>
            </div>

            <div className="space-y-4">
              {leaderboard.length > 0 ? (
                leaderboard.map((player, index) => (
                  <div
                    key={index}
                    className={`flex items-center justify-between p-4 md:p-5 rounded-[20px] md:rounded-[25px] transition-all ${
                      player.name === user.name
                        ? "bg-blue-50 border border-blue-100 scale-[1.01] shadow-md shadow-blue-50"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center gap-3 md:gap-5">
                      <div
                        className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-black text-xs ${
                          index === 0
                            ? "bg-yellow-400 text-white"
                            : index === 1
                            ? "bg-gray-300 text-white"
                            : index === 2
                            ? "bg-orange-400 text-white"
                            : "bg-white text-gray-400"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="max-w-[120px] md:max-w-none">
                        <span className="font-bold text-gray-800 block leading-none text-xs md:text-sm truncate">
                          {player.name} {player.name === user.name && " (Anda)"}
                        </span>
                        <span className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                          Verified User
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] md:text-sm font-black text-[#2D31FA] bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-xl md:rounded-2xl shadow-sm border border-blue-50">
                        {player.xp}{" "}
                        <span className="text-[8px] md:text-[9px] text-gray-400 uppercase">
                          XP
                        </span>
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-400 italic font-medium text-sm">
                  Belum ada data kompetisi. Jadilah yang pertama!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
