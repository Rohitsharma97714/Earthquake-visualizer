// src/api/earthquakeService.js
import axios from "axios";

const API_BASE = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary";

const endpoints = {
  hour: `${API_BASE}/all_hour.geojson`,
  day: `${API_BASE}/all_day.geojson`,
  week: `${API_BASE}/all_week.geojson`,
  month: `${API_BASE}/all_month.geojson`,
};

export const fetchEarthquakes = async (timeframe = "day") => {
  try {
    const response = await axios.get(endpoints[timeframe]);
    return response.data.features;
  } catch (error) {
    console.error("Error fetching earthquake data:", error);
    throw error;
  }
};
