// app/components/Map.tsx
'use client';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngBounds } from 'leaflet';
import { useEffect, useState } from 'react';
import { geodata, ClubsByProvince } from '../interface/types';

const x = -1.8312;
const y = -78.1834;
const coordinates: [number, number] = [x, y];
const zoom = 7;
const height = '100vh';
const width = '100%';
const minZoom = 7;
const maxZoom = 7.5;
const maxBoundsViscosity = 1.0;
const mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

// Coordenadas aproximadas de los límites de Ecuador
const bounds = new LatLngBounds(
  [-5.015, -81.0], // Suroeste
  [1.5, -75.0] // Noreste
);

const Map: React.FC = () => {
  const [geoJsonData, setGeoJsonData] = useState<any>(null);
  const [provinceData, setProvinceData] = useState<ClubsByProvince>({});

  useEffect(() => {
    const loadGeoJson = async () => {
      try {
        const res = await fetch('/ecuador-provinces.geojson');
        if (!res.ok) {
          throw new Error('Failed to fetch GeoJSON');
        }
        const data = await res.json();
        console.log('Raw GeoJSON data:', data);
        if (data && data.features && data.features.length > 0) {
          // Verificación adicional para asegurarse de que las coordenadas sean válidas
          const validFeatures = data.features.filter((feature: any) => {
            if (feature.geometry && feature.geometry.coordinates) {
              return feature.geometry.coordinates.every(
                (coord: any) => !isNaN(coord[0]) && !isNaN(coord[1])
              );
            }
            return false;
          });
          console.log('Valid GeoJSON features:', validFeatures);
          setGeoJsonData({ ...data, features: validFeatures });
        } else {
          console.error('GeoJSON data is invalid or empty');
        }
      } catch (err) {
        console.error('Error loading GeoJSON:', err);
      }
    };

    const loadProvinceData = async () => {
      try {
        const res = await fetch('/provinces-data.json');
        if (!res.ok) {
          throw new Error('Failed to fetch province data');
        }
        const data = await res.json();
        console.log('Province data:', data);
        setProvinceData(data);
      } catch (err) {
        console.error('Error loading province data:', err);
      }
    };

    loadGeoJson();
    loadProvinceData();
  }, []);

  const onEachProvince = (province: geodata, layer: any) => {
    layer.on({
      click: () => {
        const name = province.properties.province;
        const data = provinceData[name] || [];
        alert(`Province: ${name}\nClubs: ${data.join(', ')}`);
      },
    });
  };

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
      <TileLayer url={mapUrl} attribution={attribution} />
      {geoJsonData &&
        geoJsonData.features &&
        geoJsonData.features.length > 0 && (
          <GeoJSON data={geoJsonData} onEachFeature={onEachProvince} />
        )}
    </MapContainer>
  );
};

export default Map;
