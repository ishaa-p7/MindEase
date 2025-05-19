import fetch from 'node-fetch';
import NodeGeocoder from 'node-geocoder';

export const getPsychiatristsByCity = async (req, res) => {
  try {
    const { city } = req.query;
    if (!city) return res.status(400).json({ message: 'City is required' });

    // 1. Geocode the city name to get lat/lon
    const geocoder = NodeGeocoder({ provider: 'openstreetmap' });
    const [location] = await geocoder.geocode(city);
    if (!location) return res.status(404).json({ message: 'City not found' });

    const { latitude, longitude } = location;

    // 2. Build Overpass QL query to search for psychiatrists near the city center
    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["healthcare:speciality"="psychiatry"](around:10000,${latitude},${longitude});
        node["amenity"="clinic"](around:10000,${latitude},${longitude});
        node["healthcare"="doctor"](around:10000,${latitude},${longitude});
        node["medical_specialty"="psychiatry"](around:10000,${latitude},${longitude});
      );
      out body;
    `;

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      body: overpassQuery,
    });

    if (!response.ok) throw new Error('Failed to fetch from Overpass API');

    const data = await response.json();

    if (!data.elements || data.elements.length === 0) {
      return res.status(404).json({ message: 'No psychiatrists found in this city' });
    }

    // 3. Format and return the data
    const results = data.elements.map((el) => ({
      name: el.tags?.name || 'Unknown',
      address: el.tags?.['addr:full'] || el.tags?.['addr:street'] || 'No address available',
      lat: el.lat,
      lon: el.lon,
    }));

    res.json(results.slice(0, 10));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
