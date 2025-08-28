// src/components/Legend.js
import React from "react";

const Legend = () => {
  const ranges = [
    { color: "bg-green-500", label: "Magnitude < 3.0" },
    { color: "bg-yellow-400", label: "Magnitude 3.0 - 4.9" },
    { color: "bg-orange-500", label: "Magnitude 5.0 - 6.9" },
    { color: "bg-red-600", label: "Magnitude ≥ 7.0" },
  ];

  return (
    <div className="absolute bottom-4 left-4 bg-white shadow-md rounded-lg p-2 sm:p-3 text-xs sm:text-sm z-[1000] max-w-[180px] sm:max-w-[220px]">
      <h3 className="font-semibold mb-1 sm:mb-2">Legend</h3>
      <ul>
        {ranges.map((range, index) => (
          <li key={index} className="flex items-center mb-1">
            <span
              className={`w-3 h-3 sm:w-4 sm:h-4 mr-2 rounded ${range.color}`}
            ></span>
            <span className="truncate">{range.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Legend;
