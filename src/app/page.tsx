import webinar from "../../public/webinar.svg";
import support from "../../public/support.svg";
import globe from "../../public/globe.svg";
import maintenance from "../../public/maintenance.svg";
import money from "../../public/money.svg";
import winnerBadge from "../../public/winnerBadge.svg";
import goOnSvg from "../../public/go_on_logo.svg";
import minimalSeparator from "../../public/minimal_separator.svg";
import ApiImage from "@/components/ApiImage";
import InfiniteScroll from "@/components/infiniteScroll";
import Badge, { BadgeProps } from "@/components/home/badge";
import Carousel from "@/components/home/carousel";
import HomeCards from "@/components/home/homeCards";
import ProjectsCarousel from "@/components/home/projectsCarousel";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import { buildMediaQPs } from "@/helpers/qpHelper";
import universalSlugify from "@/helpers/universalSlugify";
import { Home } from "@/types/home";
import { Marca } from "@/types/marca";
import { Projeto } from "@/types/projeto";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const homeData = await fetchDataFromApi<Home>("home");
  const brandsData = await fetchDataFromApi<Marca[]>(
    "marcas",
    `${buildMediaQPs("Logotipo")}&fields[0]=Marca`,
  );
  const projectsData = (
    await fetchDataFromApi<Projeto[]>(
      "projetos",
      `${buildMediaQPs("media")}&fields[0]=Titulo`,
    )
  ).sort((a, b) => {
    return a.attributes.createdAt > b.attributes.createdAt ? -1 : 1;
  });
  const { Carrossel } = homeData?.attributes ?? {};

  const badges: BadgeProps[] = [
    { src: winnerBadge, text: "Distribuição\nExclusiva", fontSize: "md" },
    { src: webinar, text: "Webinars E\nTreinamentos", fontSize: "sm" },
    { src: support, text: "Suporte\nEspecializado", fontSize: "sm" },
    { src: globe, text: "Segurança de\nImportação", fontSize: "sm" },
    { src: maintenance, text: "Assistência\nTécnica", fontSize: "md" },
    { src: money, text: "Condições\nEspeciais", fontSize: "md" },
  ];

  return (
    <>
      {/* <EmailPopUp /> */}
      <div className="bg-goOnBlack">
        <Carousel carousel={Carrossel} />
        <div className="flex w-full justify-center">
          <Image
            src={minimalSeparator}
            alt="separador"
            className="mx-auto mt-8 hidden w-7 md:block"
          />
        </div>
        <section className="container mx-auto my-24 flex max-w-screen-xl flex-col items-center gap-16 px-4 md:flex-row md:px-32">
          <Image
            src={goOnSvg}
            alt={"Logotipo da GoOn"}
            className="h-16 w-auto object-contain"
          />
          <div className="flex flex-col gap-4 text-center text-sm text-white md:text-start">
            <p className="font-semibold">
              Temos orgulho de ser uma das mais relevantes empresas de
              distribuição de produtos de áudio, vídeo e automação residencial
              do Brasil!
            </p>
            <p className="font-normal">
              Ao longo de nossa trajetória, cultivamos parcerias sólidas com os
              principais players do mercado global de automação residencial e
              sistemas de som. Essa rede de confiança nos permite oferecer ao
              mercado brasileiro produtos e soluções de última geração, sempre
              com a garantia de uma distribuição legal e transparente e repleta
              de benefícios.
            </p>
          </div>
        </section>
        <section className="container mx-auto mt-20 max-w-screen-xl px-4 md:px-0">
          <Badge badges={badges} white />
        </section>
        <section className="mb-16 mt-16 w-full md:mx-auto md:mb-28 md:px-0">
          <div className="flex w-full justify-center">
            <Image
              src={minimalSeparator}
              alt="separador"
              className="mx-auto mb-8 hidden h-20 w-7 md:block"
            />
          </div>
          <HomeCards />
        </section>
        <section>
          <div className="h-full w-full bg-goOnBlack">
            <div className=" container mx-auto h-[330px] max-w-screen-xl overflow-visible md:h-[470px]">
              <div className="mb-8 mt-8 w-full px-4 text-center text-white md:mb-24 md:mt-20">
                <Image
                  src={minimalSeparator}
                  alt="separador"
                  className="mx-auto mb-4 mt-8 w-7 md:hidden"
                />
                <h1 className="mb-4 w-full text-2xl font-bold uppercase md:text-6xl md:font-semibold">
                  Projetos referência
                </h1>
                <p className="mx-auto text-xs font-light md:text-xl">
                  <span className="font-medium">
                    Explore um universo de possibilidades e inspire-se com os
                    projetos de automação
                    <br className="hidden md:block" /> e sonorização que nossas
                    empresas parceiras criaram!
                  </span>
                  <br />
                  <br />
                  Nesta seleção especial, reunimos os melhores trabalhos
                  desenvolvidos por nossas empresas parceiras. Prepare-se para
                  se encantar com soluções inteligentes e criativas que
                  transformam ambientes residenciais, comerciais e industriais
                  em espaços mais funcionais, agradáveis e eficientes.
                </p>
              </div>
              <ProjectsCarousel projectsData={projectsData} />
            </div>
          </div>
          <div className="h-40 w-full bg-white"></div>
        </section>
        <div className="w-full bg-white">
          <section className="w-full pb-20 pt-32 md:pt-40">
            <Link href="marcas">
              <h2 className="mb-12 text-center text-3xl uppercase text-black md:text-4xl">
                Marcas <b className="font-bold">exclusivas</b>
              </h2>
            </Link>
            <InfiniteScroll>
              {brandsData?.map((brand) => {
                const { Logotipo, Marca } = brand.attributes;

                return (
                  <Link
                    href={`marcas/${universalSlugify(Marca)}`}
                    key={brand?.id}
                  >
                    <ApiImage
                      image={Logotipo.data}
                      contentStyles="object-contain mx-6 max-w-64 max-h-16 over"
                    />
                  </Link>
                );
              })}
            </InfiniteScroll>
          </section>
        </div>
      </div>
    </>
  );
}
