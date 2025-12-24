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
      const res = await fetch(`http://localhost:5000/api/mood-stats/${userId}`);
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
    <div className="p-10 min-h-screen bg-[#F8F9FD]">
      <h1 className="text-3xl font-bold text-[#2D31FA] mb-8">
        Analisis Mood Ratio
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-8 rounded-3xl shadow-sm text-center border">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
            Skor Rata-Rata
          </p>
          <h2 className="text-6xl font-black text-[#2D31FA] mt-2">
            {stats.rataRata}
          </h2>
        </div>
        <div className="bg-white p-8 rounded-3xl shadow-sm text-center border">
          <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">
            Mood Dominan
          </p>
          <h2 className="text-4xl font-bold text-orange-500 mt-2">
            {stats.moodSeringMuncul}
          </h2>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border overflow-hidden">
        <h3 className="font-bold mb-6 text-gray-800 text-lg">
          Riwayat Mood Terbaru
        </h3>
        {stats.riwayat.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-400 text-xs uppercase tracking-widest">
                  <th className="pb-4 font-bold">Tanggal</th>
                  <th className="pb-4 font-bold">Skor</th>
                  <th className="pb-4 font-bold">Catatan</th>
                </tr>
              </thead>
              <tbody>
                {stats.riwayat.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b last:border-0 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 text-sm text-gray-600">
                      {new Date(item.logged_at).toLocaleDateString("id-ID")}
                    </td>
                    <td className="py-4">
                      <span className="font-bold text-[#2D31FA] bg-indigo-50 px-3 py-1 rounded-full text-sm">
                        {item.mood_score}
                      </span>
                    </td>
                    <td className="py-4 text-gray-500 italic text-sm">
                      {item.notes || "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📭</p>
            <p className="italic">
              Belum ada riwayat mood. Input mood pertamamu di Dashboard!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
