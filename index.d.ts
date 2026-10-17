export interface Coordinates {
  lat: number;
  lng: number;
}

export interface CityDistrictItem {
  id: number;
  name: string;
  slug: string;
  guideUrl: string;
}

export interface City {
  id: number;
  plate: string;
  name: string;
  slug: string;
  region: string;
  phoneCode: string;
  coordinates: Coordinates;
  districtCount: number;
  guideUrl: string;
  exploreUrl: string;
  districts: CityDistrictItem[];
}

export interface District {
  id: number;
  cityId: number;
  plate: string;
  cityName: string;
  citySlug: string;
  name: string;
  slug: string;
  guideUrl: string;
  exploreUrl: string;
}

export const cities: City[];
export const districts: District[];

export function getAllCities(): City[];
export function getAllDistricts(): District[];
export function getCityByPlate(plate: string | number): City | null;
export function getCityByName(query: string): City | null;
export function getDistrictsByCity(cityQuery: string | number): CityDistrictItem[];
export function getCitiesByRegion(region: string): City[];
export function getGuideUrl(citySlug: string, districtSlug?: string): string;
