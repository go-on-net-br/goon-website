"use client";

import { Revenda } from "@/types/revenda";
import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function FinalMap({
  resellerData,
}: {
  resellerData: Revenda[];
}) {
  const Map = useMemo(
    () =>
      dynamic(() => import("./map"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    [],
  );
  return <Map resellerData={resellerData} />;
}
