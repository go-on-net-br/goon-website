import { Revenda } from "@/types/revenda";

export function calculateDistance(
  coords1: number[],
  coords2: number[],
): number | undefined {
  const [lat1, lon1] = coords1;
  const [lat2, lon2] = coords2;

  if (
    lat1 === undefined ||
    lon1 === undefined ||
    lat2 === undefined ||
    lon2 === undefined
  ) {
    return undefined;
  }

  const R = 6371; // Radius of the Earth in kilometers
  const lat1Rad = (Math.PI * lat1) / 180;
  const lon1Rad = (Math.PI * lon1) / 180;
  const lat2Rad = (Math.PI * lat2) / 180;
  const lon2Rad = (Math.PI * lon2) / 180;

  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function sortPointsByDistance(
  resellerData: Revenda[],
  coords: number[],
): Revenda[] {
  return resellerData.sort((a, b) => {
    const aLat = a?.attributes?.Coordenadas?.lat;
    const aLng = a?.attributes?.Coordenadas?.lng;

    const bLat = b?.attributes?.Coordenadas?.lat;
    const bLng = b?.attributes?.Coordenadas?.lng;

    const pointsA = [
      parseFloat(!aLat || aLat === "null" ? "0.0" : aLat),
      parseFloat(!aLng || aLng === "null" ? "0.0" : aLng),
    ];
    const pointsB = [
      parseFloat(!bLat || bLat === "null" ? "0.0" : bLat),
      parseFloat(!bLng || bLng === "null" ? "0.0" : bLng),
    ];
    const distanceA = calculateDistance(coords, pointsA);
    const distanceB = calculateDistance(coords, pointsB);

    if (distanceA === undefined || distanceB === undefined) {
      return 0;
    }

    return distanceA - distanceB;
  });
}

export function listClosestResellers(
  resellerData: Revenda[],
  locationCoords: number[],
  n = 3,
) {
  const sortedResellers = sortPointsByDistance(resellerData, locationCoords);
  return sortedResellers.slice(0, n);
}
