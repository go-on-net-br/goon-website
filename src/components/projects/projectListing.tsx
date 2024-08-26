"use client";

import { Projeto } from "@/types/projeto";
import ProjectSection from "./ProjectSection";
import { useRouter, useSearchParams } from "next/navigation";
import universalSlugify from "@/helpers/universalSlugify";

export default function ProjectListing({ projects }: { projects: Projeto[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("tipo") ?? "todos";
  const brand = searchParams.get("marca") ?? "todas";

  const filteredProjects = projects.filter((project) => {
    if (type === "todos" && brand === "todas") {
      return true;
    } else if (type === "todos") {
      return project.attributes.marcas?.data?.some(
        (brandInProject) =>
          universalSlugify(brandInProject.attributes.Marca) === brand,
      );
    } else if (brand === "todas") {
      return universalSlugify(project.attributes.Tipo) === type;
    } else {
      return (
        universalSlugify(project.attributes.Tipo) === type &&
        project.attributes.marcas?.data?.some(
          (brandInProject) =>
            universalSlugify(brandInProject.attributes.Marca) === brand,
        )
      );
    }
  });

  const possibleTypes = Array.from(
    new Set(
      projects.map((proj) => {
        const lowerCase = proj.attributes.Tipo.toLowerCase();
        return lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1);
      }),
    ),
  );

  const possibleBrands = Array.from(
    new Set(
      projects
        .map((proj) => {
          return proj?.attributes?.marcas?.data?.map((b) => {
            return b?.attributes?.Marca;
          });
        })
        .flat(),
    ),
  );

  function displayCase(str: string) {
    if (!str) {
      return "";
    }

    return str.length === 1
      ? str.toLowerCase()
      : str
          .toLowerCase()
          .split(" ")
          .map(function (word) {
            return word.charAt(0).toUpperCase().concat(word.substr(1));
          })
          .join(" ");
  }

  return (
    <>
      <div className="mx-auto mt-8 w-fit">
        <p className="mx-auto mb-6 w-fit text-lg font-bold text-primary">
          Filtrar por:
        </p>
        <div className="mx-auto flex w-full gap-10">
          <div className="w-full">
            <label
              className=" mx-auto text-center font-bold text-primary"
              htmlFor="tipo"
            >
              Tipo
            </label>
            <select
              className="select mb-10 w-full max-w-xs border-primary bg-white text-primary"
              value={type}
              name="tipo"
              onChange={(e) => {
                router.push(
                  `?tipo=${e.target.value}${brand ? `&marca=${brand}` : ""}`,
                  { scroll: false },
                );
              }}
            >
              <option value="todos">Todos</option>
              {possibleTypes.map((type) => {
                return (
                  <option value={universalSlugify(type)} key={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="w-full">
            <label
              className="mx-auto text-center font-bold text-primary"
              htmlFor="marca"
            >
              Marcas
            </label>
            <select
              className="select mb-10 w-full max-w-xs border-primary bg-white text-primary"
              value={brand}
              name="marca"
              onChange={(e) => {
                router.push(
                  `${type ? `?tipo=${type}&` : ""}marca=${e.target.value}`,
                  {
                    scroll: false,
                  },
                );
              }}
            >
              <option value="todas">Todas</option>
              {possibleBrands.map((possibleBrand, i) => {
                return (
                  <option value={universalSlugify(possibleBrand)} key={i}>
                    {possibleBrand}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-24">
        {filteredProjects.map((project, i) => {
          return (
            <ProjectSection
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
