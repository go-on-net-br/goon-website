import { useState } from "react";
import { Media } from "@/types/common";
import Image from "next/image";
import ApiImage from "../ApiImage";
import arrow_left from "../../../public/arrow_left.svg";

export default function ProductsCarousel({ media }: { media: Media[] }) {
  const [page, setPage] = useState(0);

  function changePage(newValue: number) {
    if (newValue >= 0 && newValue < media.length) {
      setPage(newValue);
    }
  }

  return (
    <>
      <div className="carousel flex h-full max-h-full w-full max-w-full flex-col justify-center">
        <ApiImage
          contentStyles="object-contain py-12 max-h-[50vh] md:max-h-full max-w-full"
          image={media[page]}
        />
        <div className="flex items-center justify-center gap-2 align-text-bottom text-xl text-primary md:absolute md:bottom-2 md:left-1/2 md:-translate-x-1/2 md:transform">
          <button onClick={() => changePage(page - 1)}>
            <Image
              className=" h-4 w-4 object-contain"
              alt="flecha apontada para esquerda"
              src={arrow_left}
            />
          </button>
          <span className="text-base font-light">
            {page + 1} de {media.length}
          </span>
          <button onClick={() => changePage(page + 1)}>
            <Image
              className=" h-4 w-4 scale-x-[-1] object-contain"
              alt="flecha apontada para esquerda"
              src={arrow_left}
            />
          </button>
        </div>
      </div>
    </>
  );
}
