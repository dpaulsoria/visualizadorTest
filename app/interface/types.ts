import { Feature, Geometry } from 'geojson';

export enum GeometryType {
  MultiPolygon = 'MultiPolygon',
  Polygon = 'Polygon',
  Point = 'Point'
}

export interface geodata extends Feature<Geometry> {
  properties: {
    country: string;
    province: string;
    iso_1: string;
    iso_2: string;
  };
}

export interface ClubsByProvince {
  [key: string]: string[];
}


export interface GeoJSONdata {
  type: string;
  features: geodata[];
}
