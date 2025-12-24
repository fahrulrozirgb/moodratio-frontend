// app/today-tasks/page.jsx
import React from "react";
import Header from "../../components/Header";
import TaskCard from "../../components/TaskCard";

// Data Dummy untuk Tugas (sesuai desain)
const recommendedTasks = [
  {
    project: "Office Project",
    title: "Market Research",
    time: "10:00 AM",
    rating: "⭐⭐⭐⭐",
    status: "High",
  },
  {
    project: "Uber Eats redesign challenge",
    title: "Create Low-fidelity Wireframe",
    time: "07:30 PM",
    rating: "⭐⭐⭐",
    status: "Low",
  },
  {
    project: "Daily Study",
    title: "Competitive Analysis",
    time: "12:00 PM",
    rating: "⭐⭐⭐⭐⭐",
    status: "Medium",
  },
  {
    project: "About design sprint",
    title: "How to pitch a Design Sprint",
    time: "09:00 PM",
    rating: "⭐⭐⭐⭐",
    status: "Low",
  },
];

export default function TodayTasksPage() {
  return (
    <div className="space-y-8">
      {/* Header Halaman (Dengan tombol back jika perlu) */}
      <Header title="Today's Tasks" showBackButton={true} />

      {/* Konten Utama Halaman */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Kolom Kiri (Kartu Utama & Tugas Rekomendasi) - Mengambil 2/3 lebar */}
        <div className="lg:col-span-2 space-y-8">
          {/* Kartu Progress Tugas Utama (Warna Ungu Besar) */}
          <div className="bg-purple-700 text-white p-8 rounded-3xl shadow-xl flex justify-between items-center relative overflow-hidden">
            {/* Ilustrasi Placeholder */}
            <div className="absolute right-0 top-0 h-full w-1/3 bg-purple-800 opacity-20 transform skew-x-[-15deg]"></div>

            <div className="z-10">
              <h2 className="text-3xl font-bold mb-2">
                Your today's task almost done!
              </h2>
              <p className="text-purple-200 mb-6">
                Completing your tasks on time helps improve your productivity.
              </p>
              <button className="bg-white text-purple-700 font-medium py-2 px-6 rounded-lg hover:bg-gray-100 transition shadow-md">
                View Task
              </button>
            </div>

            {/* Progress Lingkaran (85%) */}
            <div className="relative w-24 h-24 z-10">
              {/* Anda akan menggunakan library chart atau SVG untuk ini, ini adalah placeholder sederhana */}
              <div className="w-full h-full rounded-full border-4 border-purple-400 flex items-center justify-center">
                <span className="text-2xl font-bold">85%</span>
              </div>
            </div>
          </div>

          {/* Bagian Tugas Rekomendasi */}
          <h3 className="text-xl font-bold">
            Recommended tasks that you can do today
          </h3>
          <div className="space-y-4">
            {recommendedTasks.map((task, index) => (
              <TaskCard
                key={index}
                project={task.project}
                title={task.title}
                time={task.time}
                rating={task.rating}
                status={task.status}
              />
            ))}
          </div>
        </div>

        {/* Kolom Kanan (Kalender & Progress Bar) - Mengambil 1/3 lebar */}
        <div className="lg:col-span-1 space-y-8">
          {/* Komponen Kalender Sederhana */}
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h3 className="text-lg font-bold mb-4">November 2022</h3>
            {/* Placeholder Grid Kalender */}
            <div className="grid grid-cols-7 gap-2 text-center text-sm">
              {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((day) => (
                <span key={day} className="font-semibold text-gray-500">
                  {day}
                </span>
              ))}
              {/* Dummy dates: 1-30 */}
              {[...Array(30).keys()].map((i) => {
                const day = i + 1;
                const isSelected = day === 9; // Contoh tanggal 9 aktif
                return (
                  <div
                    key={day}
                    className={`p-1 rounded-full ${
                      isSelected
                        ? "bg-purple-600 text-white font-bold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Kartu Progress & Music Player Placeholder */}
          <div className="bg-white p-6 rounded-3xl shadow-md">
            <h3 className="text-lg font-bold mb-4">Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
              <div
                className="bg-orange-500 h-2.5 rounded-full"
                style={{ width: "25%" }}
              ></div>
            </div>
            <p className="text-sm font-semibold text-gray-700 mb-6">25%</p>

            {/* Placeholder Music Player */}
            <div className="border-t pt-4">
              <p className="text-sm font-medium">Freak In Me</p>
              <p className="text-xs text-gray-500">Mild Orange</p>
              {/* Placeholder Controls Musik */}
              <div className="h-8 bg-gray-100 mt-3 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Catatan: Pastikan komponen Header berada di `components/Header.jsx`
// agar tombol kembali dapat ditambahkan. Jika belum, tambahkan fungsi ini di sana:
/*
// components/Header.jsx (Revisi sederhana)
export default function Header({ title, showBackButton = false }) {
  return (
    <div className="flex items-center justify-between py-4">
      {showBackButton && (
          // Ini hanya tombol placeholder, implementasi navigasi nyata butuh useRouter
          <button className="mr-4 text-2xl">←</button> 
      )}
      <h1 className="text-2xl font-bold">{title}</h1>
      <div className="flex items-center space-x-4">
        <input type="text" placeholder="Search" className="border rounded-full py-2 px-4" />
        <span className="text-xl">🔔</span>
      </div>
    </div>
  );
}
*/
