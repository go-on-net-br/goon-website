"use client";

import { Carrossel } from "@/types/components";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import { useEffect, useRef, useState } from "react";
import arrow_left from "../../public/arrow_left.svg";
import ApiImage from "./ApiImage";
import Image from "next/image";

export default function Carousel({ carousel }: { carousel: Carrossel[] }) {
  const dotsEl = useRef<HTMLDivElement>(null);
  const leftArrowEl = useRef<HTMLButtonElement>(null);
  const rightArrowEl = useRef<HTMLButtonElement>(null);

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (dotsEl?.current) {
      setIsReady(true);
    }
  }, []);

  const imgStyles = "w-full h-[450px] object-contain object-center m-auto";

  return (
    <div className="relative h-[450px]">
      <div className="absolute w-[calc(100vw-1.5rem)] md:static md:w-auto">
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
            {carousel?.map((slide, i) => {
              return (
                <div
                  key={slide?.Titulo}
                  className="carousel-item relative h-fit w-full"
                >
                  {slide?.URL ? (
                    <a href={slide?.URL} className="h-fit">
                      <ApiImage contentStyles={imgStyles} image={slide.Midia.data} />
                    </a>
                  ) : (
                    <ApiImage contentStyles={imgStyles} image={slide.Midia.data} />
                  )}
                </div>
              );
            })}
          </Glider>
        )}
        <button
          ref={leftArrowEl}
          aria-label="navegar para a esquerda"
          className="absolute bottom-0 left-1 z-10 hidden md:block md:h-[450px]"
        >
          <Image
            className="z-10 h-10 w-10 object-contain shadow invert"
            alt="flecha apontada para esquerda"
            src={arrow_left}
          />
        </button>{" "}
        <button
          ref={rightArrowEl}
          aria-label="navegar para a direita"
          className="absolute bottom-0 z-10 hidden md:right-1 md:block md:h-[450px]"
        >
          <Image
            className="h-10 w-10 scale-x-[-1] object-contain shadow invert"
            alt="flecha apontada para direita"
            src={arrow_left}
          />
        </button>
        <div
          className="absolute bottom-[40px] left-0 right-0"
          ref={dotsEl}
          id="dots"
        ></div>
      </div>
    </div>
  );
}
