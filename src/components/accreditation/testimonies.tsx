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
            {testimoniesData.map((testimony) => {
              const { Cargo, Depoimento, Empresa, Foto, Nome } =
                testimony?.attributes;
              return (
                <div
                  className="card ml-6 max-h-[500px] bg-primary pb-8 text-white shadow-xl"
                  key={testimony.id}
                >
                  <figure className="flex items-center justify-center p-8">
                    <ApiImage
                      image={Foto?.data}
                      contentStyles="object-contain w-24 h-24 md:w-40 md:h-40 rounded-full"
                    />
                  </figure>
                  <div className="card-body pt-0">
                    <header className="card-title flex-col pb-3 text-center">
                      <h3 className="text-xl font-light md:text-3xl">{Nome}</h3>
                      <p className="text-base font-light md:text-lg">
                        {Cargo} <span className="font-bold">{Empresa}</span>
                      </p>
                    </header>
                    <p className="text-sm md:text-base">{Depoimento}</p>
                  </div>
                </div>
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
