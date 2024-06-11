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

export default async function Credenciamento() {
  const badges = [
    { src: winnerBadgeIcon, text: "Empresas Líderes\nno segmento" },
    { src: lockIcon, text: "Segurança\npara os projetos" },
    { src: headsetIcon, text: "Suporte\nEspecializado" },
    { src: classroomIcon, text: "Treinamentos\nExclusivos" },
    { src: moneyIcon, text: "Descontos e\ncampanhas de\nbenefícios" },
  ];

  const brandsData = await fetchDataFromApi<Marca[]>("marcas");
  const brands = brandsData.map((brand) => brand.attributes.Marca);

  const testimoniesData = await fetchDataFromApi<Depoimento[]>("depoimentos");

  return (
    <div className="relative">
      <BlueBgBox bgImage="/meeting_upview.webp" boxStyles="relative w-full">
        <div className="container relative z-20 mx-auto my-20 max-w-screen-xl">
          <section className="px-4 md:p-0">
            <header className="mx-auto mt-20 max-w-[1050px] text-center text-white">
              <h1 className="mb-4 text-3xl font-bold uppercase md:text-7xl">
                Seja um revendedor
                <br />
                <span className="text-2xl font-light md:text-5xl">
                  E trabalhe com as melhores marcas
                </span>
              </h1>
              <p className="text-justify text-lg font-light">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using It is a long established fact that a reader
                will be distracted by the readable content of a page when
                looking at its layout. The point of using Lorem Ipsum is that it
                has a more-or-less normal distribution of letters, as opposed to
                using &apos;Content here, content here&apos;, making it look
                like readable English.
              </p>
            </header>
          </section>
          <section className="mt-16">
            <h2 className="mx-auto block w-full text-center text-3xl text-white md:w-fit">
              Por que se tornar um{" "}
              <u className="font-bold">revendedor Go On?</u>
            </h2>
            <Badge badges={badges} white />
            <p className="mx-auto mt-16 block w-fit font-light text-primary ">
              E muito mais...
            </p>
          </section>
          <section>
            <div className="relative z-20 mt-12 w-full px-5 md:mx-auto md:mt-20 md:max-w-[860px] ">
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
        <div className="absolute bottom-[-1px] w-full">
          <Image
            src={halfCircle}
            alt="half circle"
            aria-hidden
            className=" h32 w-full object-fill object-top md:h-[375px]"
          />
        </div>
      </BlueBgBox>
      <div className="container mx-auto min-h-96 max-w-screen-xl bg-[#F5f5f5] md:my-20">
        <section>
          <header className="mx-auto mb-12 mt-4 max-w-[1050px] text-center text-primary md:mt-20">
            <h2 className="mb-4 text-5xl font-bold uppercase">
              Dê o primeiro passo agora
            </h2>
            <p className="mx-auto w-fit px-4 text-center text-2xl font-light uppercase">
              Preencha o formulário e entraremos em contato
            </p>
          </header>
          <AccreditationForm brands={brands} />
        </section>
        <Image
          src={separator}
          alt="separador"
          aria-label="separador"
          className="mx-auto my-12 h-20 w-36 object-contain md:my-28"
        />
        <section className="pb-8 md:pb-0">
          <h2 className="mx-auto mb-12 mt-20 max-w-[1050px] text-center text-5xl font-bold uppercase text-primary">
            Veja o depoimento de nossos <br /> revendedores mais antigos
          </h2>
          <Testimonies testimoniesData={testimoniesData} />
        </section>
      </div>
    </div>
  );
}
