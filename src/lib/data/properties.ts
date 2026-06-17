import type { Property } from "@/lib/types";

/**
 * Representative slice of the 125-asset Northstar portfolio.
 * (A real deployment would page through the full set from the API.)
 */
export const properties: Property[] = [
  { id: "P-1001", name: "Northstar Tower", city: "Dallas", state: "TX", type: "Commercial", units: 420, occupancy: 96.4, revenue: 28400000, noi: 17600000, assetScore: 92, risk: "Low", capRate: 6.2 },
  { id: "P-1002", name: "Beacon Hill Residences", city: "Austin", state: "TX", type: "Residential", units: 312, occupancy: 97.8, revenue: 14200000, noi: 8300000, assetScore: 95, risk: "Low", capRate: 5.4 },
  { id: "P-1003", name: "Harbor Point Retail", city: "Miami", state: "FL", type: "Retail", units: 64, occupancy: 91.2, revenue: 9600000, noi: 5100000, assetScore: 81, risk: "Moderate", capRate: 6.8 },
  { id: "P-1004", name: "Riverside Logistics Park", city: "Phoenix", state: "AZ", type: "Industrial", units: 18, occupancy: 99.1, revenue: 12700000, noi: 8900000, assetScore: 88, risk: "Low", capRate: 5.9 },
  { id: "P-1005", name: "The Marlowe", city: "Los Angeles", state: "CA", type: "Residential", units: 280, occupancy: 94.6, revenue: 19800000, noi: 11200000, assetScore: 90, risk: "Low", capRate: 4.9 },
  { id: "P-1006", name: "Gateway Office Plaza", city: "Atlanta", state: "GA", type: "Commercial", units: 210, occupancy: 88.3, revenue: 13400000, noi: 7100000, assetScore: 74, risk: "Elevated", capRate: 7.1 },
  { id: "P-1007", name: "Sunset Crossing", city: "San Diego", state: "CA", type: "Retail", units: 52, occupancy: 95.5, revenue: 7300000, noi: 4200000, assetScore: 86, risk: "Low", capRate: 6.3 },
  { id: "P-1008", name: "Lakeshore Lofts", city: "Chicago", state: "IL", type: "Residential", units: 198, occupancy: 92.1, revenue: 11600000, noi: 6300000, assetScore: 79, risk: "Moderate", capRate: 5.6 },
  { id: "P-1009", name: "Summit Distribution Center", city: "Denver", state: "CO", type: "Industrial", units: 12, occupancy: 100.0, revenue: 9800000, noi: 7200000, assetScore: 93, risk: "Low", capRate: 5.7 },
  { id: "P-1010", name: "Park Avenue Suites", city: "New York", state: "NY", type: "Commercial", units: 340, occupancy: 90.7, revenue: 31200000, noi: 18900000, assetScore: 84, risk: "Moderate", capRate: 4.6 },
  { id: "P-1011", name: "Magnolia Gardens", city: "Charlotte", state: "NC", type: "Residential", units: 256, occupancy: 96.9, revenue: 12100000, noi: 7000000, assetScore: 91, risk: "Low", capRate: 5.5 },
  { id: "P-1012", name: "Coastal Bay Resort", city: "Tampa", state: "FL", type: "Hospitality", units: 180, occupancy: 78.4, revenue: 15800000, noi: 6400000, assetScore: 68, risk: "High", capRate: 7.9 },
  { id: "P-1013", name: "Tech Ridge Campus", city: "Austin", state: "TX", type: "Commercial", units: 160, occupancy: 97.2, revenue: 18900000, noi: 11800000, assetScore: 94, risk: "Low", capRate: 6.0 },
  { id: "P-1014", name: "Willow Creek Apartments", city: "Seattle", state: "WA", type: "Residential", units: 224, occupancy: 93.3, revenue: 16400000, noi: 9100000, assetScore: 87, risk: "Low", capRate: 5.1 },
  { id: "P-1015", name: "Ironworks Industrial", city: "Columbus", state: "OH", type: "Industrial", units: 9, occupancy: 86.5, revenue: 5400000, noi: 3100000, assetScore: 71, risk: "Elevated", capRate: 7.4 },
  { id: "P-1016", name: "Galleria Shops", city: "Houston", state: "TX", type: "Retail", units: 88, occupancy: 89.6, revenue: 10900000, noi: 5600000, assetScore: 76, risk: "Moderate", capRate: 6.9 },
  { id: "P-1017", name: "Aurora Heights", city: "Denver", state: "CO", type: "Residential", units: 188, occupancy: 95.8, revenue: 10800000, noi: 6200000, assetScore: 89, risk: "Low", capRate: 5.3 },
  { id: "P-1018", name: "Empire Logistics Hub", city: "Las Vegas", state: "NV", type: "Industrial", units: 14, occupancy: 90.2, revenue: 8100000, noi: 5300000, assetScore: 80, risk: "Moderate", capRate: 6.4 },
  { id: "P-1019", name: "The Fitzgerald", city: "New York", state: "NY", type: "Residential", units: 144, occupancy: 91.4, revenue: 22600000, noi: 12400000, assetScore: 82, risk: "Moderate", capRate: 4.3 },
  { id: "P-1020", name: "Brookfield Commons", city: "Nashville", state: "TN", type: "Retail", units: 46, occupancy: 97.1, revenue: 6800000, noi: 3900000, assetScore: 90, risk: "Low", capRate: 6.1 },
  { id: "P-1021", name: "Cypress Point Offices", city: "Orlando", state: "FL", type: "Commercial", units: 132, occupancy: 84.9, revenue: 9700000, noi: 4600000, assetScore: 70, risk: "Elevated", capRate: 7.6 },
  { id: "P-1022", name: "Highland Park Towers", city: "Dallas", state: "TX", type: "Residential", units: 268, occupancy: 98.2, revenue: 17300000, noi: 10400000, assetScore: 96, risk: "Low", capRate: 5.2 },
  { id: "P-1023", name: "Pacific Crest Mall", city: "Portland", state: "OR", type: "Retail", units: 102, occupancy: 82.7, revenue: 8900000, noi: 3800000, assetScore: 65, risk: "High", capRate: 8.2 },
  { id: "P-1024", name: "Stonebridge Warehouse", city: "Atlanta", state: "GA", type: "Industrial", units: 11, occupancy: 98.6, revenue: 7600000, noi: 5500000, assetScore: 91, risk: "Low", capRate: 5.8 },
  { id: "P-1025", name: "The Whitman", city: "San Francisco", state: "CA", type: "Residential", units: 176, occupancy: 92.8, revenue: 21400000, noi: 11900000, assetScore: 85, risk: "Moderate", capRate: 4.4 },
  { id: "P-1026", name: "Liberty Square Offices", city: "Chicago", state: "IL", type: "Commercial", units: 245, occupancy: 87.1, revenue: 16100000, noi: 8200000, assetScore: 73, risk: "Elevated", capRate: 7.0 },
  { id: "P-1027", name: "Desert Vista Apartments", city: "Phoenix", state: "AZ", type: "Residential", units: 212, occupancy: 96.3, revenue: 11900000, noi: 6900000, assetScore: 90, risk: "Low", capRate: 5.5 },
  { id: "P-1028", name: "Northgate Power Center", city: "Charlotte", state: "NC", type: "Retail", units: 58, occupancy: 93.4, revenue: 7900000, noi: 4400000, assetScore: 84, risk: "Low", capRate: 6.5 },
  { id: "P-1029", name: "Crossroads Fulfillment", city: "Dallas", state: "TX", type: "Industrial", units: 16, occupancy: 99.4, revenue: 13800000, noi: 9900000, assetScore: 95, risk: "Low", capRate: 5.6 },
  { id: "P-1030", name: "The Verandah", city: "Miami", state: "FL", type: "Hospitality", units: 220, occupancy: 81.6, revenue: 18200000, noi: 7900000, assetScore: 72, risk: "Elevated", capRate: 7.3 },
  { id: "P-1031", name: "Maple Grove Residences", city: "Austin", state: "TX", type: "Residential", units: 240, occupancy: 97.4, revenue: 13600000, noi: 8000000, assetScore: 93, risk: "Low", capRate: 5.3 },
  { id: "P-1032", name: "Union Station Offices", city: "Denver", state: "CO", type: "Commercial", units: 190, occupancy: 91.9, revenue: 15200000, noi: 8800000, assetScore: 86, risk: "Low", capRate: 6.1 },
  { id: "P-1033", name: "Seaside Promenade", city: "San Diego", state: "CA", type: "Retail", units: 70, occupancy: 94.8, revenue: 9100000, noi: 5200000, assetScore: 88, risk: "Low", capRate: 6.0 },
  { id: "P-1034", name: "Quantum Logistics", city: "Reno", state: "NV", type: "Industrial", units: 13, occupancy: 97.8, revenue: 9200000, noi: 6600000, assetScore: 92, risk: "Low", capRate: 5.7 },
  { id: "P-1035", name: "Heritage Place", city: "Nashville", state: "TN", type: "Residential", units: 204, occupancy: 95.1, revenue: 11200000, noi: 6500000, assetScore: 89, risk: "Low", capRate: 5.4 },
  { id: "P-1036", name: "Metro Center Plaza", city: "Atlanta", state: "GA", type: "Commercial", units: 178, occupancy: 85.6, revenue: 12000000, noi: 6000000, assetScore: 71, risk: "Elevated", capRate: 7.2 },
];

/** Portfolio composition counts (totals across all 125 assets). */
export const portfolioComposition = {
  Residential: 65,
  Commercial: 35,
  Industrial: 15,
  Retail: 10,
};
