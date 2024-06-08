function calculateDistance(
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
  points: number[][],
  coords: number[],
): number[][] {
  return points.sort((a, b) => {
    const distanceA = calculateDistance(coords, a);
    const distanceB = calculateDistance(coords, b);

    if (distanceA === undefined || distanceB === undefined) {
      return 0;
    }

    return distanceA - distanceB;
  });
}

export function listClosestResellers(
  resellersCoords: number[][],
  locationCoords: number[],
  n = 3,
) {
  const sortedResellers = sortPointsByDistance(resellersCoords, locationCoords);
  return sortedResellers.slice(0, n);
}
