"use client";

import { Projeto } from "@/types/projeto";
import ApiImage from "../ApiImage";
import { useState } from "react";

export default function ProjectCarrousel({
  project,
  index,
}: {
  project: Projeto;
  index: number;
}) {
  const { Sobre, Titulo, media, revenda } = project.attributes;
  const [currPic, setCurrPic] = useState(0);
  const resalerLink = revenda?.data?.attributes?.Site;
  return (
    <div
      className={
        (index % 2 ? "md:flex-row-reverse " : "md:flex-row ") +
        " flex flex-col items-center justify-between gap-8"
      }
    >
      <div className="flex flex-col items-center gap-4 md:w-[600px]">
        <div className="flex h-[300px] w-full items-center justify-center overflow-hidden md:h-[600px]">
          <ApiImage
            image={media.data[currPic]}
            contentStyles=" min-h-full min-w-full object-cover"
          />
        </div>
        <div className="flex flex-wrap gap-1 md:gap-4">
          {media.data.map((pic, i) => {
            return (
              <div
                key={pic.id}
                className={
                  currPic === i
                    ? " border-4 border-primary"
                    : " cursor-pointer border-4 border-white"
                }
                onClick={() => setCurrPic(i)}
              >
                <div className="h-16 w-16 overflow-hidden">
                  <ApiImage image={pic} contentStyles="min-w-full min-h-full" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full md:w-[540px]">
        <header className="mb-6 text-primary">
          <h2 className="mb-3 text-2xl font-bold md:text-5xl">{Titulo}</h2>
          {resalerLink && (
            <a
              className="text-2xl font-normal"
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
            <p className="text-2xl font-normal">
              by{" "}
              <span className="uppercase">
                {revenda?.data?.attributes?.Titulo}
              </span>
            </p>
          )}
        </header>
        <p className="text-black md:text-lg">{Sobre}</p>
      </div>
    </div>
  );
}
