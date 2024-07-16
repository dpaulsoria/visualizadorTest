export interface geodata {
  properties: {
    country: string
    province: string
    iso_1: string
    iso_2: string
  }
}

export interface ClubsByProvince {
  [province: string]: string[];
}