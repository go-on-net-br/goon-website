import ApiImage from "@/components/ApiImage";
import universalSlugify from "@/helpers/universalSlugify";
import SocialIconMap from "@/components/socialNetworks/socialIconMap";
import BlockRendererClient from "@/helpers/blockRendererClient";
import Link from "next/link";
import { Metadata, ResolvingMetadata } from "next";
import { Rede, RedesSociais } from "@/types/common";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import { Marca } from "@/types/marca";

export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const brandSlug = params?.slug;

  const brandData = await fetchDataFromApi<Marca>(`marcas/${brandSlug}`);

  const { Marca, Logotipo, Resumo } = brandData?.attributes;

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
  const brands = await fetchDataFromApi<Marca[]>(
    "marcas",
    "populate=deep",
    "prioridade:desc",
  );
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
  const { slug } = params;

  const brandData = await fetchDataFromApi<Marca>(
    `marcas/${slug}`,
    "populate=deep",
  );

  
  const { Sobre, Logotipo, Marca, Facebook, Instagram, LinkedIn, Youtube } =
  brandData?.attributes;
  console.log(Sobre)

  const Redes: RedesSociais[] = [
    { Rede: Rede.Facebook, URL: Facebook },
    { Rede: Rede.Instagram, URL: Instagram },
    { Rede: Rede.LinkedIn, URL: LinkedIn },
    { Rede: Rede.YouTube, URL: Youtube },
  ];
  return (
    <div className="container mx-auto mb-20 max-w-screen-xl md:my-10 md:px-8">
      <section>
        {Sobre.map((section, i, arr) => {
          const { Imagem, corpo, Titulo } = section;

          return (
            <div
              key={universalSlugify(Titulo)}
              className={
                (i % 2 ? "md:flex-row-reverse " : "md:flex-row ") +
                "my-10 flex flex-col first:mt-0 md:my-0 md:max-h-[800px] md:flex-row"
              }
            >
              <div className="flex min-h-[200px] w-full max-w-full flex-col justify-center overflow-hidden md:min-h-full md:w-[50%]">
                <ApiImage
                  image={Imagem.data}
                  contentStyles="object-cover md:h-full h-200px min-h-full min-w-full max-h-200px md:max-h-full"
                />
              </div>
              <div className="flex w-full max-w-full flex-col justify-center px-8 py-8 md:w-[50%] md:py-16">
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
                {i === 0 && Redes.some((rede) => rede.URL) && (
                  <div className="my-6 flex h-9 items-center justify-center gap-4 md:my-12">
                    {Redes.map((rede) => {
                      if (rede.URL) {
                        return (
                          <a key={rede?.Rede} href={rede?.URL} target="_blank">
                            <SocialIconMap
                              aria-label={"ícone da rede " + rede?.Rede}
                              networkTitle={rede?.Rede}
                              iconStyle="h-8 object-contain fill-primary w-8"
                            />
                          </a>
                        );
                      }
                    })}
                  </div>
                )}
                {i === arr.length - 1 && (
                  <Link
                    href={`/produtos?marca=${slug}`}
                    className="flex justify-center"
                  >
                    <button
                      className={
                        "btn btn-primary mx-auto w-72" +
                        (arr.length === 1 ? " " : " mt-12")
                      }
                    >
                      Veja os produtos
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
