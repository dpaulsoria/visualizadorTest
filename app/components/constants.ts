import { LatLngBounds } from 'leaflet';

export const coordinates: [number, number] = [-1.8312, -78.1834];
export const zoom = 7;
export const height = '100vh';
export const width = '100%';
export const minZoom = 7;
export const maxZoom = 7.5;
export const maxBoundsViscosity = 1.0;
export const mapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

export const bounds = new LatLngBounds(
  [-5.015, -81.0], // Suroeste
  [1.5, -75.0] // Noreste
);
