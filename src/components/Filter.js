import { useState } from "react";

const Filter = ({ onFilterChange, minMag, timeframe, onReset }) => {
  const handleMagChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    onFilterChange(value, timeframe); // update Home.js state
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    onFilterChange(minMag, value); // update Home.js state
  };

  const handleReset = () => {
    if (onReset) onReset(); // calls Home.js reset handler
  };

  return (
    <div className="mb-4 space-y-4 w-full sm:w-auto">
      {/* Magnitude Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Minimum Magnitude
        </label>
        <select
          value={minMag} // controlled by Home.js
          onChange={handleMagChange}
          className="w-full sm:w-full border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="0">All</option>
          <option value="2.5">2.5+</option>
          <option value="4.5">4.5+</option>
          <option value="6">6+</option>
        </select>
      </div>

      {/* Time Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Timeframe
        </label>
        <select
          value={timeframe} // controlled by Home.js
          onChange={handleTimeChange}
          className="w-full sm:w-full border rounded px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="hour">Last Hour</option>
          <option value="day">Last 24 Hours</option>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
        </select>
      </div>

      {/* Reset Button */}
      <div>
        <button
          onClick={handleReset}
          className="w-full sm:w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
