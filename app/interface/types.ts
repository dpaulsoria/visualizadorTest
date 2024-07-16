export interface geodata {
  geometry: {
    coordinates: [[number, number][]],
    type: GeometryType
  },
  properties: {
    country: string
    province: string
    iso_1: string
    iso_2: string
  },
  type: string
}

export enum GeometryType {
  MultiPolygon = 'MultiPolygon',
  Polygon = 'Polygon',
  Point = 'Point'
}

export interface ClubsByProvince {
  [province: string]: string[];
}

export interface GeoJSONdata {
  type: string
  features: geodata[]
}