"use client";
import ApiImage from "../ApiImage";
import { useEffect, useRef, useState } from "react";
import Glider from "react-glider";
import arrow_left from "../../../public/arrow_left.svg";
import Image from "next/image";
import "glider-js/glider.min.css";
import { Projeto } from "@/types/projeto";

export default function ProjectCarrousel({ project }: { project: Projeto }) {
  const dotsEl = useRef<HTMLDivElement>(null);
  const leftArrowEl = useRef<HTMLButtonElement>(null);
  const rightArrowEl = useRef<HTMLButtonElement>(null);

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (dotsEl?.current) {
      setIsReady(true);
    }
  }, []);

  return (
    <div className="relative w-full">
      <div className="">
        {isReady && (
          <Glider
            arrows={{
              prev: leftArrowEl.current,
              next: rightArrowEl.current,
            }}
            hasArrows
            hasDots
            dots={dotsEl.current}
            rewind
            duration={0.3}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {project.attributes.media.data.map((pic) => {
              return (
                <ApiImage
                  image={pic}
                  key={pic.id}
                  contentStyles="object-contain rounded-2xl"
                />
              );
            })}
          </Glider>
        )}
        <div className="md:absolute md:-bottom-8 md:left-0 md:right-0 md:flex md:items-center md:justify-center md:gap-3">
          <button
            ref={leftArrowEl}
            aria-label="navegar para a esquerda"
            className="absolute -left-6 bottom-0 top-0 z-10 md:static"
          >
            <Image
              className="z-10 h-8 w-8 rounded-full border bg-white object-contain p-2 shadow-lg md:z-10 md:h-6 md:w-6 md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none"
              alt="flecha apontada para esquerda"
              src={arrow_left}
            />
          </button>
          <div className="" ref={dotsEl} id="dots"></div>
          <button
            ref={rightArrowEl}
            aria-label="navegar para a direita"
            className="absolute -right-6 bottom-0 top-0 z-10 md:static md:-right-11"
          >
            <Image
              className="h-8 w-8 scale-x-[-1] rounded-full border bg-white object-contain p-2 shadow-lg md:h-6 md:w-6 md:scale-x-[-1] md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none"
              alt="flecha apontada para direita"
              src={arrow_left}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
