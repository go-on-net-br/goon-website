"use client";

import "leaflet/dist/leaflet.css";
import { Revenda } from "@/types/revenda";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { icon } from "leaflet";
import AddressInput from "./addressInput";
import { useEffect, useState } from "react";
import { listClosestResellers } from "@/helpers/sortByPointDistance";
import StoreInfo from "./storeInfo";
import useMobileCheck from "@/hooks/useMobileCheck";
import { GestureHandling } from "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";

export default function NetworkMap({
  resellerData,
  brands,
}: {
  resellerData: Revenda[];
  brands: string[];
}) {
  const [brandSearched, setBrandSearched] = useState<string>("");

  const resellersWithBrands = resellerData.filter((reseller) => {
    return reseller?.attributes.marcas?.data?.some(
      (marca) =>
        brandSearched === "" || brandSearched === marca?.attributes?.Marca,
    );
  });

  const redMarker = icon({
    iconUrl: "/red-marker-icon.webp",
    shadowUrl: "marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [13, 40],
  });
  const blueMarker = icon({
    iconUrl: "/blue-marker-icon.webp",
    shadowUrl: "marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [13, 40],
    popupAnchor: [-3, -45],
  });

  const [userMarkerLocation, setUserMarkerLocation] = useState<
    [number, number]
  >([-23.55028, -46.63389]);

  const [mapCenter, setMapCenter] =
    useState<[number, number]>(userMarkerLocation);

  useEffect(() => {
    setMapCenter(userMarkerLocation);
  }, [userMarkerLocation]);

  function FlyMapTo({ coords }: { coords: [number, number] }) {
    const map = useMap();

    useEffect(() => {
      map.setView(coords, 13);
      map.addHandler("gestureHandling", GestureHandling);
      // @ts-expect-error typescript does not see additional handler here
      map.gestureHandling.enable();
    }, [map, coords]);

    return null;
  }

  const closestResellers = listClosestResellers(
    resellersWithBrands,
    userMarkerLocation,
    3,
  );

  function Results() {
    return (
      <>
        <div className="divider divider-primary hidden md:flex"></div>
        <section>
          <h3 className="mt-6 px-6 text-2xl font-bold text-primary md:px-0">
            Resultados
          </h3>
          <p className="px-6 text-sm font-light text-primary md:px-0">
            Mostrando três resultados mais próximos
          </p>
          <div className="flex flex-col text-goOnGrey">
            {closestResellers.map((reseller) => {
              return (
                <StoreInfo
                  userMarkerCoords={userMarkerLocation}
                  reseller={reseller}
                  setMapCenter={setMapCenter}
                  key={reseller?.id}
                />
              );
            })}
          </div>
        </section>
      </>
    );
  }

  function Filter() {
    return (
      <>
        <h2 className="text-2xl font-bold text-primary">
          Encontre a revenda
          <br />
          mais próxima de você
        </h2>
        <AddressInput setUserMarkerLocation={setUserMarkerLocation} />

        <h3 className="mb-4 mt-10 text-2xl font-bold text-primary">
          Filtrar por marca
        </h3>
        <select
          onChange={(e) => setBrandSearched(e.target.value)}
          value={brandSearched}
          className="select select-primary mb-4 w-full  max-w-sm bg-transparent text-primary"
        >
          <option value={""}>Todas marcas</option>
          {brands?.map((brand) => (
            <option key={"ProductFilterBy" + brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </>
    );
  }

  function Map() {
    return (
      <MapContainer
        center={[-23.55028, -46.63389]}
        zoom={13}
        scrollWheelZoom={true}
        className="min-h-[700px] w-full md:h-full md:min-h-[1000px]"
      >
        <FlyMapTo coords={mapCenter ?? userMarkerLocation} />
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          icon={redMarker}
          position={userMarkerLocation}
          eventHandlers={{
            click: () => {
              setMapCenter(userMarkerLocation);
            },
          }}
        />
        {closestResellers.map((reseller, i) => {
          if (reseller) {
            const { Coordenadas, Titulo } = reseller?.attributes;
            const { lat = "", lng = "" } = Coordenadas ?? {};
            const resellerCoords = [parseFloat(lat), parseFloat(lng)] as [
              number,
              number,
            ];
            return (
              <Marker
                key={i}
                position={resellerCoords}
                icon={blueMarker}
                eventHandlers={{
                  click: () => {
                    setMapCenter(resellerCoords);
                  },
                }}
              >
                <Popup>{Titulo}</Popup>
              </Marker>
            );
          }
        })}
      </MapContainer>
    );
  }

  const isMobile = useMobileCheck();

  return (
    <section className="container relative z-[1] -mt-10 flex flex-col rounded-3xl bg-white pt-16 md:mx-auto md:mb-16 md:max-w-screen-xl md:flex-row md:px-9 md:py-16">
      {!isMobile && (
        <>
          <div className="align-center mr-8 flex w-full flex-col px-9 md:w-2/3 md:px-0 md:align-top">
            <Filter />
            <Results />
          </div>
          <Map />
        </>
      )}
      {isMobile && (
        <>
          <div className="p-6 pt-0">
            <Filter />
          </div>
          <Map />
          <Results />
        </>
      )}
    </section>
  );
}
