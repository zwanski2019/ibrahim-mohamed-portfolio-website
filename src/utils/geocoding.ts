// Geocoding utility for converting location strings to coordinates
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface GeocodingResult {
  coordinates: Coordinates;
  formatted_address: string;
}

// Using OpenStreetMap Nominatim API (free, no API key required)
export const geocodeLocation = async (location: string): Promise<GeocodingResult | null> => {
  try {
    const encodedLocation = encodeURIComponent(location);
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodedLocation}&limit=1&addressdetails=1`
    );
    
    if (!response.ok) {
      throw new Error('Geocoding service unavailable');
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      const result = data[0];
      return {
        coordinates: {
          latitude: parseFloat(result.lat),
          longitude: parseFloat(result.lon)
        },
        formatted_address: result.display_name
      };
    }
    
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
};

// Tunisia default coordinates (for fallback)
export const TUNISIA_CENTER: Coordinates = {
  latitude: 34.0,
  longitude: 9.0
};

// Major Tunisian cities coordinates
export const TUNISIA_CITIES = [
  { name: "Tunis", latitude: 36.8065, longitude: 10.1815 },
  { name: "Sfax", latitude: 34.7406, longitude: 10.7603 },
  { name: "Sousse", latitude: 35.8256, longitude: 10.6369 },
  { name: "Gabes", latitude: 33.8815, longitude: 10.0982 },
  { name: "Bizerte", latitude: 37.2744, longitude: 9.8739 },
  { name: "Gafsa", latitude: 34.425, longitude: 8.784 },
  { name: "Monastir", latitude: 35.7772, longitude: 10.826 },
  { name: "Ben Arous", latitude: 36.7539, longitude: 10.2278 }
];