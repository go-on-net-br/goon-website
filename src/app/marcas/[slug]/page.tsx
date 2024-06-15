import ApiImage from "@/components/ApiImage";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import universalSlugify from "@/helpers/universalSlugify";
import { Marca } from "@/types/marca";
import SocialIconMap from "@/components/socialNetworks/socialIconMap";
import BlockRendererClient from "@/helpers/blockRendererClient";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const brands = await fetchDataFromApi<Marca[]>("marcas");
  const thisBrand = brands.find(
    (brand) => universalSlugify(brand?.attributes?.Marca) === params?.slug,
  );

  const { Marca, Logotipo, Resumo } = thisBrand?.attributes!;

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: Marca,
    description: Resumo,
    openGraph: {
      images: [Logotipo?.data?.attributes?.url, ...previousImages],
      type: "article",
      authors: "Go On",
    },
  };
}

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
  const { slug } = params;

  const thisBrand = brands.find(
    (brand) => universalSlugify(brand.attributes.Marca) === slug,
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
                (i % 2 ? "md:flex-row-reverse " : "md:flex-row ") +
                "my-10 flex flex-col items-center justify-between md:my-20 md:max-h-[800px] md:flex-row"
              }
            >
              <div className="flex h-full w-full flex-col items-center gap-4 md:w-[600px]">
                <ApiImage
                  image={Imagem.data}
                  contentStyles="object-contain h-full w-full"
                />
              </div>
              <div className="flex w-full flex-col px-8 py-8 md:w-[540px] md:py-0">
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
                <h2 className=" mb-4 text-center  text-3xl text-primary md:text-start">
                  {Titulo}
                </h2>
                <div className="text-justify">
                  <BlockRendererClient content={corpo} />
                </div>
                {i === 0 && (
                  <div className="my-6 flex h-9 items-center justify-center gap-4 md:my-12">
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
                  <Link href={`/produtos?marca=${slug}`}>
                    <button
                      className={
                        "btn btn-primary mx-auto w-72" +
                        (arr.length === 1 ? " " : " mt-12")
                      }
                    >
                      Vejas os produtos
                    </button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
