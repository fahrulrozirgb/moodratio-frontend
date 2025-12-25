"use client";
import { useState, useEffect } from "react";

export default function MoodRatio() {
  const [stats, setStats] = useState({
    rataRata: 0,
    moodSeringMuncul: "Memuat...",
    riwayat: [],
  });

  const ambilStatistik = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      const res = await fetch(
        `https://moodratio-backend-production.up.railway.app/api/mood-stats/${userId}`
      );
      if (!res.ok) {
        console.error("Respon server tidak ok");
        return;
      }
      const data = await res.json();
      setStats({
        rataRata: data.rataRata || 0,
        moodSeringMuncul: data.moodSeringMuncul || "Tidak ada data",
        riwayat: data.riwayat || [],
      });
    } catch (err) {
      console.error("Gagal terhubung ke server backend.");
    }
  };

  useEffect(() => {
    ambilStatistik();
  }, []);

  return (
    // Penyesuaian: md:ml-64 agar tidak tertutup sidebar di desktop, p-4 di HP agar tidak mepet
    <div className="p-4 md:p-10  min-h-screen bg-[#F8F9FD] text-black transition-all">
      {/* Header: Tambah mt-12 di HP agar tidak tertutup tombol menu sidebar */}
      <h1 className="text-2xl md:text-3xl font-bold text-[#2D31FA] mb-8 mt-12 md:mt-0">
        Analisis Mood Ratio
      </h1>

      {/* Grid Statistik: grid-cols-1 di HP agar menumpuk ke bawah */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm text-center border">
          <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-wider">
            Skor Rata-Rata
          </p>
          <h2 className="text-5xl md:text-6xl font-black text-[#2D31FA] mt-2">
            {stats.rataRata}
          </h2>
        </div>
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm text-center border">
          <p className="text-gray-400 text-xs md:text-sm font-bold uppercase tracking-wider">
            Mood Dominan
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-orange-500 mt-2">
            {stats.moodSeringMuncul}
          </h2>
        </div>
      </div>

      <div className="bg-white p-5 md:p-6 rounded-3xl shadow-sm border overflow-hidden">
        <h3 className="font-bold mb-6 text-gray-800 text-lg">
          Riwayat Mood Terbaru
        </h3>
        {stats.riwayat.length > 0 ? (
          <div className="overflow-x-auto -mx-5 md:mx-0">
            {/* overflow-x-auto memungkinkan tabel di-geser ke samping jika layar terlalu sempit */}
            <table className="w-full text-left border-collapse min-w-[500px] md:min-w-full">
              <thead>
                <tr className="border-b text-gray-400 text-[10px] md:text-xs uppercase tracking-widest px-5">
                  <th className="pb-4 font-bold pl-5 md:pl-0">Tanggal</th>
                  <th className="pb-4 font-bold">Skor</th>
                  <th className="pb-4 font-bold pr-5 md:pr-0">Catatan</th>
                </tr>
              </thead>
              <tbody>
                {stats.riwayat.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors px-5"
                  >
                    <td className="py-4 text-xs md:text-sm text-gray-600 pl-5 md:pl-0">
                      {new Date(item.logged_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-4">
                      <span className="font-bold text-[#2D31FA] bg-indigo-50 px-3 py-1 rounded-full text-xs md:text-sm">
                        {item.mood_score}
                      </span>
                    </td>
                    <td className="py-4 text-gray-500 italic text-xs md:text-sm pr-5 md:pr-0 truncate max-w-[150px] md:max-w-none">
                      {item.notes || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400 px-4">
            <p className="text-4xl mb-3">📭</p>
            <p className="italic text-sm">
              Belum ada riwayat mood. Input mood pertamamu di Dashboard!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
