"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function AddressInput() {
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | undefined>(undefined);
  const router = useRouter();
  const searchParams = useSearchParams();

  const fetchData = async () => {
    setLoading(true);
    const url = encodeURI(
      `https://nominatim.openstreetmap.org/search?format=json&q=${inputVal}, Brazil`,
    );
    return await fetch(url)
      .then((val) => val.json())
      .then((val) => {
        if (val?.length > 0) {
          const firstOccur = val?.[0];
          const { lat, lon } = firstOccur;
          const brand = searchParams.get("marca");
          router.push(
            `?lat=${lat}&lon=${lon}${brand ? `&marca=${brand}` : ""}`,
            {
              scroll: false,
            },
          );
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

  const disabledBtn = loading || inputVal?.length === 0;

  return (
    <div className="flex flex-col gap-4">
      <input
        value={inputVal}
        onChange={(e) => {
          setInputVal(e?.target?.value);
        }}
        className="input input-bordered input-primary mt-4 w-full rounded-lg"
        name="address"
        placeholder="Insira o logradouro"
      />
      <button
        className={
          "btn btn-md w-40 " +
          (disabledBtn ? "pointer-events-none !text-gray-600" : "btn-primary")
        }
        disabled={disabledBtn}
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
