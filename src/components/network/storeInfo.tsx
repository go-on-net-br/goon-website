import showRoomAudio from "../../../public/showRoomAudio.svg";
import showRoomAudioAutomacao from "../../../public/showRoomAudioAutomacao.svg";
import showRoomAutomacao from "../../../public/showRoomAutomacao.svg";
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
    credenciamentoInicio,
    credenciamentoFim,
  } = reseller?.attributes ?? {};

  const credStartSplit = credenciamentoInicio
    ? credenciamentoInicio?.split("-")
    : "";
  const credEndSplit = credenciamentoFim ? credenciamentoFim?.split("-") : "";

  const { lat = "", lng = "" } = Coordenadas ?? {};

  const resellerCoords = [parseFloat(lat), parseFloat(lng)];
  return (
    <div
      onClick={() => setMapCenter(resellerCoords as [number, number])}
      key={reseller?.id}
      className="cursor-pointer p-6 transition-all hover:bg-gray-200"
    >
      <h4 className="text-xl font-bold">{Titulo}</h4>
      <p className="mb-3 text-sm italic">
        {calculateDistance(userMarkerCoords, resellerCoords)?.toFixed(2)}km de
        distância
      </p>
      <p className="whitespace-pre-line text-sm">{Endereco}</p>
      {(ShowroomAudio || ShowroomAutomacao) && (
        <div className="my-4 flex gap-2">
          {ShowroomAudio && (
            <Image
              src={showRoomAudio}
              alt="Medalha dizendo 'Revenda autorizada: show Room de Áudio'"
              className="h-24 w-24 object-contain"
            />
          )}
          {ShowroomAutomacao && (
            <Image
              src={showRoomAutomacao}
              alt="Medalha dizendo 'Revenda autorizada: show Room de Automação'"
              className="h-24 w-24 object-contain"
            />
          )}
        </div>
      )}
      <div className="flex flex-col text-sm">
        {Telefone && <p>{Telefone}</p>}
        {Email && <p>{Email}</p>}
        {Site && (
          <Link className="w-fit underline" href={addHttpsIfNotPresent(Site)}>
            {Site}
          </Link>
        )}
        {credenciamentoInicio && credenciamentoFim && (
          <p className="mt-4 text-sm font-bold">
            Revenda credenciada CONTROL4 em{" "}
            {`${credStartSplit[2]}/${credStartSplit[1]}/${credStartSplit[0]}`}{" "}
            com certificação válida até{" "}
            {`${credEndSplit[2]}/${credEndSplit[1]}/${credEndSplit[0]}`}
          </p>
        )}
      </div>
    </div>
  );
}
