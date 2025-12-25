"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Dashboard() {
  const [mood, setMood] = useState(3);
  const [catatan, setCatatan] = useState("");
  const [tugas, setTugas] = useState([]);
  const [user, setUser] = useState({ name: "User", xp: 0 });
  const [motivasi, setMotivasi] = useState({ pesan: "Memuat...", saran: "" });
  const [stats, setStats] = useState({
    rataRata: 0,
    moodSeringMuncul: "Memuat...",
  });
  const router = useRouter();

  const fetchData = async () => {
    const userId = localStorage.getItem("userId");
    if (!userId) return router.push("/login");

    try {
      const resUser = await fetch(
        `https://moodratio-backend-production.up.railway.app/api/user/${userId}`
      );
      if (resUser.ok) setUser(await resUser.json());

      const resStats = await fetch(
        `https://moodratio-backend-production.up.railway.app/api/mood-stats/${userId}`
      );
      let currentMood = 3;
      if (resStats.ok) {
        const dataStats = await resStats.json();
        setStats({
          rataRata: dataStats.rataRata,
          moodSeringMuncul: dataStats.moodSeringMuncul || "Belum ada data",
        });

        if (dataStats.riwayat && dataStats.riwayat.length > 0) {
          currentMood = dataStats.riwayat[0].mood_score;
          setMood(currentMood);
          setCatatan(dataStats.riwayat[0].notes || "");
        }
      }

      const [resStatus, resTasks] = await Promise.all([
        fetch(
          `https://moodratio-backend-production.up.railway.app/api/user-status/${userId}`
        ),
        fetch(
          `https://moodratio-backend-production.up.railway.app/api/tasks-priority/${userId}/${currentMood}`
        ),
      ]);

      if (resStatus.ok) setMotivasi(await resStatus.json());
      if (resTasks.ok) {
        const dataTasks = await resTasks.json();
        setTugas(dataTasks.tasks || []);
      }
    } catch (err) {
      toast.error("Gagal sinkronisasi data server");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateMood = async () => {
    const userId = localStorage.getItem("userId");
    try {
      const res = await fetch(
        "https://moodratio-backend-production.up.railway.app/api/mood",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, skorMood: mood, catatan }),
        }
      );
      if (res.ok) {
        fetchData();
        toast.success("Mood berhasil disimpan! ✨");
      }
    } catch (err) {
      toast.error("Gagal memperbarui mood");
    }
  };

  const selesaikanTugas = async (taskId) => {
    const userId = localStorage.getItem("userId");
    try {
      const res = await fetch(
        `https://moodratio-backend-production.up.railway.app/api/tasks/${taskId}/complete`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        }
      );
      if (res.ok) {
        toast.success("Tugas Selesai! +10 XP 🔥", {
          style: { borderRadius: "15px", background: "#2D31FA", color: "#fff" },
        });
        fetchData();
      }
    } catch (err) {
      toast.error("Gagal menyelesaikan tugas");
    }
  };

  const hapusTugas = async (taskId) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-3">
          <span className="font-bold text-sm text-gray-800">
            Hapus tugas ini? 🗑️
          </span>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const res = await fetch(
                    `https://moodratio-backend-production.up.railway.app/api/tasks/${taskId}`,
                    {
                      method: "DELETE",
                    }
                  );
                  if (res.ok) {
                    toast.success("Tugas telah dihapus", { icon: "🗑️" });
                    fetchData();
                  }
                } catch (err) {
                  toast.error("Gagal menghapus tugas");
                }
              }}
              className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-600 transition-colors"
            >
              Ya, Hapus
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors"
            >
              Batal
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
        position: "top-center",
        style: {
          borderRadius: "20px",
          background: "#fff",
          color: "#333",
          boxShadow:
            "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
        },
      }
    );
  };

  return (
    // Penyesuaian: Menambahkan md:ml-64 agar konten tidak tertutup sidebar di desktop
    <div className="min-h-screen bg-[#F8F9FD] p-4 md:p-8 w-full text-black font-sans transition-all">
      {/* Header: Dibuat gap yang lebih kecil di HP dan padding atas untuk tombol menu */}
      <header className="mb-10 mt-12 md:mt-0 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-[#0062ff]">
            Halo, {user.name}! 👋
          </h1>
          <p className="text-gray-500 font-medium text-sm md:text-base">
            Lacak mood dan selesaikan targetmu.
          </p>
        </div>
        <div className="bg-white p-5 rounded-[30px] shadow-sm border w-full md:w-80 text-black">
          <div className="flex justify-between text-[10px] font-black mb-2 uppercase tracking-widest text-gray-400">
            <span>Progress Level</span>
            <span className="text-[#0004ff]">{user.xp} XP</span>
          </div>
          <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-[#2D31FA] h-full rounded-full transition-all duration-700"
              style={{ width: `${user.xp % 100}%` }}
            ></div>
          </div>
        </div>
      </header>

      {/* Quote Card: flex-col di HP, flex-row di desktop */}
      <div className="mb-8 p-6 md:p-7 bg-gradient-to-br from-[#2D31FA] to-[#7C3AED] rounded-[30px] md:rounded-[40px] text-white shadow-xl flex flex-col md:flex-row items-center gap-4 md:gap-6 transform hover:scale-[1.01] transition-all text-center md:text-left">
        <div className="text-4xl md:text-5xl bg-white/20 p-4 rounded-3xl backdrop-blur-sm text-white">
          💡
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold mb-1 text-white leading-tight">
            {motivasi.pesan}
          </h3>
          <p className="opacity-90 text-xs md:text-sm font-medium italic text-white">
            {motivasi.saran}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
        {/* Mood Tracker: Card width full secara default */}
        <div className="bg-white p-6 md:p-8 rounded-[35px] md:rounded-[45px] shadow-sm border border-gray-100 h-fit w-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-gray-800">Mood Tracker</h2>
            <span className="text-[9px] md:text-[10px] bg-blue-50 text-[#2D31FA] px-3 py-1 rounded-full font-black uppercase">
              {stats.moodSeringMuncul}
            </span>
          </div>

          {/* Emoji: Gap disesuaikan agar tidak overflow di HP kecil */}
          <div className="flex justify-between mb-8 px-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                onClick={() => setMood(s)}
                className={`text-3xl md:text-4xl transition-all ${
                  mood === s
                    ? "scale-125 grayscale-0 drop-shadow-md"
                    : "grayscale opacity-30 hover:opacity-100"
                }`}
              >
                {s === 1
                  ? "😢"
                  : s === 2
                  ? "😟"
                  : s === 3
                  ? "😐"
                  : s === 4
                  ? "😊"
                  : "🤩"}
              </button>
            ))}
          </div>
          <textarea
            className="w-full p-5 bg-gray-50 rounded-[25px] mb-4 h-28 outline-none text-sm font-medium border-none focus:ring-2 focus:ring-blue-100 transition-all text-black"
            placeholder="Ada cerita apa hari ini?"
            value={catatan}
            onChange={(e) => setCatatan(e.target.value)}
          />
          <button
            onClick={handleUpdateMood}
            className="w-full py-4 bg-[#2D31FA] text-white rounded-[22px] font-black uppercase tracking-widest text-xs hover:bg-blue-700 shadow-lg transition-all active:scale-95"
          >
            Simpan Mood
          </button>
        </div>

        {/* Task List: grid-cols-1 di HP, grid-cols-2 di desktop */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-black text-gray-800 flex flex-wrap items-center gap-2">
            Tugas Prioritas{" "}
            <span className="text-[10px] bg-gray-100 text-gray-400 px-3 py-1 rounded-full uppercase">
              Berdasarkan Mood
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {tugas.length > 0 ? (
              tugas.map((t) => (
                <div
                  key={t.id}
                  className="bg-white p-6 md:p-7 rounded-[35px] md:rounded-[40px] border-l-[10px] border-[#2D31FA] shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-black text-gray-800 leading-tight pr-2">
                        {t.title}
                      </h3>
                      <span className="text-[9px] bg-blue-50 text-[#2D31FA] px-3 py-1 rounded-full font-black whitespace-nowrap">
                        LVL {t.priority}
                      </span>
                    </div>
                    <p className="text-gray-400 text-xs font-medium mb-6 line-clamp-3">
                      {t.description}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <button
                      onClick={() => selesaikanTugas(t.id)}
                      className="flex-1 text-[#2D31FA] font-black text-[10px] uppercase tracking-widest bg-blue-50 py-4 rounded-[20px] hover:bg-[#2D31FA] hover:text-white transition-all shadow-sm"
                    >
                      Selesai ✓
                    </button>
                    <button
                      onClick={() => hapusTugas(t.id)}
                      className="px-5 bg-red-50 text-red-500 rounded-[20px] hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-[35px] md:rounded-[40px] py-16 text-center px-4">
                <p className="text-gray-400 font-medium italic text-sm">
                  Tidak ada tugas yang perlu dikerjakan. Santai dulu! ☕
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
