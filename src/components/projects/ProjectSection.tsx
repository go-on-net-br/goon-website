import { Projeto } from "@/types/projeto";
import ProjectCarrousel from "./projectCarousel";

export default function ProjectSection({
  project,
  index,
}: {
  project: Projeto;
  index: number;
}) {
  const { Sobre, Titulo, revenda } = project.attributes;
  const resalerLink = revenda?.data?.attributes?.Site;
  return (
    <div
      className={
        (index % 2 ? "md:flex-row-reverse " : "md:flex-row ") +
        " flex flex-col-reverse items-center justify-between gap-10 md:flex-row"
      }
    >
      <div className="flex w-full flex-col items-center gap-4 md:w-[52%]">
        <ProjectCarrousel project={project} />
      </div>
      <div className="w-full md:w-[540px]">
        <header className="mb-6 text-primary">
          <h2 className="mb-3 text-center text-2xl font-bold md:text-left md:text-5xl">
            {Titulo}
          </h2>
          {resalerLink && (
            <a
              className="text-center text-2xl font-normal md:text-left"
              href={resalerLink}
              target="_blank"
            >
              by{" "}
              <span className="uppercase underline">
                {revenda?.data?.attributes?.Titulo}
              </span>
            </a>
          )}
          {revenda?.data?.attributes?.Titulo && !resalerLink && (
            <p className="text-center text-2xl font-normal md:text-left">
              by{" "}
              <span className="uppercase">
                {revenda?.data?.attributes?.Titulo}
              </span>
            </p>
          )}
        </header>
        <p className="text-center text-black md:text-left md:text-lg">
          {Sobre}
        </p>
      </div>
    </div>
  );
}
