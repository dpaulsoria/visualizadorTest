// app/components/Map.tsx
'use client';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngBounds } from 'leaflet';

const x = -1.8312;
const y = -78.1834;
const coordinates: [number, number] = [x, y];
const zoom = 7;
const height = '100vh';
const width = '100%';
const minZoom = 7;
const maxZoom = 7.5;
const maxBoundsViscosity = 1.0
const mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Coordenadas aproximadas de los límites de Ecuador
const bounds = new LatLngBounds(
  [-5.015, -81.0], // Suroeste
  [1.5, -75.0] // Noreste
);

const Map: React.FC = () => {
  return (
    <MapContainer
      center={coordinates}
      zoom={zoom}
      minZoom={minZoom} // Zoom mínimo
      maxZoom={maxZoom} // Zoom máximo
      maxBounds={bounds} // Límites del mapa
      maxBoundsViscosity={maxBoundsViscosity} // Evitar que se salga de los límites
      style={{ height: height, width: width }}
    >
      <TileLayer
        url={mapUrl}
        attribution={attribution}
      />
    </MapContainer>
  );
};

export default Map;
