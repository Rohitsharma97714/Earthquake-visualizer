import formatDate from "../utils/formatDate";
import Filter from "./Filter";

const Sidebar = ({
  earthquakes,
  onFilterChange,
  minMag,
  timeframe,
  onReset,
  showHeatmap,
  onToggleView,
  isOpen,
  onClose
}) => {
  return (
    <div
      className={`bg-gray-100 p-4 border-r overflow-y-auto h-screen fixed sm:relative z-[1000] top-0 left-0 transition-transform transform ${
        isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
      } w-80 sm:w-80`}
    >
      {/* Close button for mobile */}
      {isOpen && (
        <button
          onClick={onClose}
          className="sm:hidden mb-4 bg-gray-700 text-white px-3 py-1 rounded focus:outline-none"
        >
          Close
        </button>
      )}

      <h2 className="text-xl font-bold mb-4">Recent Earthquakes</h2>

      <Filter
        onFilterChange={onFilterChange}
        minMag={minMag}
        timeframe={timeframe}
        onReset={onReset}
      />

      <div className="mt-4">
        <button
          onClick={onToggleView}
          className="w-full bg-gray-700 hover:bg-gray-800 text-white font-semibold px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          {showHeatmap ? "Show Markers" : "Show Heatmap"}
        </button>
      </div>

      {earthquakes.length === 0 ? (
        <div className="p-4 text-center text-gray-700 font-medium mt-4">
          No earthquakes found for the selected filters.
        </div>
      ) : (
        <ul className="space-y-3 mt-4">
          {earthquakes.map(eq => (
            <li key={eq.id} className="p-3 bg-white shadow rounded hover:bg-gray-50">
              <div
                className={`font-semibold ${
                  eq.properties.mag >= 5
                    ? "text-red-600"
                    : eq.properties.mag >= 3
                    ? "text-orange-500"
                    : "text-green-600"
                }`}
              >
                Magnitude: {eq.properties.mag}
              </div>
              <div className="text-sm text-gray-700">{eq.properties.place}</div>
              <div className="text-xs text-gray-500">{formatDate(eq.properties.time)}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
