"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function AddProject() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(3);
  const [deadline, setDeadline] = useState(""); // Fitur Baru: State Deadline
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      const res = await fetch(
        "https://moodratio-backend-production.up.railway.app/api/tasks",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            title,
            description,
            priority,
            deadline, // Fitur Baru: Kirim Deadline ke Backend
          }),
        }
      );

      if (res.ok) {
        toast.success("Tugas berhasil ditambahkan! 🚀", {
          style: {
            borderRadius: "15px",
            background: "#2D31FA",
            color: "#fff",
          },
        });
        router.push("/dashboard");
      } else {
        toast.error("Gagal menambah tugas");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan koneksi ke server");
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] p-4 md:p-8 lg:p-10  flex flex-col text-black font-sans transition-all">
      <header className="mb-6 mt-12 md:mt-0 flex flex-col md:flex-row md:items-center justify-between gap-2 shrink-0">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#2D31FA]">
            Tambah Proyek Baru
          </h1>
          <p className="text-gray-500 text-xs font-medium">
            Rencanakan langkah besar kamu berikutnya.
          </p>
        </div>
        <div className="hidden md:block bg-white p-3 rounded-2xl border shadow-sm">
          <span className="text-xl">📝</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        <div className="lg:col-span-8">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 md:p-8 rounded-[30px] md:rounded-[35px] shadow-sm border border-gray-100 flex flex-col h-full justify-between transition-all"
          >
            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                  Nama Proyek / Tugas
                </label>
                <input
                  className="w-full p-4 bg-gray-50 rounded-[20px] border-none focus:ring-2 focus:ring-[#2D31FA] outline-none text-base font-medium text-gray-800 transition-all placeholder:text-gray-300 shadow-inner"
                  placeholder="Apa yang ingin kamu kerjakan?"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                  Detail Deskripsi
                </label>
                <textarea
                  className="w-full p-4 bg-gray-50 rounded-[20px] border-none focus:ring-2 focus:ring-[#2D31FA] outline-none h-32 md:h-36 text-sm text-gray-800 transition-all resize-none placeholder:text-gray-300 shadow-inner"
                  placeholder="Tuliskan detail atau langkah-langkah tugas ini secara spesifik..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center bg-gray-50 p-5 md:p-6 rounded-[25px] shadow-inner">
                <div>
                  <label className="block mb-1 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                    Tingkat Kesulitan:{" "}
                    <span className="text-[#2D31FA]">{priority}</span>
                  </label>
                  <p className="text-[11px] text-gray-500 italic leading-tight">
                    Semakin tinggi angkanya, semakin besar tantangannya.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={priority}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#2D31FA]"
                    onChange={(e) => setPriority(e.target.value)}
                  />
                  <div className="flex justify-between w-full mt-3 px-1 text-xs font-black text-[#2D31FA]">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                  </div>
                </div>
              </div>

              {/* Fitur Baru: Input Deadline */}
              <div>
                <label className="block mb-2 text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                  Tenggat Waktu (Deadline)
                </label>
                <input
                  type="date"
                  className="w-full p-4 bg-gray-50 rounded-[20px] border-none focus:ring-2 focus:ring-[#2D31FA] outline-none text-base font-medium text-gray-400 transition-all shadow-inner"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  required
                />
              </div>
            </div>

            <button className="w-full py-4 mt-6 bg-[#2D31FA] text-white rounded-[22px] font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-100 hover:bg-blue-700 hover:shadow-blue-200 active:scale-[0.97] transition-all">
              Simpan Proyek & Mulai Kerja
            </button>
          </form>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-4 md:gap-5 mb-8 lg:mb-0">
          <div className="bg-indigo-50 p-6 rounded-[30px] md:rounded-[35px] border border-indigo-100 shadow-sm">
            <h4 className="font-bold text-indigo-900 text-sm mb-2 italic">
              Tips Produktif 💡
            </h4>
            <p className="text-[11px] text-indigo-700 leading-relaxed font-medium">
              Tugas dengan tingkat kesulitan tinggi sebaiknya dikerjakan saat
              mood kamu sedang di puncak (Level 4-5).
            </p>
          </div>
          <div className="bg-white p-6 rounded-[30px] md:rounded-[35px] border border-gray-100 shadow-sm text-center">
            <div className="text-4xl mb-3">🚀</div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Target Hari Ini
            </p>
            <p className="text-lg md:text-xl font-black text-gray-800">
              Selesaikan Tugas!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
