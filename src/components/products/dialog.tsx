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

  function Carousel() {
    return <ProductsCarousel media={product.attributes.FotoseVideos.data} />;
  }

  return (
    <>
      <div className=" modal-box flex min-w-fit max-w-3xl flex-row gap-4">
        {/* Carrossel Dialog (Desktop) */}
        <div className="card hidden w-96 min-w-96 flex-col justify-center bg-white md:flex">
          <Carousel />
        </div>

        {/* Cabeçário */}
        <div className="flex w-full flex-col items-center gap-6 md:w-96">
          <div className="flex w-full flex-col items-start">
            <h2 className="w-full text-4xl font-bold text-primary">
              {product.attributes.Titulo}
            </h2>
            <div className="w-full border-t border-goOnGrey  font-light italic text-goOnGrey">
              <p>
                Empresa:{" "}
                <span className="font-semibold not-italic">
                  {product?.attributes?.marca?.data?.attributes?.Marca}
                </span>{" "}
                {product?.attributes?.categoria?.data?.attributes?.Titulo && (
                  <>
                    <span className="not-italic">|</span> Categoria:{" "}
                    <span className="font-semibold not-italic">
                      {product?.attributes?.categoria?.data?.attributes?.Titulo}
                    </span>
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Carrossel Botom Sheet (Mobile) */}
          <div className="flex max-w-full md:hidden">
            <Carousel />
          </div>

          {/* Informações */}

          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-around">
              {product?.attributes?.Caracteristicas && (
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
              )}
              {product?.attributes?.Especificacoes && (
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
              )}
            </div>
            <p className="whitespace-pre-line">{tabContent}</p>
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
          <div className="h-0 w-4 pb-2"></div>
        </div>
      </div>
    </>
  );
}
