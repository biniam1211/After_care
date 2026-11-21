/**
 * California's 58 counties + ZIP → county helpers (client-side only).
 * ZIP prefixes are approximate for UX filtering — not legal residency proof.
 */

/** @type {string[]} */
export const CA_COUNTIES = [
  "Alameda", "Alpine", "Amador", "Butte", "Calaveras", "Colusa", "Contra Costa",
  "Del Norte", "El Dorado", "Fresno", "Glenn", "Humboldt", "Imperial", "Inyo",
  "Kern", "Kings", "Lake", "Lassen", "Los Angeles", "Madera", "Marin", "Mariposa",
  "Mendocino", "Merced", "Modoc", "Mono", "Monterey", "Napa", "Nevada", "Orange",
  "Placer", "Plumas", "Riverside", "Sacramento", "San Benito", "San Bernardino",
  "San Diego", "San Francisco", "San Joaquin", "San Luis Obispo", "San Mateo",
  "Santa Barbara", "Santa Clara", "Santa Cruz", "Shasta", "Sierra", "Siskiyou",
  "Solano", "Sonoma", "Stanislaus", "Sutter", "Tehama", "Trinity", "Tulare",
  "Tuolumne", "Ventura", "Yolo", "Yuba",
];

/** Major county ZIP 3-digit prefixes for “near me” filtering. */
const ZIP3_TO_COUNTY = {
  900: "Los Angeles", 901: "Los Angeles", 902: "Los Angeles", 903: "Los Angeles",
  904: "Los Angeles", 905: "Los Angeles", 906: "Los Angeles", 907: "Los Angeles",
  908: "Los Angeles", 910: "Los Angeles", 911: "Los Angeles", 912: "Los Angeles",
  913: "Los Angeles", 914: "Los Angeles", 915: "Los Angeles", 916: "Los Angeles",
  917: "Los Angeles", 918: "Los Angeles",
  920: "San Diego", 921: "San Diego",
  922: "Riverside", 923: "San Bernardino", 924: "San Bernardino",
  925: "Riverside", 926: "Orange", 927: "Orange", 928: "Orange",
  930: "Ventura", 931: "Santa Barbara", 932: "Kern", 933: "Kern",
  934: "San Luis Obispo", 935: "Los Angeles",
  936: "Fresno", 937: "Fresno", 938: "Fresno",
  939: "Monterey", 940: "San Mateo", 941: "San Francisco",
  943: "Santa Clara", 944: "San Mateo", 945: "Alameda", 946: "Alameda",
  947: "Alameda", 948: "Contra Costa", 949: "Marin", 950: "Santa Clara",
  951: "Santa Clara", 952: "San Joaquin", 953: "Stanislaus", 954: "Sonoma",
  955: "Humboldt", 956: "Sacramento", 957: "Sacramento", 958: "Sacramento",
  959: "Butte", 960: "Shasta", 961: "Nevada",
};

/**
 * @param {string} zip
 * @returns {string | null}
 */
export function countyFromZip(zip) {
  const digits = String(zip || "").replace(/\D/g, "");
  if (digits.length < 3) return null;
  return ZIP3_TO_COUNTY[digits.slice(0, 3)] || null;
}
