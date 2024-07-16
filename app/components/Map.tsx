'use client';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  bounds,
  coordinates,
  zoom,
  height,
  width,
  minZoom,
  maxZoom,
  maxBoundsViscosity,
  mapUrl,
  attribution,
} from './constants';
import { useEffect, useState } from 'react';
import { ClubsByProvince } from '../interface/types';
import shp from 'shpjs';
import { Feature, Geometry, FeatureCollection } from 'geojson';
import React from 'react';
import Modal from './ModalProps';
import { PathOptions } from 'leaflet';

const shapefileUrls = ['geotest/gadm41_ECU_0.zip', 'geotest/gadm41_ECU_1.zip'];

const getColor = (province: string) => {
  const colors: { [key: string]: string } = {
    Azuay: '#ff0000',
    Bolívar: '#00ff00',
    Cañar: '#0000ff',
    Carchi: '#ff7800',
    Chimborazo: '#7fff00',
    Cotopaxi: '#00ffff',
    'El Oro': '#ff00ff',
    Esmeraldas: '#ffa500',
    Guayas: '#800080',
    Imbabura: '#00ff7f',
    Loja: '#ff6347',
    'Los Ríos': '#4682b4',
    Manabí: '#daa520',
    'Morona Santiago': '#cd5c5c',
    Napo: '#8a2be2',
    Orellana: '#5f9ea0',
    Pastaza: '#d2691e',
    Pichincha: '#b8860b',
    Sucumbíos: '#556b2f',
    Tungurahua: '#9932cc',
    'Zamora Chinchipe': '#ff1493',
    Galápagos: '#1e90ff',
    'Santo Domingo': '#ff4500',
    'Santa Elena': '#2e8b57',
  };
  return colors[province] || '#fff800'; // Color por defecto si no se encuentra la provincia
};

const Map: React.FC = () => {
  const [geoJsonData, setGeoJsonData] = useState<FeatureCollection<Geometry>>({
    type: 'FeatureCollection',
    features: [],
  });
  const [provinceData, setProvinceData] = useState<ClubsByProvince>({});
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const loadGeoJson = async () => {
      try {
        const allFeatures: Feature<Geometry, any>[] = [];

        for (const url of shapefileUrls) {
          const response = await fetch(url);
          if (!response.ok) {
            throw new Error(`Failed to fetch shapefile: ${url}`);
          }
          const arrayBuffer = await response.arrayBuffer();
          const geoJson = (await shp(
            arrayBuffer
          )) as FeatureCollection<Geometry>;
          console.log(`Raw GeoJSON data for ${url}:`, geoJson);
          allFeatures.push(...geoJson.features);
        }

        setGeoJsonData({ type: 'FeatureCollection', features: allFeatures });
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
        const data: ClubsByProvince = await res.json();
        console.log('Province data:', data);
        setProvinceData(data);
      } catch (err) {
        console.error('Error loading province data:', err);
      }
    };

    loadGeoJson();
    loadProvinceData();
  }, []);

  const onEachProvince = (feature: Feature<Geometry, any>, layer: any) => {
    layer.on({
      click: () => {
        const name = feature.properties.NAME_1;
        console.log('Clicked province:', name); // Debugging line
        setSelectedProvince(name);
        setModalVisible(true);
      },
    });
  };

  const style = (feature: Feature<Geometry, any>): PathOptions => {
    return {
      fillColor: getColor(feature.properties.NAME_1),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7,
    };
  };

  return (
    <>
      <MapContainer
        center={coordinates}
        zoom={zoom}
        minZoom={minZoom}
        maxZoom={maxZoom}
        maxBounds={bounds}
        maxBoundsViscosity={maxBoundsViscosity}
        style={{ height: height, width: width }}
      >
        <TileLayer url={mapUrl} attribution={attribution} />
        {geoJsonData.features.length > 0 && (
          <GeoJSON
            data={geoJsonData}
            onEachFeature={onEachProvince}
            // style={style}
          />
        )}
      </MapContainer>
      <Modal
        visible={modalVisible}
        province={selectedProvince}
        clubs={selectedProvince ? provinceData[selectedProvince] || [] : []}
        onClose={() => setModalVisible(false)}
      />
    </>
  );
};

export default Map;
