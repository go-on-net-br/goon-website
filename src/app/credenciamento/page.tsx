import BlueBgBox from "@/components/blueBgBox";
import Badge from "@/components/home/badge";
import headsetIcon from "../../../public/headsetWhite.svg";
import classroomIcon from "../../../public/classroom.svg";
import lockIcon from "../../../public/lockWhite.svg";
import moneyIcon from "../../../public/money.svg";
import halfCircle from "../../../public/halfCircle.svg";
import winnerBadgeIcon from "../../../public/winnerBadgeWhite.svg";
import separator from "../../../public/separator.svg";
import Image from "next/image";
import AccreditationForm from "@/components/accreditation/accreditationForm";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import { Marca } from "@/types/marca";
import { Depoimento } from "@/types/depoimento";
import Testimonies from "@/components/accreditation/testimonies";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Credenciamento",
};

export default async function Credenciamento() {
  const badges = [
    { src: winnerBadgeIcon, text: "Empresas\nLíderes do\nsegmento" },
    { src: lockIcon, text: "Importação\nSegura e\nLegalizada" },
    { src: headsetIcon, text: "Suporte\nEspecializado" },
    { src: classroomIcon, text: "Treinamentos\nExclusivos" },
    { src: moneyIcon, text: "Descontos e\ncampanhas de\nbenefícios" },
  ];

  const brandsData = await fetchDataFromApi<Marca[]>("marcas", "fields[0]=Marca");
  const brands = brandsData.map((brand) => brand.attributes.Marca);

  const testimoniesData = await fetchDataFromApi<Depoimento[]>("depoimentos");

  return (
    <div className="relative">
      <BlueBgBox bgImage="" boxStyles="relative w-full">
        <div className="container relative z-20 mx-auto mb-10 mt-20 max-w-screen-xl md:my-20">
          <section className="px-6 md:p-0">
            <header className="mx-auto mt-20 text-center text-white md:mb-40 md:max-w-[900px] ">
              <h1 className="mb-12 text-2xl font-bold uppercase md:text-7xl md:leading-[50px]">
                Seja um revendedor
                <br />
                <span className="text-base font-light tracking-wider md:text-[38px]">
                  E trabalhe com as{" "}
                </span>
                <span className="text-base font-bold tracking-wider md:text-[38px]">
                  melhores marcas
                </span>
              </h1>
              <p className="text-justify text-sm font-normal md:text-lg">
                Temos o orgulho de ser uma das principais empresas de
                distribuição de produtos de áudio, vídeo e automação do Brasil,
                esse título não é atoa, estamos a anos contruindo um bom
                relacionamento com revendas e fornecedores em prol de oferecer
                um serviço seguro, transparente e com as melhores marcas do
                mercado mundial.
              </p>
            </header>
          </section>
          <section className="mt-16">
            <h2 className="mx-auto block w-full text-center text-3xl text-white md:w-fit">
              Por que se tornar um{" "}
              <span className="font-bold">Revendedor Go On?</span>
            </h2>
            <Badge badges={badges} white />
            <p className="mx-auto mt-16 block w-fit font-light text-primary ">
              E muito mais...
            </p>
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
        <div className="absolute bottom-[-3px] w-full">
          <Image
            src={halfCircle}
            alt="half circle"
            aria-hidden
            className=" h-32 w-full object-fill object-top md:h-[500px]"
          />
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
        <section className="pb-8 md:pb-0">
          <h2 className="mx-auto mb-12 mt-16 max-w-[1050px] px-4 text-center text-xl font-bold uppercase text-primary md:px-0 md:text-5xl">
            Veja o depoimento de nossos <br className="hidden md:block" />{" "}
            revendedores mais antigos
          </h2>
          <Testimonies testimoniesData={testimoniesData} />
        </section>
      </div>
    </div>
  );
}
