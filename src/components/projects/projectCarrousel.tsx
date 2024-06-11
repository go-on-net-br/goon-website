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
  return (
    <div
      className={
        (index % 2 ? "md:flex-row-reverse " : "md:flex-row ") +
        " flex flex-col items-center justify-between gap-8"
      }
    >
      <div className="flex flex-col items-center gap-4 md:w-[600px]">
        <ApiImage
          image={media.data[currPic]}
          contentStyles="object-contain h-[300px] md:h-[600px] w-full"
        />
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
                <ApiImage
                  image={pic}
                  contentStyles="object-cover w-14 h-14 md:w-[104px] md:h-[104px]"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full md:w-[540px]">
        <header className="mb-6 text-primary">
          <h2 className="mb-3 text-2xl font-bold md:text-5xl">{Titulo}</h2>
          <p className="text-2xl font-normal uppercase">
            By {revenda?.data?.attributes?.Titulo}
          </p>
        </header>
        <p className="text-black md:text-lg">{Sobre}</p>
      </div>
    </div>
  );
}
