"use client"

import { Projeto } from "@/types/projeto";
import ProjectCarrousel from "./projectCarrousel";
import { useState } from "react";

export default function ProjectListing({ projects }: { projects: Projeto[] }) {
  const [selectedType, setSelectedType] = useState("Todos");
  const filteredProjects = projects.filter(
    (project) =>
      selectedType === "Todos" || project.attributes.Tipo === selectedType,
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
          value={selectedType}
          onChange={(e) => {
            setSelectedType(e.target.value);
          }}
        >
          <option disabled>Tipo de projeto</option>
          {possibleTypes.map((type) => {
            return (
              <option value={type} key={type}>
                {type}
              </option>
            );
          })}
          <option>Todos</option>
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
