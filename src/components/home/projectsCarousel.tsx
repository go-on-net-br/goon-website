"use client";
import { useEffect, useRef, useState } from "react";
import Glider from "react-glider";
import arrow_left from "../../../public/arrow_left.svg";
import Image from "next/image";
import "glider-js/glider.min.css";
import { Projeto } from "@/types/projeto";
import HighlightedProjectsItem from "./highlightedProjectsItem";

export default function ProjectsCarousel({
  projectsData,
}: {
  projectsData: Projeto[];
}) {
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
    <div className="relative h-[350px]">
      <div className="absolute w-full md:static">
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
            responsive={[
              {
                breakpoint: 768,
                settings: {
                  slidesToShow: 3,
                },
              },
            ]}
          >
            {projectsData.map((project) => {
              return (
                <HighlightedProjectsItem project={project} key={project?.id} />
              );
            })}
          </Glider>
        )}
        <button
          ref={leftArrowEl}
          aria-label="navegar para a esquerda"
          className="absolute -left-4 bottom-0 z-10 hidden md:block md:h-[450px]"
        >
          <Image
            className="z-10 h-10 w-10 object-contain"
            alt="flecha apontada para esquerda"
            src={arrow_left}
          />
        </button>{" "}
        <button
          ref={rightArrowEl}
          aria-label="navegar para a direita"
          className="absolute bottom-0 z-10 hidden md:-right-11 md:block md:h-[450px]"
        >
          <Image
            className="h-10 w-10 scale-x-[-1] object-contain"
            alt="flecha apontada para direita"
            src={arrow_left}
          />
        </button>
        <div
          className="absolute left-0 right-0 md:-bottom-3"
          ref={dotsEl}
          id="dots"
        ></div>
      </div>
    </div>
  );
}
