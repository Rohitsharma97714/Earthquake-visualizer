import React, { useEffect } from "react";
import EarthquakeMarker from "./EarthquakeMarker";
import Legend from "./Legend";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.heat";
import L from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";

// Heatmap Layer Component
const HeatMapLayer = ({ earthquakes }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const points = earthquakes.map(eq => [
      eq.geometry.coordinates[1], // lat
      eq.geometry.coordinates[0], // lng
      eq.properties.mag           // intensity
    ]);

    const heatLayer = L.heatLayer(points, {
      radius: window.innerWidth < 640 ? 15 : 25, // smaller radius for mobile
      blur: window.innerWidth < 640 ? 10 : 15,
      maxZoom: 7,
      gradient: { 0.2: 'green', 0.4: 'yellow', 0.6: 'orange', 0.8: 'red' }
    });

    heatLayer.addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [earthquakes, map]);

  return null;
};

const MapView = ({ earthquakes, showHeatmap }) => {
  return (
    <div className="relative w-full h-[80vh] sm:h-screen">
      <MapContainer center={[20, 0]} zoom={2} className="h-full w-full" scrollWheelZoom>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {!showHeatmap && (
          <MarkerClusterGroup>
            {earthquakes.map(eq => (
              <EarthquakeMarker key={eq.id} earthquake={eq} />
            ))}
          </MarkerClusterGroup>
        )}

        {showHeatmap && <HeatMapLayer earthquakes={earthquakes} />}
      </MapContainer>

      {/* Legend stays on top, responsive */}
      <Legend />
    </div>
  );
};

export default MapView;
