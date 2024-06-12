"use client";
import BlockRendererClient from "@/helpers/blockRendererClient";
import ProductsCarousel from "./carousel";
import universalSlugify from "@/helpers/universalSlugify";
import { Produto } from "@/types/produto";
import { useState } from "react";

export default function ProductsDialog({
  product,
}: {
  readonly product: Produto;
}) {
  const [selectedTab, setSelectedTab] = useState("chars");
  const [tabContent, setTabContent] = useState(
    product.attributes.Caracteristicas,
  );

  function changeTab(tab: string) {
    setSelectedTab(tab);
    switch (tab) {
      case "chars":
        setTabContent(product.attributes.Caracteristicas);
        break;
      case "specs":
        setTabContent(product.attributes.Especificacoes);
        break;
    }
  }

  const selectedTabStyles =
    "text-xl font-semibold text-primary border-b-4 border-primary hover:cursor-pointer";
  const inactiveTabStyles =
    "text-xl font-light text-goOnGrey border-b-4 border-white hover:cursor-pointer";

  return (
    <>
      <div className=" modal-box flex min-w-fit max-w-3xl flex-row gap-4">
        {/* Carrossel */}
        <div className="card flex w-96 min-w-96 flex-col justify-center bg-white">
          <ProductsCarousel media={product.attributes.FotoseVideos.data} />
        </div>

        {/* Informações */}
        <div className="flex w-96 flex-col items-center  gap-6">
          <div className="flex w-full flex-col items-start">
            <h2 className="w-full text-4xl font-bold text-primary">
              {product.attributes.Titulo}
            </h2>
            <div className="w-full border-t border-goOnGrey  font-light italic text-goOnGrey">
              <p>
                Empresa:{" "}
                <span className="font-semibold not-italic">
                  {product.attributes.marca?.data.attributes.Marca}
                </span>{" "}
                <span className="not-italic">|</span> Categoria:{" "}
                <span className="font-semibold not-italic">
                  {product.attributes.categoria?.data.attributes.Titulo}
                </span>
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-around">
              <h3
                onClick={() => changeTab("chars")}
                className={
                  selectedTab === "chars"
                    ? selectedTabStyles
                    : inactiveTabStyles
                }
              >
                Características
              </h3>
              <h3
                onClick={() => changeTab("specs")}
                className={
                  selectedTab === "specs"
                    ? selectedTabStyles
                    : inactiveTabStyles
                }
              >
                Especificações
              </h3>
            </div>
            <BlockRendererClient content={tabContent}></BlockRendererClient>
          </div>
          <a
            href="/rede-credenciada"
            className="btn btn-primary w-fit uppercase"
          >
            Onde comprar
          </a>
          <a
            href={
              "/projetos?marca=" +
              universalSlugify(
                product.attributes.marca?.data?.attributes?.Marca,
              )
            }
            className="w-fit border-b-2 border-primary font-semibold text-primary hover:cursor-pointer"
          >
            Veja essa marca em projetos
          </a>
        </div>
      </div>
    </>
  );
}
