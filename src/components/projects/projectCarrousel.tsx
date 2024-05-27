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
        (index % 2 && "flex-row-reverse") +
        " flex  items-center justify-between gap-8"
      }
    >
      <div className="flex w-[600px] flex-col items-center gap-4">
        <ApiImage
          image={media.data[currPic]}
          contentStyles="object-contain h-[600px] w-full"
        />
        <div className="flex flex-wrap gap-4">
          {media.data.map((pic, i) => {
            return (
              <div
                key={pic.id}
                className={
                  currPic === i ? " border-4 border-primary" : " cursor-pointer"
                }
                onClick={() => setCurrPic(i)}
              >
                <ApiImage
                  image={pic}
                  contentStyles="object-cover w-[104px] h-[104px]"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-[540px]">
        <header className="mb-6 text-primary">
          <h2 className="mb-3 text-5xl font-bold">{Titulo}</h2>
          <p className="text-2xl font-normal uppercase">
            By {revenda?.data?.attributes?.Titulo}
          </p>
        </header>
        <p className="text-xl text-black">{Sobre}</p>
      </div>
    </div>
  );
}
