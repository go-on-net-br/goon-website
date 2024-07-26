"use client";
import BlockRendererClient from "@/helpers/blockRendererClient";
import { TermoEAviso } from "@/types/termo-e-aviso";
import { useState } from "react";

export default function TermsTabs({ apiData }: { apiData: TermoEAviso }) {
  const [selectedTab, setSelectedTab] = useState("avisos");

  const { Avisos, TermoEGarantia } = apiData.attributes;

  const selectedTabStyles =
    "border-b-4 text-center w-fit font-semibold border-primary";
  const unselectedTabStyles =
    "border-b-4 text-center w-fit font-light border-white cursor-pointer";

  return (
    <>
      <div className="flex w-full justify-around text-2xl font-semibold text-primary md:text-4xl">
        <h2
          onClick={() => setSelectedTab("avisos")}
          className={
            selectedTab === "avisos" ? selectedTabStyles : unselectedTabStyles
          }
        >
          Avisos
        </h2>
        <h2
          onClick={() => setSelectedTab("termos")}
          className={
            selectedTab === "termos" ? selectedTabStyles : unselectedTabStyles
          }
        >
          Termos e Garantia
        </h2>
      </div>
      <div>
        {selectedTab === "avisos" && (
          <div className="my-8 flex flex-col gap-8">
            {/* Avisos */}
            {Avisos?.map((aviso, i) => (
              <div key={"aviso_" + i}>
                <h3 className="text-lg font-semibold text-primary">
                  {aviso.Titulo}
                </h3>
                <p>{aviso.Corpo}</p>
              </div>
            ))}
          </div>
        )}
        {selectedTab === "termos" && (
          <div className="my-8 flex flex-col gap-8">
            {/* Termos */}
            <div>
              <BlockRendererClient content={TermoEGarantia} />
            </div>
          </div>
        )}
        <a href="tel:(11)4328-8808" className="btn btn-primary btn-lg w-full">
          SAC (11) 4328-8808
        </a>
      </div>
    </>
  );
}
