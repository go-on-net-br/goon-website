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

export default async function Projetos() {
  const projectsData = await fetchDataFromApi<Projeto[]>("projetos");

  const cards = [
    {
      src: WorkerSvg,
      title: "Personalização",
      description:
        "Aqui reunimos projetos incríveis de nossas empresas parceiras para que você conheça mais a fundo o que a sua casa inteligente pode fazer por você",
    },
    {
      src: IotSvg,
      title: "Integração",
      description:
        "Aqui reunimos projetos incríveis de nossas empresas parceiras para que você conheça mais a fundo o que a sua casa inteligente pode fazer por você",
    },
    {
      src: BlueprintSvg,
      title: "Design e Acabamento",
      description:
        "Aqui reunimos projetos incríveis de nossas empresas parceiras para que você conheça mais a fundo o que a sua casa inteligente pode fazer por você",
    },
  ];
  return (
    <>
      <BlueBgBox
        bgImage="/blueprint.webp"
        boxStyles="w-screen h-[550px] after:!opacity-[36%]"
      >
        <div className="mx-auto mt-20 w-[700px] text-center text-white">
          <h1 className="mb-4 text-6xl font-bold">Projetos Referência</h1>
          <p className="text-lg font-light">
            Aqui reunimos projetos incríveis de nossas empresas parceiras para
            que você conheça mais a fundo o que a sua casa inteligente pode
            fazer por você
          </p>
        </div>
        <div className="container absolute left-0 right-0 mx-auto flex w-full max-w-screen-xl justify-evenly gap-6 pt-32 text-center text-white">
          {cards.map((card) => {
            return (
              <div
                className="card w-80 rounded-3xl bg-primary shadow-xl"
                key={card.title}
              >
                <figure className="px-8 pt-8">
                  <Image src={card.src} alt={card.title} />
                </figure>
                <div className="card-body">
                  <h2 className="card-title mx-auto mb-2 text-2xl font-medium leading-6">
                    {card.title}
                  </h2>
                  <p>{card.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </BlueBgBox>
      <div className="container relative z-[1] mx-auto -mt-10 max-w-screen-xl rounded-3xl bg-white px-9 py-64">
        <ProjectListing projects={projectsData} />
      </div>
      <GradientFooter bgImage="/blueprint_zoom.webp" boxStyles="text-3xl">
        <div className="box-border flex h-full w-[820px] flex-col justify-center pl-9 text-white">
          <Image
            src={separator}
            alt="separador"
            aria-label="separador"
            className="mb-6"
          />
          <h2 className="text-6xl font-bold uppercase">
            Quer um projeto para o seu ambiente?
          </h2>
          <p className="mb-6 mt-4 text-2xl">
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
