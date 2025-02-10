"use client";
import BlockRendererClient from "@/helpers/blockRendererClient";
import { TermoEAviso } from "@/types/termo-e-aviso";
import Image from "next/image";
import { useState } from "react";
import minimalSeparator from "../../../public/minimal_separator.svg";

export default function TermsTabs({ apiData }: { apiData: TermoEAviso }) {
  const [selectedTab, setSelectedTab] = useState("avisos");

  const { Avisos, TermoEGarantia } = apiData.attributes;

  const selectedTabStyles =
    "border-b-4 text-center w-fit font-semibold border-goOnBlue";
  const unselectedTabStyles =
    "border-b-4 text-center w-fit font-light border-white cursor-pointer";

  return (
    <>
      <div className="flex w-full justify-around text-2xl font-semibold text-goOnBlue md:text-4xl">
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
                <h3 className="text-lg font-semibold text-goOnBlack">
                  {aviso.Titulo}
                </h3>
                <p>{aviso.Corpo}</p>
                <Image
                  src={minimalSeparator}
                  alt="separador"
                  className={
                    "mx-auto mt-8 w-7  brightness-0 " +
                    (i === Avisos.length - 1 ? "hidden" : "")
                  }
                />
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
        <a href="tel:(11)4328-8808" className="btn bg-goOnBlue text-primary hover:bg-goOnBlack btn-lg w-full">
          SAC (11) 4328-8808
        </a>
      </div>
    </>
  );
}
