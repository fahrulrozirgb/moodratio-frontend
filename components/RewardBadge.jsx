// components/RewardBadge.jsx
import React from "react";

export default function RewardBadge({
  title,
  description,
  icon,
  isAchieved = false,
}) {
  return (
    <div
      className={`p-6 rounded-2xl shadow-lg border-2 transition transform hover:scale-[1.02] 
                  ${
                    isAchieved
                      ? "bg-white border-yellow-400" // Lencana sudah diraih
                      : "bg-gray-50 border-gray-200 opacity-60" // Lencana belum diraih
                  }`}
    >
      <div
        className={`text-5xl mb-4 ${
          isAchieved ? "text-yellow-500" : "text-gray-400"
        }`}
      >
        {icon}
      </div>

      <h3 className="text-lg font-bold mb-1">{title}</h3>

      <p
        className={`text-sm ${isAchieved ? "text-gray-600" : "text-gray-500"}`}
      >
        {description}
      </p>

      {isAchieved && (
        <span className="mt-3 inline-block text-xs font-semibold px-3 py-1 bg-green-100 text-green-700 rounded-full">
          ACHIEVED
        </span>
      )}
      {!isAchieved && (
        <span className="mt-3 inline-block text-xs font-semibold px-3 py-1 bg-gray-200 text-gray-700 rounded-full">
          Locked
        </span>
      )}
    </div>
  );
}
