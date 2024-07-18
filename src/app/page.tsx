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
import HighlightedProjects from "@/components/home/highlightedProjects";
import BlueBgBox from "@/components/blueBgBox";

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
    <div className="container mx-auto max-w-screen-xl">
      <section className="mt-12">
        <Carousel carousel={Carrossel} />
      </section>
      <section className="mt-16">
        <h2 className="mx-auto block w-fit text-center text-3xl text-primary">
          Soluções para <u className="font-bold">todos os projetos</u>
        </h2>
        <Badge badges={badges} />
        <p className="mx-auto mt-16 block text-center font-light text-primary md:w-fit ">
          E muito mais...
        </p>
      </section>
      <section className="mt-16">
        <HomeCards />
      </section>
      <Image
        src={separator}
        alt="separador"
        aria-label="separador"
        className="mx-auto my-28"
      />
      {/* <section className="mb-16">
        <HomeBlog />
      </section> */}
      <BlueBgBox
        bgImage="/manWithPhone.webp"
        boxStyles="w-full h-[260px] md:h-[385px] after:!opacity-[36%] md:mb-56 overflow-visible mb-72"
      >
        <div className="mt-8 w-full px-4 text-center text-white md:mt-20">
          <h1 className="mb-4 w-full text-3xl font-bold uppercase md:text-4xl">
            Projetos em destaque
          </h1>
          <p className="font-light md:text-xl">
            Reunimos os melhores projetos desenvolvidos por nossas empresas
            parcaeiras para que você conheça um pouco mais sobre as diversas
            possibilidades que um sistema de automação e sonorização pode te
            oferecer
          </p>
        </div>
        <HighlightedProjects projects={projectsData}></HighlightedProjects>
      </BlueBgBox>
      <section>
        <Link href="marcas">
          <h2 className="mb-6 text-center text-3xl text-primary md:text-4xl">
            Marcas{" "}
            <b className="underline decoration-4 underline-offset-8">
              Exclusivas Go On
            </b>
          </h2>
        </Link>
        <InfiniteScroll>
          {brandsData?.map((brand) => {
            const { Logotipo, Marca } = brand.attributes;

            return (
              <Link href={`marcas/${universalSlugify(Marca)}`} key={brand?.id}>
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
  );
}
