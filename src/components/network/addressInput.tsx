"use client";

import { Dispatch, SetStateAction, useRef, useState } from "react";

export default function AddressInput({
  setUserMarkerLocation,
}: {
  setUserMarkerLocation: Dispatch<SetStateAction<[number, number]>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);

  const fetchData = async () => {
    const address = inputRef?.current?.value;

    setLoading(true);
    const url = encodeURI(
      `https://nominatim.openstreetmap.org/search?format=json&q=${address}`,
    );
    return await fetch(url)
      .then((val) => val.json())
      .then((val) => {
        if (val?.length > 0) {
          const firstOccur = val?.[0];
          const { lat, lon } = firstOccur;
          setUserMarkerLocation([lat, lon]);
          setErrorMsg(undefined);
        } else {
          setErrorMsg("endereço não encontrado");
        }
      })
      .catch(() => {
        setErrorMsg("Falha na requisição");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        ref={inputRef}
        className="input input-bordered input-primary w-full rounded-lg"
        name="address"
      />
      <button
        className={
          "btn w-40 " + (loading ? "pointer-events-none" : "btn-primary")
        }
        onClick={async () => {
          await fetchData();
        }}
      >
        {loading ? (
          <>
            <span className="loading loading-spinner"></span>
            carregando
          </>
        ) : (
          "Enviar"
        )}
      </button>
      {errorMsg && <p className="text-xs text-red-500">{errorMsg}</p>}
    </div>
  );
}
