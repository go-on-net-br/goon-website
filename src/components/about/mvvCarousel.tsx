"use client";
import { useEffect, useRef, useState } from "react";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import { Corporativo } from "@/types/components";
import MvvCard from "./mvvCard";

export default function MvvCarrousel({ mvv }: { readonly mvv: Corporativo[] }) {
  const dotsEl = useRef<HTMLDivElement>(null);

  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    if (dotsEl?.current) {
      setIsReady(true);
    }
  }, []);

  return (
    <div className="relative max-w-[100vw]">
      <div className="">
        {isReady && (
          <Glider
            hasDots
            dots={dotsEl.current}
            rewind
            duration={0.3}
            slidesToShow={1.1}
            slidesToScroll={1}
          >
            {mvv?.map((card) => (
              <MvvCard title={card.Titulo} key={card.Titulo}>
                {card.Corpo}
              </MvvCard>
            ))}
          </Glider>
        )}{" "}
        <div
          className="absolute -bottom-10 left-0 right-0"
          ref={dotsEl}
          id="dots"
        ></div>
      </div>
    </div>
  );
}
