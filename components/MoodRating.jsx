// components/MoodRating.jsx
import React from "react";

const moods = [
  { level: 1, icon: "😠", description: "Angry", color: "text-red-600" },
  { level: 2, icon: "😡", description: "Very Bad", color: "text-orange-600" },
  { level: 3, icon: "😐", description: "Neutral", color: "text-yellow-600" },
  { level: 4, icon: "🙂", description: "Good", color: "text-lime-600" },
  { level: 5, icon: "😁", description: "Excellent", color: "text-green-600" },
];

export default function MoodRating({ selectedMood = 3, onSelect = () => {} }) {
  return (
    <div className="flex justify-between space-x-4 mb-8">
      {moods.map((mood) => (
        <div
          key={mood.level}
          className="flex flex-col items-center cursor-pointer group"
          onClick={() => onSelect(mood.level)}
        >
          {/* Ikon Mood */}
          <span
            className={`text-5xl transition-transform ${mood.color} 
                        ${
                          selectedMood === mood.level
                            ? "scale-110 shadow-lg p-1 rounded-full bg-purple-100"
                            : "opacity-70 group-hover:opacity-100"
                        }`}
          >
            {mood.icon}
          </span>

          {/* Rating Bintang Placeholder */}
          <div className="text-xs text-gray-500 mt-2">
            {"⭐".repeat(mood.level)}
          </div>

          <button
            className={`text-xs mt-1 px-2 py-0.5 rounded-full transition-opacity 
                              ${
                                selectedMood === mood.level
                                  ? "bg-purple-600 text-white"
                                  : "bg-blue-100 text-blue-600 opacity-0 group-hover:opacity-100"
                              }`}
          >
            Select
          </button>
        </div>
      ))}
    </div>
  );
}
