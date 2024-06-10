import showRoomAudio from "../../../public/showRoomAudio.webp";
import showRoomAudioAutomacao from "../../../public/showRoomAudioAutomacao.webp";
import showRoomAutomacao from "../../../public/showRoomAutomacao.webp";
import addHttpsIfNotPresent from "@/helpers/addHttpsIfNotPresent";
import { Revenda } from "@/types/revenda";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export default function StoreInfo({
  reseller,
  setMapCenter,
}: {
  reseller: Revenda;
  setMapCenter: Dispatch<SetStateAction<[number, number]>>;
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
  return (
    <div
      onClick={() => setMapCenter([parseFloat(lat), parseFloat(lng)])}
      key={reseller?.id}
      className="cursor-pointer p-6 transition-all hover:bg-gray-200"
    >
      <h4 className="mb-1 text-xl font-bold">{Titulo}</h4>
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
          <Link className="underline w-fit" href={addHttpsIfNotPresent(Site)}>
            {Site}
          </Link>
        )}
      </div>
    </div>
  );
}
