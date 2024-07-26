import headsetIcon from "../../public/headset.svg";
import controllerIcon from "../../public/controller.svg";
import lockIcon from "../../public/lock.svg";
import smartHomeIcon from "../../public/smartHome.svg";
import soundIcon from "../../public/sound.svg";
import winnerBadgeIcon from "../../public/winnerBadge.svg";
import Badge from "@/components/home/badge";
import Carousel from "@/components/home/carousel";
import HomeCards from "@/components/home/homeCards";
import { Home } from "@/types/home";
import Image from "next/image";
import separator from "../../public/separator.svg";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import InfiniteScroll from "@/components/infiniteScroll";
import { Marca } from "@/types/marca";
import { Projeto } from "@/types/projeto";
import ApiImage from "@/components/ApiImage";
import Link from "next/link";
import universalSlugify from "@/helpers/universalSlugify";
import BlueBgBox from "@/components/blueBgBox";
import ProjectsCarousel from "@/components/home/projectsCarousel";
import EmailPopUp from "@/components/home/emailPopup";

export default async function HomePage() {
  const homeData = await fetchDataFromApi<Home>("home");
  const brandsData = await fetchDataFromApi<Marca[]>("marcas");
  const projectsData = (
    await fetchDataFromApi<Projeto[]>("projetos", "populate=*")
  ).sort((a, b) => {
    return a.attributes.createdAt > b.attributes.createdAt ? -1 : 1;
  });
  const { Carrossel } = homeData?.attributes ?? {};

  const badges = [
    { src: winnerBadgeIcon, text: "Distribuição\nExclusiva" },
    { src: smartHomeIcon, text: "Automação\nResidencial" },
    { src: soundIcon, text: "Sistema\nde Som" },
    { src: lockIcon, text: "Segurança\npara os projetos" },
    { src: controllerIcon, text: "Controle\nTotal" },
    { src: headsetIcon, text: "Suporte\nEspecializado" },
  ];

  return (
    <>
      <EmailPopUp />
      <div>
        <section className="container mx-auto mt-4 max-w-screen-xl md:mt-12">
          <Carousel carousel={Carrossel} />
        </section>
        <section className="container mx-auto mt-16 max-w-screen-xl px-4 md:px-0">
          <h2 className="  block w-fit text-center text-3xl font-bold text-primary md:mx-auto">
            Soluções para todos os seus projetos
          </h2>
          <Badge badges={badges} />
        </section>
        <section className="container mx-auto mt-16 max-w-screen-xl px-4 md:px-0">
          <HomeCards />
        </section>
        <Image
          src={separator}
          alt="separador"
          aria-label="separador"
          className="mx-auto my-28"
        />
        <section>
          <BlueBgBox
            bgImage="/manWithPhone.webp"
            boxStyles="w-screen h-[400px] md:h-[495px] after:!opacity-[20%] md:mb-56 overflow-visible mb-72"
          >
            <div className="container mx-auto max-w-screen-xl">
              <div className="mb-8 mt-8 w-full px-4 text-center text-white md:mb-24 md:mt-20">
                <h1 className="mb-4 w-full text-2xl font-bold uppercase md:text-6xl md:font-semibold">
                  Projetos em destaque
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
          </BlueBgBox>
        </section>
        <section className="container mx-auto mt-80 max-w-screen-xl">
          <Link href="marcas">
            <h2 className="mb-6 text-center text-3xl text-primary md:text-4xl">
              Marcas <b className="font-bold">Exclusivas</b>
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
                    contentStyles="object-contain mx-6 max-w-64"
                  />
                </Link>
              );
            })}
          </InfiniteScroll>
        </section>
      </div>
    </>
  );
}
