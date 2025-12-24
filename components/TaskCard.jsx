// components/TaskCard.jsx
import React from "react";

export default function TaskCard({ project, title, time, rating, status }) {
  // Fungsi sederhana untuk menentukan warna berdasarkan status/prioritas
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case "in-progress":
        return "bg-pink-100 text-pink-700";
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-orange-100 text-orange-700";
      case "low":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 transition duration-300 hover:shadow-lg">
      <div className="flex justify-between items-start">
        {/* Detail Tugas */}
        <div>
          <p className="text-xs text-gray-500 mb-1">{project}</p>
          <h4 className="font-medium text-sm">{title}</h4>
        </div>

        {/* Status/Prioritas */}
        <span
          className={`text-xs font-semibold py-1 px-3 rounded-full ${getStatusStyle(
            status
          )}`}
        >
          {status}
        </span>
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-dashed border-gray-200">
        {/* Waktu & Rating */}
        <div className="flex items-center space-x-3">
          <span className="text-xs text-gray-600">🕒 {time}</span>
          <span className="text-xs text-yellow-500">{rating}</span>
        </div>

        {/* Tombol Aksi */}
        <button className="text-xs text-purple-600 font-semibold hover:underline">
          Todo
        </button>
      </div>
    </div>
  );
}
