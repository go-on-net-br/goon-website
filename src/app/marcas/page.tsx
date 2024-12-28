import ApiImage from "@/components/ApiImage";
import BlueBgBox from "@/components/blueBgBox";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import { buildMediaQPs } from "@/helpers/qpHelper";
import universalSlugify from "@/helpers/universalSlugify";
import { Marca } from "@/types/marca";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Marcas",
};

export default async function Marcas() {
  const brandsData = await fetchDataFromApi<Marca[]>(
    "marcas",
    `${buildMediaQPs("Logotipo")}&${buildMediaQPs("Capa")}&fields[0]=Marca&fields[1]=Resumo`,
    "prioridade:desc",
  );

  return (
    <>
      <section>
        <BlueBgBox
          bgImage="/suburbamNeighborhood.webp"
          boxStyles="w-screen h-[250px] md:pb-0 md:h-[350px] after:!opacity-[25%]"
        >
          <div className="mx-2 mt-8 text-center text-white md:mx-auto md:mt-20 md:w-[700px]">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Marcas</h1>
            <p className="text-lg font-light md:text-xl">
              Rodamos o mundo buscando as melhores empresas, com credibilidade,
              qualidade e produtos inovadores para tornar a casa dos brasileiros
              ainda mais inteligente e funcional.
            </p>
          </div>
        </BlueBgBox>
      </section>
      <section className="container relative z-[1] mx-auto max-w-screen-xl rounded-3xl bg-white px-8 pb-12 pt-8 md:-mt-16 md:px-0 md:py-12 md:pt-24">
        <div className="align-center flex flex-wrap justify-around gap-8 md:gap-16">
          {brandsData?.map((brand) => {
            const { Capa, Logotipo, Marca, Resumo } = brand.attributes;
            return (
              <Link
                href={"marcas/" + universalSlugify(Marca)}
                className="card w-96 cursor-pointer bg-base-100 shadow-xl transition-all hover:scale-105"
                key={Marca}
              >
                <figure>
                  <div className="flex h-72 w-full items-center justify-center overflow-hidden">
                    <ApiImage
                      image={Capa.data}
                      contentStyles="min-w-full min-h-full object-cover"
                    />
                  </div>
                </figure>
                <div className="card-body">
                  <div className="relative mx-auto w-fit">
                    <h2 className="absolute bottom-0 left-0 right-0 top-0 z-0 block">
                      {Marca}
                    </h2>
                    <ApiImage
                      image={Logotipo.data}
                      contentStyles="relative top-0 left-0 z-10 bg-white h-20 object-contain"
                    />
                  </div>
                  <p className="pt-2 text-sm md:text-base">{Resumo}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
