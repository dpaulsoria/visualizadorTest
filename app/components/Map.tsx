// app/components/Map.tsx
'use client';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngBounds } from 'leaflet';
import { useEffect, useState } from 'react';
import * as shapefile from 'shapefile';
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
    fetch('/LIMITES-EC.zip')
      .then((res) => res.arrayBuffer())
      .then((buffer) => shapefile.open(buffer))
      .then(async (source) => {
        const features: any[] = [];
        const log = async (result: any): Promise<void> => {
          if (result.done) {
            setGeoJsonData(features);
            return Promise.resolve();
          }
          features.push(result.value);
          const result_2 = await source.read();
          return log(result_2);
        };
        const result = await source.read();
        return log(result);
      })
      .catch((err) => console.error('Error loading shapefile:', err));

    fetch('/provinces-data.json')
      .then((res) => res.json())
      .then((data) => setProvinceData(data))
      .catch((err) => console.error('Error loading province data:', err));
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
      {geoJsonData && (
        <GeoJSON data={geoJsonData} onEachFeature={onEachProvince} />
      )}
    </MapContainer>
  );
};

export default Map;
