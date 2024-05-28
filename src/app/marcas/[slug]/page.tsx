import ApiImage from "@/components/ApiImage";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import universalSlugify from "@/helpers/universalSlugify";
import { Marca } from "@/types/marca";
import SocialIconMap from "@/components/socialNetworks/socialIconMap";
import BlockRendererClient from "@/helpers/blockRendererClient";

export async function generateStaticParams() {
  const brands = await fetchDataFromApi<Marca[]>("marcas");

  return brands?.map((brand) => {
    return {
      slug: universalSlugify(brand.attributes.Marca),
    };
  });
}

export default async function BrandPage({
  params,
}: {
  params: { slug: string };
}) {
  //since this api call is already cached, reusing it is better than calling another API endpoint
  const brands = await fetchDataFromApi<Marca[]>("marcas");

  const thisBrand = brands.find(
    (brand) => universalSlugify(brand.attributes.Marca) === params?.slug,
  )!;
  const { Sobre, Logotipo, Redes, Marca } = thisBrand?.attributes;
  return (
    <div className="container mx-auto mb-20 max-w-screen-xl px-8">
      <section>
        {Sobre.map((section, i, arr) => {
          const { Imagem, corpo, Titulo } = section;

          return (
            <div
              key={universalSlugify(Titulo)}
              className={
                (i % 2 && "flex-row-reverse") +
                " my-20 flex max-h-[800px] items-center justify-between"
              }
            >
              <div className="flex h-full w-[600px] flex-col items-center gap-4">
                <ApiImage
                  image={Imagem.data}
                  contentStyles="object-contain h-full w-full"
                />
              </div>
              <div className="flex w-[540px] flex-col px-8">
                {i === 0 && (
                  <header className="relative mx-auto mb-12 w-fit">
                    <h1 className="absolute bottom-0 left-0 right-0 top-0 z-0 block">
                      {Marca}
                    </h1>
                    <ApiImage
                      image={Logotipo.data}
                      contentStyles="relative top-0 left-0 z-10 bg-[#F5F5F5] h-full w-full max-h-24 max-w-[600px] object-contain"
                    />
                  </header>
                )}
                <h2 className=" mb-4 text-3xl  text-primary">{Titulo}</h2>
                <div className="text-justify">
                  <BlockRendererClient content={corpo} />
                </div>
                {i === 0 && (
                  <div className="my-12 flex h-9 items-center justify-center gap-4">
                    {Redes.map((rede) => {
                      return (
                        <a key={rede?.Rede} href={rede?.URL} target="_blank">
                          <SocialIconMap
                            aria-label={"ícone da rede " + rede?.Rede}
                            networkTitle={rede?.Rede}
                            iconStyle="h-8 object-contain fill-primary w-8"
                          />
                        </a>
                      );
                    })}
                  </div>
                )}
                {i === arr.length - 1 && (
                  <button
                    className={
                      "btn btn-primary mx-auto w-72" +
                      (arr.length === 1 ? " " : " mt-12")
                    }
                  >
                    Vejas os produtos
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
