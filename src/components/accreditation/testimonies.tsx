"use client";
import { Depoimento } from "@/types/depoimento";
import ApiImage from "../ApiImage";
import { useEffect, useRef, useState } from "react";
import Glider from "react-glider";
import arrow_left from "../../../public/arrow_left.svg";
import Image from "next/image";
import "glider-js/glider.min.css";

export default function Testimonies({
  testimoniesData,
}: {
  testimoniesData: Depoimento[];
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
    <div className="relative h-[500px]">
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
            slidesToShow={3}
            slidesToScroll={1}
          >
            {testimoniesData.map((testimony) => {
              const { Cargo, Depoimento, Empresa, Foto, Nome } =
                testimony?.attributes;
              return (
                <div
                  className="card max-h-[500px] bg-primary pb-8 text-white shadow-xl ml-6"
                  key={testimony.id}
                >
                  <figure className="flex items-center justify-center p-8">
                    <ApiImage
                      image={Foto?.data}
                      contentStyles="object-contain w-40 h-40 rounded-full"
                    />
                  </figure>
                  <div className="card-body pt-0">
                    <header className="card-title flex-col pb-3 text-center">
                      <h3 className="text-3xl font-light">{Nome}</h3>
                      <p className="text-lg font-light">
                        {Cargo} <span className="font-bold">{Empresa}</span>
                      </p>
                    </header>
                    <p>{Depoimento}</p>
                  </div>
                </div>
              );
            })}
          </Glider>
        )}
        <button
          ref={leftArrowEl}
          aria-label="navegar para a esquerda"
          className="absolute bottom-0 -left-4 z-10 hidden md:block md:h-[450px]"
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
          className="absolute -bottom-3 left-0 right-0"
          ref={dotsEl}
          id="dots"
        ></div>
      </div>
    </div>
  );
}
