"use client";

import "leaflet/dist/leaflet.css";
import { Revenda } from "@/types/revenda";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { icon } from "leaflet";
import AddressInput from "./addressInput";
import { useEffect, useState } from "react";
import { listClosestResellers } from "@/helpers/sortByPointDistance";

export default function NetworkMap({
  resellerData,
}: {
  resellerData: Revenda[];
}) {
  const coords = resellerData.map((reseller) => {
    const lat = parseFloat(reseller.attributes.Coordenadas?.lat ?? "");
    const lng = parseFloat(reseller.attributes.Coordenadas?.lng ?? "");
    return [lat, lng];
  });

  const redMarker = icon({
    iconUrl: "/red-marker-icon.png",
    shadowUrl: "marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [13, 40],
  });
  const blueMarker = icon({
    iconUrl: "/blue-marker-icon.png",
    shadowUrl: "marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [13, 40],
  });

  const [userMarkerLocation, setUserMarkerLocation] = useState<
    [number, number]
  >([-23.55028, -46.63389]);

  function FlyMapTo() {
    const map = useMap();

    useEffect(() => {
      map.setView(userMarkerLocation, 13);
    }, [map]);

    return null;
  }

  const closestResellers = listClosestResellers(coords, userMarkerLocation, 3);

  return (
    <section className="container relative z-[1] mx-auto -mt-10 mb-16 flex max-w-screen-xl rounded-3xl bg-white px-9 py-16">
      <div className="flex w-1/3 flex-col">
        <h2 className="text-2xl font-bold text-primary">
          Encontre a revenda
          <br />
          mais próxima de você
        </h2>
        <AddressInput setUserMarkerLocation={setUserMarkerLocation} />
      </div>
      <MapContainer
        center={[-23.55028, -46.63389]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-[700px] w-full"
      >
        <FlyMapTo />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={redMarker} position={userMarkerLocation} />
        {closestResellers.map((coord, i) => {
          if (coord) {
            return (
              <Marker
                key={i}
                position={[coord[0], coord[1]]}
                icon={blueMarker}
              ></Marker>
            );
          }
        })}
      </MapContainer>
    </section>
  );
}
