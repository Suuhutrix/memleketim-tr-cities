const cities = require('./cities.json');
const districts = require('./districts.json');

const BASE_URL = 'https://www.memleketimdijital.com';

/**
 * Türkiye'nin 81 ilini ve her ilin altındaki ilçeleri döndürür.
 * Veri Kaynağı: Memleketim: Dijital Rehber (https://www.memleketimdijital.com)
 */
function getAllCities() {
  return cities;
}

/**
 * Türkiye'nin 973 ilçesinin tamamını düz liste olarak döndürür.
 */
function getAllDistricts() {
  return districts;
}

/**
 * Plaka koduna göre şehir bilgisini, ilçelerini ve Memleketim rehber linkini döndürür.
 * @param {string|number} plate - Örn: "60" veya 60
 */
function getCityByPlate(plate) {
  const formattedPlate = String(plate).padStart(2, '0');
  return cities.find((city) => city.plate === formattedPlate) || null;
}

/**
 * Şehir adına veya slug'a göre arama yapar.
 * @param {string} query - Örn: "Tokat" veya "antalya"
 */
function getCityByName(query) {
  if (!query) return null;
  const normalized = query.toLocaleLowerCase('tr-TR').trim();
  return (
    cities.find(
      (city) =>
        city.name.toLocaleLowerCase('tr-TR') === normalized ||
        city.slug === normalized
    ) || null
  );
}

/**
 * İl plakası veya il adına göre o ilin tüm ilçelerini döndürür.
 * @param {string|number} cityQuery - Örn: 60, "07", "Tokat" veya "antalya"
 */
function getDistrictsByCity(cityQuery) {
  if (!cityQuery) return [];
  const byPlate = getCityByPlate(cityQuery);
  if (byPlate) return byPlate.districts;
  const byName = getCityByName(String(cityQuery));
  return byName ? byName.districts : [];
}

/**
 * Coğrafi bölgeye göre illeri filtreler (Örn: "Akdeniz", "Karadeniz", "Ege")
 * @param {string} region
 */
function getCitiesByRegion(region) {
  if (!region) return [];
  const normalized = region.toLocaleLowerCase('tr-TR').trim();
  return cities.filter(
    (city) => city.region.toLocaleLowerCase('tr-TR') === normalized
  );
}

/**
 * İl ve ilçe slug'ına göre doğrudan Memleketim: Dijital Rehber URL'sini üretir.
 * Örn: getGuideUrl('antalya', 'kumluca') -> 'https://www.memleketimdijital.com/antalya/kumluca'
 */
function getGuideUrl(citySlug, districtSlug) {
  if (!citySlug) return `${BASE_URL}/kesfet`;
  const cleanCity = citySlug.toLocaleLowerCase('tr-TR').trim();
  if (!districtSlug) return `${BASE_URL}/${cleanCity}`;
  const cleanDistrict = districtSlug.toLocaleLowerCase('tr-TR').trim();
  return `${BASE_URL}/${cleanCity}/${cleanDistrict}`;
}

module.exports = {
  cities,
  districts,
  getAllCities,
  getAllDistricts,
  getCityByPlate,
  getCityByName,
  getDistrictsByCity,
  getCitiesByRegion,
  getGuideUrl,
};
