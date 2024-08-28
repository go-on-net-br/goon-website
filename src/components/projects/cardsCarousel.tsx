"use client";
import ApiImage from "../ApiImage";
import { useEffect, useRef, useState } from "react";
import Glider from "react-glider";
import arrow_left from "../../../public/arrow_left.svg";
import Image from "next/image";
import "glider-js/glider.min.css";
import InfoCard from "./infoCard";

export default function CardsCarousel({
  cards,
}: {
  cards: {
    src: any;
    title: string;
    description: string;
  }[];
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
            {cards.map((card) => {
              return <InfoCard card={card} key={card.title} />;
            })}
          </Glider>
        )}
        <button
          ref={leftArrowEl}
          aria-label="navegar para a esquerda"
          className="absolute -left-6 bottom-0 top-0 z-10 md:-left-10 md:block"
        >
          <Image
            className="z-10 h-10 w-10 rounded-full border bg-white object-contain p-2 shadow-lg md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none "
            alt="flecha apontada para esquerda"
            src={arrow_left}
          />
        </button>
        <button
          ref={rightArrowEl}
          aria-label="navegar para a direita"
          className="absolute -right-6 bottom-0 top-0 z-10 md:-right-11 md:block "
        >
          <Image
            className="h-10 w-10 scale-x-[-1] rounded-full border bg-white object-contain p-2 shadow-lg md:rounded-none md:border-none md:bg-transparent md:p-0 md:shadow-none"
            alt="flecha apontada para direita"
            src={arrow_left}
          />
        </button>
        <div
          className="absolute -bottom-10 left-0 right-0"
          ref={dotsEl}
          id="dots"
        ></div>
      </div>
    </div>
  );
}
