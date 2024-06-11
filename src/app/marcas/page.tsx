import ApiImage from "@/components/ApiImage";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import universalSlugify from "@/helpers/universalSlugify";
import { Marca } from "@/types/marca";
import { Metadata } from "next";
import Link from "next/link";


export const metadata: Metadata = {
  title:'Marcas',
};

export default async function Marcas() {
  const brandsData = await fetchDataFromApi<Marca[]>("marcas");
  return (
    <div className="container mx-auto my-10 max-w-screen-xl px-8 md:my-20">
      <header className="mx-auto my-10 max-w-[890px] text-center text-primary md:my-20">
        <h1 className="w-full text-2xl font-bold uppercase md:w-fit md:text-5xl ">
          Distribuidores exclusivos{" "}
          <span className="font-normal normal-case">das</span>
          <br /> melhores marcas do mercado
        </h1>
        <p className="mt-6 font-light md:text-xl">
          Rodamos o mundo buscando as melhores empresas, com credibilidade,
          qualidade e produtos inovadores para tornar a casa dos brasileiros
          ainda mais inteligente e funcional.
        </p>
      </header>
      <section className="align-center mx-auto flex flex-wrap justify-center gap-8">
        {brandsData?.map((brand) => {
          const { Capa, Logotipo, Marca, Resumo } = brand.attributes;

          return (
            <Link
              href={"marcas/" + universalSlugify(Marca)}
              className="card w-96 cursor-pointer bg-base-100 shadow-xl transition-all hover:scale-105"
              key={Marca}
            >
              <figure>
                <ApiImage image={Capa.data} />
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
      </section>
    </div>
  );
}
