import { useEffect, useState } from "react";
import { fetchEarthquakes } from "../api/earthquakeService";
import MapView from "../components/MapView";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const [earthquakes, setEarthquakes] = useState([]);
  const [filteredQuakes, setFilteredQuakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const [minMag, setMinMag] = useState(0);
  const [timeframe, setTimeframe] = useState("day");
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar toggle

  // Toggle Heatmap
  const handleToggleView = () => setShowHeatmap(prev => !prev);

  // Toggle Sidebar for mobile
  const handleToggleSidebar = () => setSidebarOpen(prev => !prev);

  // Fetch data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchEarthquakes(timeframe);
        setEarthquakes(data);
        const filtered = data.filter(eq => eq.properties.mag >= minMag);
        setFilteredQuakes(filtered);
      } catch (err) {
        setError("Failed to load earthquake data.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [timeframe, minMag]);

  const handleFilterChange = (selectedMinMag, selectedTimeframe) => {
    setMinMag(selectedMinMag);
    setTimeframe(selectedTimeframe);
  };

  const handleResetFilters = () => {
    setMinMag(0);
    setTimeframe("day");
    setShowHeatmap(false);
  };

  if (loading)
    return <div className="flex items-center justify-center h-screen text-lg font-semibold">Loading earthquakes...</div>;

  if (error)
    return <div className="flex items-center justify-center h-screen text-red-600">{error}</div>;

  return (
    <div className="flex h-screen">
      {/* Mobile Hamburger */}
      <button
        onClick={handleToggleSidebar}
        className="sm:hidden fixed top-4 left-4 z-[1001] bg-gray-700 text-white px-3 py-2 rounded shadow-lg focus:outline-none"
      >
        {sidebarOpen ? "Close" : "Filters"}
      </button>

      {/* Sidebar */}
      <Sidebar
        earthquakes={filteredQuakes}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        minMag={minMag}
        timeframe={timeframe}
        showHeatmap={showHeatmap}
        onToggleView={handleToggleView}
        isOpen={sidebarOpen} // pass open state
        onClose={() => setSidebarOpen(false)}
      />

      {/* Map */}
      <div className="flex-1">
        <MapView earthquakes={filteredQuakes} showHeatmap={showHeatmap} />
      </div>
    </div>
  );
};

export default Home;
