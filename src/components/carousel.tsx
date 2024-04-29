"use client";

import { Media } from "@/types/common";
import { Carrossel } from "@/types/components";
import Image from "next/image";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import { useEffect, useRef, useState } from "react";
import arrow_left from "../../public/arrow_left.svg";

function CarouselImage({ image }: { image: Media }) {
  const imageInfo = image?.data?.attributes ?? {};

  return (
    <Image
      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageInfo.url}`}
      width={imageInfo.width}
      height={imageInfo.height}
      alt={imageInfo.alternativeText ?? ""}
      className="w-full h-[450px] object-contain object-center m-auto"
    />
  );
}

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

  return (
    <div className="relative h-[450px]">
      <div className="md:static absolute w-[calc(100vw-1.5rem)] md:w-auto">
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
                  className="carousel-item relative w-full h-fit"
                >
                  {slide?.URL ? (
                    <a href={slide?.URL} className="h-fit">
                      <CarouselImage image={slide.Midia} />
                    </a>
                  ) : (
                    <CarouselImage image={slide.Midia} />
                  )}
                </div>
              );
            })}
          </Glider>
        )}
        <button
          ref={leftArrowEl}
          aria-label="navegar para a esquerda"
          className="hidden md:block absolute z-10 md:h-[450px] bottom-0 left-1"
        >
          <Image
            className="shadow z-10 w-10 h-10 invert object-contain"
            alt="flecha apontada para esquerda"
            src={arrow_left}
          />
        </button>{" "}
        <button
          ref={rightArrowEl}
          aria-label="navegar para a direita"
          className="hidden md:block absolute md:h-[450px] bottom-0 md:right-1 z-10"
        >
          <Image
            className="shadow w-10 h-10 invert object-contain scale-x-[-1]"
            alt="flecha apontada para direita"
            src={arrow_left}
          />
        </button>
        <div
          className="absolute bottom-[40px] right-0 left-0"
          ref={dotsEl}
          id="dots"
        ></div>
      </div>
    </div>
  );
}
