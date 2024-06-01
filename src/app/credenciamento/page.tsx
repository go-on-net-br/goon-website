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
import ApiImage from "@/components/ApiImage";

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
          <section>
            <header className="mx-auto mt-20 max-w-[1050px] text-center text-white">
              <h1 className="mb-4 text-7xl font-bold uppercase">
                Seja um revendedor
                <br />
                <span className="text-5xl font-light">
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
            <h2 className="mx-auto block w-fit text-3xl text-white">
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
            className=" h-[375px] w-full object-fill object-top"
          />
        </div>
      </BlueBgBox>
      <div className="container mx-auto my-20 min-h-96 max-w-screen-xl bg-[#F5f5f5]">
        <section>
          <header className="mx-auto mb-12 mt-20 max-w-[1050px] text-center text-primary">
            <h2 className="mb-4 text-5xl font-bold uppercase">
              Dê o primeiro passo agora
            </h2>
            <p className="mx-auto w-fit text-justify text-2xl font-light uppercase">
              Preencha o formulário e entraremos em contato
            </p>
          </header>
          <AccreditationForm brands={brands} />
        </section>
        <Image
          src={separator}
          alt="separador"
          aria-label="separador"
          className="mx-auto my-28 h-20 w-36 object-contain"
        />
        <section>
          <h2 className=" mx-auto mb-12 mt-20 max-w-[1050px] text-center text-5xl font-bold uppercase text-primary">
            Veja o depoimento de nossos <br /> revendedores mais antigos
          </h2>
          <div className="flex justify-between gap-4">
            {testimoniesData.map((testimony) => {
              const { Cargo, Depoimento, Empresa, Foto, Nome } =
                testimony?.attributes;
              return (
                <div
                  className="card max-h-[500px] w-96 bg-primary pb-8 text-white shadow-xl"
                  key={testimony.id}
                >
                  <figure className="flex items-center justify-center p-8">
                    <ApiImage
                      image={Foto?.data}
                      contentStyles="object-contain w-40 h-40 rounded-full"
                    />
                  </figure>
                  <div className="card-body pt-0">
                    <header className="card-title flex-col pb-3 text-center">
                      <h3 className="text-3xl font-light">{Nome}</h3>
                      <p className="text-lg font-light">
                        {Cargo} <span className="font-bold">{Empresa}</span>
                      </p>
                    </header>
                    <p>{Depoimento}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
