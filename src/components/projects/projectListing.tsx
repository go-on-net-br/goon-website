"use client";

import { Projeto } from "@/types/projeto";
import ProjectCarrousel from "./projectCarrousel";
import { useRouter, useSearchParams } from "next/navigation";
import universalSlugify from "@/helpers/universalSlugify";

export default function ProjectListing({ projects }: { projects: Projeto[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("tipo") ?? "todos";
  const filteredProjects = projects.filter(
    (project) =>
      type === "todos" || universalSlugify(project.attributes.Tipo) === type,
  );

  const possibleTypes = Array.from(
    new Set(projects.map((proj) => proj.attributes.Tipo)),
  );

  return (
    <>
      <div className="mx-auto w-fit">
        <p className="mx-auto mb-3 w-fit text-primary">Filtrar por:</p>
        <select
          className="select mb-10 w-full max-w-xs border-primary bg-white text-primary"
          value={type}
          onChange={(e) => {
            router.push(`?tipo=${e.target.value}`, { scroll: false });
          }}
        >
          <option disabled>Tipo de projeto</option>
          {possibleTypes.map((type) => {
            return (
              <option value={universalSlugify(type)} key={type}>
                {type}
              </option>
            );
          })}
          <option value="todos">Todos</option>
        </select>
      </div>
      <div className="flex flex-col gap-24">
        {filteredProjects.map((project, i) => {
          return (
            <ProjectCarrousel
              project={project}
              index={i}
              key={project.attributes.Titulo}
            />
          );
        })}
      </div>
    </>
  );
}
