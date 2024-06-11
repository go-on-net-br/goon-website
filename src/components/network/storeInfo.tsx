import showRoomAudio from "../../../public/showRoomAudio.webp";
import showRoomAudioAutomacao from "../../../public/showRoomAudioAutomacao.webp";
import showRoomAutomacao from "../../../public/showRoomAutomacao.webp";
import addHttpsIfNotPresent from "@/helpers/addHttpsIfNotPresent";
import { calculateDistance } from "@/helpers/sortByPointDistance";
import { Revenda } from "@/types/revenda";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function StoreInfo({
  reseller,
  setMapCenter,
  userMarkerCoords,
}: {
  reseller: Revenda;
  setMapCenter: Dispatch<SetStateAction<[number, number]>>;
  userMarkerCoords: [number, number];
}) {
  const {
    Titulo,
    Endereco,
    Telefone,
    Site,
    ShowroomAudio,
    ShowroomAutomacao,
    Email,
    Coordenadas,
  } = reseller?.attributes ?? {};

  const { lat = "", lng = "" } = Coordenadas ?? {};

  const resellerCoords = [parseFloat(lat), parseFloat(lng)];
  return (
    <div
      onClick={() => setMapCenter(resellerCoords as [number, number])}
      key={reseller?.id}
      className="cursor-pointer p-6 transition-all hover:bg-gray-200"
    >
      <h4 className="text-xl font-bold">{Titulo}</h4>
      <p className="text-sm italic mb-3">
        {calculateDistance(userMarkerCoords, resellerCoords)?.toFixed(2)}km de
        distância
      </p>
      <p className="whitespace-pre-line">{Endereco}</p>
      {(ShowroomAudio || ShowroomAutomacao) && (
        <div className="my-4 flex gap-2">
          {ShowroomAudio && (
            <Image
              src={showRoomAudio}
              alt="Medalha dizendo 'Revenda autorizada: show Room de Áudio'"
              className="object-contain"
            />
          )}
          {ShowroomAutomacao && (
            <Image
              src={showRoomAutomacao}
              alt="Medalha dizendo 'Revenda autorizada: show Room de Automação'"
              className="object-contain"
            />
          )}
          {ShowroomAudio && ShowroomAutomacao && (
            <Image
              src={showRoomAudioAutomacao}
              alt="Medalha dizendo 'Revenda autorizada: show Room de Áudio e Automação'"
              className="object-contain"
            />
          )}
        </div>
      )}
      <div className="flex flex-col">
        {Telefone && <p>{Telefone}</p>}
        {Email && <p>{Email}</p>}
        {Site && (
          <Link className="w-fit underline" href={addHttpsIfNotPresent(Site)}>
            {Site}
          </Link>
        )}
      </div>
    </div>
  );
}
