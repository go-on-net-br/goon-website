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
        <div className="absolute -bottom-8 left-0 right-0 flex items-center justify-center gap-3 md:-bottom-8">
          <button
            ref={leftArrowEl}
            aria-label="navegar para a esquerda"
            className=""
          >
            <Image
              className="z-10 h-6 w-6 object-contain"
              alt="flecha apontada para esquerda"
              src={arrow_left}
            />
          </button>
          <div className="" ref={dotsEl} id="dots"></div>
          <button
            ref={rightArrowEl}
            aria-label="navegar para a direita"
            className=""
          >
            <Image
              className="h-6 w-6 scale-x-[-1] object-contain"
              alt="flecha apontada para direita"
              src={arrow_left}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
