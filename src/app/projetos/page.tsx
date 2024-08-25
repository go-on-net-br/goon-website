import WorkerSvg from "../../../public/worker.svg";
import IotSvg from "../../../public/iot.svg";
import BlueprintSvg from "../../../public/blueprint.svg";
import BlueBgBox from "@/components/blueBgBox";
import Image from "next/image";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import { Projeto } from "@/types/projeto";
import ProjectListing from "@/components/projects/projectListing";
import GradientFooter from "@/components/gradientFooter";
import separator from "../../../public/separator_white.svg";
import Link from "next/link";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projetos",
};

export default async function Projetos() {
  const projectsData = (
    await fetchDataFromApi<Projeto[]>("projetos", "populate=*")
  ).sort((a, b) => {
    return a.attributes.createdAt > b.attributes.createdAt ? -1 : 1;
  });

  const cards = [
    {
      src: WorkerSvg,
      title: "Personalização",
      description:
        "Através de nossas empresas parceiras você desenvolve um projeto exclusivo para o seu ambiente, pensado para facilitar o dia a dia da sua família e proporcionar a qualidade de vida e paz de espírito que você merece. ",
    },
    {
      src: IotSvg,
      title: "Integração",
      description:
        "A integração da automação residencial com os sistemas de áudio e vídeo proporciona uma experiência completa de conforto, praticidade e entretenimento para sua casa. Nossos revendedores estão prontos para tirar sua ideia do papel e tornar seu ambiente completamente inteligente e funcional.",
    },
    {
      src: BlueprintSvg,
      title: "Design e Acabamento",
      description:
        "Todos os produtos possuem um design sofisticado que se integram perfeitamente ao seu projeto arquitetônico, através de nossas empresas parceiras você recebe um ambiente rico e com acabamentos de alta qualidade.",
    },
  ];
  return (
    <>
      <section>
        <BlueBgBox
          bgImage="/suburbamNeighborhood.webp"
          boxStyles="w-screen pb-20 md:pb-0 md:h-[550px] after:!opacity-[36%]"
        >
          <div className="mx-2 mt-8 text-center text-white md:mx-auto md:mt-20 md:w-[700px]">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Projetos Referência
            </h1>
            <p className="text-lg font-light md:text-xl">
              Aqui reunimos projetos incríveis de nossas empresas parceiras para
              que você conheça mais a fundo e se inspirar, conhecer o que a sua
              casa inteligente pode fazer por você.
            </p>
          </div>
        </BlueBgBox>
      </section>
      <section className="container relative z-[1] mx-auto max-w-screen-xl rounded-3xl bg-white px-9 py-12 md:-mt-12 md:py-36 md:pt-48">
        <Suspense>
          <div className="container -top-11 left-0 right-0 mx-auto -mt-32 mb-4 flex w-full max-w-screen-xl flex-col items-center justify-evenly gap-6 pt-8 text-center text-white md:absolute md:-top-64 md:mt-auto md:flex-row md:items-start md:pt-10">
            {cards.map((card) => {
              return (
                <div
                  className="card w-96 rounded-3xl bg-primary shadow-xl md:h-[390px]"
                  key={card.title}
                >
                  <figure className="px-8 pt-8">
                    <Image
                      src={card.src}
                      alt={card.title}
                      className="max-w-20"
                    />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title mx-auto mb-2 text-3xl font-medium leading-8">
                      {card.title}
                    </h2>
                    <p className="text-sm">{card.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <ProjectListing projects={projectsData} />
        </Suspense>
      </section>
      <GradientFooter bgImage="/blueprint_zoom.webp" boxStyles="text-3xl">
        <div className="box-border flex h-full w-full flex-col px-4 py-6 text-white md:w-[900px] md:justify-center md:p-0 md:pl-24">
          <Image
            src={separator}
            alt="separador"
            aria-label="separador"
            className="mb-6 w-12 md:w-20"
          />
          <h2 className="flex flex-col text-2xl font-bold uppercase md:block md:text-6xl">
            <span>Quer um projeto</span> <span>para o seu ambiente?</span>
          </h2>
          <p className="mb-2 mt-2 text-xs md:mb-6 md:mt-4 md:text-2xl">
            Encontre a Revenda Credenciada mais próxima de você
          </p>
          <Link href="/rede-credenciada">
            <button className="btn btn-secondary btn-sm w-fit text-primary">
              Veja Rede Credenciada
            </button>
          </Link>
        </div>
      </GradientFooter>
    </>
  );
}
