import goOnSvg from "../../../public/go_on_logo.svg";
import BlueBgBox from "@/components/blueBgBox";
import Badge from "@/components/home/badge";
import winnerBadge from "../../../public/winnerBadge.svg";
import contentWebsite from "../../../public/contentWebsite.svg";
import support from "../../../public/support.svg";
import webinar from "../../../public/webinar.svg";
import cheers from "../../../public/cheers.svg";
import money from "../../../public/money.svg";
import globe from "../../../public/globe.svg";
import maintenance from "../../../public/maintenance.svg";
import separator from "../../../public/separator.svg";
import Image from "next/image";
import AccreditationForm from "@/components/accreditation/accreditationForm";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import { Marca } from "@/types/marca";
import { Metadata } from "next";
import { Credenciamento as CredenciamentoProps } from "@/types/credenciamento";

export const metadata: Metadata = {
  title: "Credenciamento",
};

export default async function Credenciamento() {
  const badges = [
    { src: winnerBadge, text: "Marcas\n exclusivas", fontSize: "lg" },
    { src: contentWebsite, text: "Conteúdos\n exclusivos", fontSize: "lg" },
    {
      src: support,
      text: "Suporte comercial \nEspecializado",
      fontSize: "md",
    },
    {
      src: globe,
      text: "Importação \nlegal e segura",
      fontSize: "lg",
    },
    { src: maintenance, text: "Assistência\ntécnica", fontSize: "lg" },
    { src: money, text: "Descontos \ne benefícios", fontSize: "lg" },
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
    "fields[0]=Marca",
  );
  const brands = brandsData.map((brand) => brand.attributes.Marca);

  const data = await fetchDataFromApi<CredenciamentoProps>("credenciamento");
  const { video1, video2 } = data.attributes;

  return (
    <div className="relative">
      <BlueBgBox bgImage="" boxStyles="relative w-full">
        <div className="container relative z-20 mx-auto mb-10 mt-20 max-w-screen-xl md:my-20">
          <section className="px-6 md:p-0">
            <header className="mx-auto mt-20 text-center text-white md:mb-40 md:max-w-[900px] ">
              <div className="mb-12 box-content flex items-center justify-center gap-8">
                <h1 className="text-2xl font-bold uppercase md:text-7xl">
                  Revendedor
                </h1>
                <Image
                  src={goOnSvg}
                  alt={"Logotipo da GoOn"}
                  className="h-16 w-auto object-contain"
                />
              </div>
              <p className="text-justify text-sm font-normal md:text-lg">
                Temos o orgulho de ser uma das principais empresas de
                distribuição de produtos de áudio, vídeo e automação.
                Reconhecidos por nossa excelência, somos a melhor escolha para
                revendas e integradores que buscam produtos de alta qualidade e
                um atendimento excepcional. Nossa expertise no mercado nos
                permite oferecer as melhores soluções para seus projetos.
              </p>
            </header>
          </section>
          <section className="mt-16">
            <h2 className="mx-auto block w-full text-center text-3xl font-extralight uppercase tracking-wider text-white md:w-fit">
              Por que se tornar um revendedor Go On?
            </h2>
            <p className="mx-auto block w-full text-center text-white md:w-fit">
              Conheça alguns dos muitos diferenciais que oferecemos para nossas
              empresas parceiras
            </p>
            <Badge badges={badges} white />
          </section>
          <section>
            <div className="relative z-20 mt-16 w-full px-5 md:mx-auto md:mt-20 md:max-w-[860px] ">
              <div className="relative  h-0 w-full pb-[56.25%]">
                <iframe
                  src="https://www.youtube.com/embed/HQaMWP77ImQ?si=VdN7a283gyhion3y"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute left-0 top-0 h-full w-full"
                ></iframe>
              </div>
            </div>
          </section>
        </div> 
      </BlueBgBox>
      <div className="container mx-auto min-h-96 max-w-screen-xl bg-[#F5f5f5] md:my-20">
        <section>
          <header className="mx-auto mb-12 mt-4 max-w-[1050px] text-center text-primary md:mt-20">
            <h2 className="mb-4 text-xl font-bold uppercase md:text-5xl">
              Dê o primeiro passo agora
            </h2>
            <p className="mx-auto w-fit px-4 text-center text-sm font-light uppercase md:text-2xl">
              Preencha o formulário e entraremos em contato
            </p>
          </header>
          <AccreditationForm brands={brands} />
        </section>
        <Image
          src={separator}
          alt="separador"
          aria-label="separador"
          className="mx-auto my-12 h-20 w-36 object-contain md:my-20"
        />
        {/* <section className="pb-8 md:pb-0">
          <h2 className="mx-auto mb-12 mt-16 max-w-[1050px] px-4 text-center text-xl font-bold uppercase text-primary md:px-0 md:text-5xl">
            Veja o depoimento de nossos <br className="hidden md:block" />{" "}
            revendedores mais antigos
          </h2>
          <Testimonies testimoniesData={testimoniesData} />
        </section> */}
      </div>
    </div>
  );
}
