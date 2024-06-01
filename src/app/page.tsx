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
import HomeBlog from "@/components/home/homeBlog";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import InfiniteScroll from "@/components/infiniteScroll";
import { Marca } from "@/types/marca";
import ApiImage from "@/components/ApiImage";
import Link from "next/link";
import universalSlugify from "@/helpers/universalSlugify";

export default async function HomePage() {
  const homeData = await fetchDataFromApi<Home>("home");
  const brandsData = await fetchDataFromApi<Marca[]>("marcas");
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
        <h2 className="mx-auto block w-fit text-3xl text-primary">
          Soluções para <u className="font-bold">todos os projetos</u>
        </h2>
        <Badge badges={badges} />
        <p className="mx-auto mt-16 block w-fit font-light text-primary ">
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
      <section className="mb-16">
        <HomeBlog />
      </section>
      <section>
        <Link href="marcas">
          <h2 className="mb-6 text-center text-4xl text-primary">
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
