import goOnSvg from "../../../public/go_on_logo.svg";
import Badge, { BadgeProps } from "@/components/home/badge";
import winnerBadge from "../../../public/winnerBadge.svg";
import contentWebsite from "../../../public/contentWebsite.svg";
import support from "../../../public/support.svg";
import webinar from "../../../public/webinar.svg";
import cheers from "../../../public/cheers.svg";
import money from "../../../public/money.svg";
import globe from "../../../public/globe.svg";
import maintenance from "../../../public/maintenance.svg";
import minimal_separator from "../../../public/minimal_separator.svg";
import Image from "next/image";
import AccreditationForm from "@/components/accreditation/accreditationForm";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import { Marca } from "@/types/marca";
import { Metadata } from "next";
import { Credenciamento as CredenciamentoProps } from "@/types/credenciamento";
import { buildMediaQPs } from "@/helpers/qpHelper";
import ApiImage from "@/components/ApiImage";
import Link from "next/link";
import getYTId from "@/helpers/getYoutubeId";

export const metadata: Metadata = {
  title: "Credenciamento",
};

export default async function Credenciamento() {
  const badges: BadgeProps[] = [
    { src: winnerBadge, text: "Marcas\n exclusivas", fontSize: "lg" },
    {
      src: globe,
      text: "Importação \nlegal e segura",
      fontSize: "sm",
    },
    {
      src: support,
      text: "Suporte comercial \nEspecializado",
      fontSize: "sm",
    },
    { src: maintenance, text: "Assistência\ntécnica", fontSize: "lg" },
    { src: contentWebsite, text: "Conteúdos\n exclusivos", fontSize: "lg" },

    { src: money, text: "Descontos \ne benefícios", fontSize: "sm" },
    { src: cheers, text: "Eventos e\ncampanhas", fontSize: "lg" },
    { src: webinar, text: "Treinamentos\ne webinars", fontSize: "md" },
    {
      src: money,
      text: "Condições especiais\ne Campanhas",
      fontSize: "md",
    },
  ];

  const brandsData = await fetchDataFromApi<Marca[]>(
    "marcas",
    `${buildMediaQPs("Logotipo")}&fields[0]=Marca&fields[1]=slug`,
  );
  const brands = brandsData.map((brand) => brand.attributes.Marca);

  const data = await fetchDataFromApi<CredenciamentoProps>("credenciamento");
  const { video1, video2 } = data.attributes;

  return (
    <div className="relative text-white">
      <div className="container relative z-20 mx-auto mb-10 mt-20 max-w-screen-xl md:my-20">
        <section className="px-6 md:p-0">
          <header className="mx-auto text-center text-white md:mb-32 md:max-w-[900px] ">
            <div className="mb-12 box-content flex items-center justify-center gap-4 md:gap-8">
              <h1 className="text-3xl font-bold uppercase md:text-7xl">
                Revendedor
              </h1>
              <Image
                src={goOnSvg}
                alt={"Logotipo da GoOn"}
                className="h-7 w-auto object-contain md:h-16"
              />
            </div>
            <p className="text-justify text-sm font-normal md:text-lg">
              Temos o orgulho de ser uma das principais empresas de distribuição
              de produtos de áudio, vídeo e automação. Reconhecidos por nossa
              excelência, somos a melhor escolha para revendas e integradores
              que buscam produtos de alta qualidade e um atendimento
              excepcional. Nossa expertise no mercado nos permite oferecer as
              melhores soluções para seus projetos.
            </p>
          </header>
        </section>
        <section>
          <h2 className="mx-auto block w-full text-center text-3xl font-extralight uppercase tracking-wider text-white md:w-fit">
            Por que se tornar um revendedor Go On?
          </h2>
          <p className="mx-auto mb-6 block w-full text-center text-white md:w-fit">
            Conheça alguns dos muitos diferenciais que oferecemos para nossas
            empresas parceiras
          </p>
          <Badge badges={badges} white />
        </section>
        <section className="mt-32">
          <h2 className="mx-auto mb-12 block w-full text-center text-3xl font-extralight uppercase tracking-wider text-white md:w-fit">
            Trabalhe com as melhores marcas
          </h2>
          <div className="m-auto grid w-fit grid-cols-4 gap-8 md:grid-cols-6">
            {brandsData.map((brand) => {
              const { Logotipo, Marca, slug } = brand?.attributes;
              return (
                <Link key={slug} href={`marcas/${slug}`}>
                  <div className="h-16 w-28 justify-self-center">
                    <ApiImage
                      image={Logotipo.data}
                      contentStyles="brightness-0 invert object-contain w-full h-full"
                      alt={"logotipo da marca " + Marca}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
          <Image
            src={minimal_separator}
            alt="separador"
            className="mx-auto my-20 w-7"
          />
        </section>
        <section className="text-goOnBlack container mx-auto min-h-96 max-w-screen-xl bg-primary pb-12 pt-1">
          <header className="mx-auto mb-12 max-w-[1050px] text-center  md:mt-16">
            <h2 className="mb-4 text-xl font-bold uppercase md:text-5xl">
              O primeiro passo é agora
            </h2>
            <p className="mx-auto w-fit px-4 text-center text-sm font-light uppercase tracking-wider md:text-2xl">
              Preencha o formulário e entraremos em contato
            </p>
          </header>
          <AccreditationForm brands={brands} />
        </section>

        {(video1 || video2) && (
          <section>
            <h2 className="mx-auto mb-12 mt-12 block w-full text-center text-3xl font-extralight uppercase tracking-wider text-white md:w-fit">
              Conheça um pouco de nossa estrutura
            </h2>
            {video1 && (
              <div className="z-20 mt-16 w-full px-5 md:mx-auto md:mt-20 md:max-w-[860px] ">
                <div className="relative  h-0 w-full pb-[56.25%]">
                  <iframe
                    src={"https://www.youtube.com/embed/" + getYTId(video1)}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute left-0 top-0 h-full w-full"
                  ></iframe>
                </div>
              </div>
            )}
            {video2 && (
              <div className="z-20 mt-16 w-full px-5 md:mx-auto md:mt-20 md:max-w-[860px] ">
                <div className="relative  h-0 w-full pb-[56.25%]">
                  <iframe
                    src={"https://www.youtube.com/embed/" + getYTId(video2)}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="absolute left-0 top-0 h-full w-full"
                  ></iframe>
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  );
}
