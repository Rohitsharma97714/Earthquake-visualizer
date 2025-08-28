// src/components/EarthquakeMarker.js
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import formatDate from "../utils/formatDate";

// Custom marker colors based on magnitude
const getIcon = (magnitude) =>
  L.divIcon({
    className: "custom-icon",
    html: `<div style="
        background:${magnitude >= 5 ? "#dc2626" : magnitude >= 3 ? "#f97316" : "#16a34a"};
        width:14px;
        height:14px;
        border-radius:50%;
        border:2px solid white;
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
      "></div>`,
  });

const EarthquakeMarker = ({ earthquake }) => {
  const { mag, place, time } = earthquake.properties;
  const [lng, lat] = earthquake.geometry.coordinates;

  return (
    <Marker position={[lat, lng]} icon={getIcon(mag)}>
      <Popup>
        <div className="p-2 text-sm max-w-[220px] sm:max-w-xs md:max-w-sm break-words">
          <p className="font-semibold text-gray-800">
            Magnitude:{" "}
            <span
              className={`${
                mag >= 5 ? "text-red-600" : mag >= 3 ? "text-orange-500" : "text-green-600"
              }`}
            >
              {mag}
            </span>
          </p>
          <p className="text-gray-700">{place}</p>
          <p className="text-gray-500 text-xs">{formatDate(time)}</p>
        </div>
      </Popup>
    </Marker>
  );
};

export default EarthquakeMarker;
