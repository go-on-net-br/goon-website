import { Revendas } from "@/types/components";
import ApiImage from "../ApiImage";
import Image from "next/image";
import separator from "../../../public/separator_white.svg";

export default function AboutResales({
  resales,
}: {
  readonly resales: Revendas;
}) {
  const imgStyles = "w-1/2 md:w-96 md:h-auto object-contain";
  const separatorStyle = "w-12";
  const { Titulo, Foto, Corpo } = resales;
  return (
    <section className="flex justify-center bg-primary py-10 md:px-40">
      <div className="container mx-auto max-w-screen-xl">
        <div className="flex gap-8">
          <ApiImage contentStyles={imgStyles} image={Foto.data}></ApiImage>
          <div className="flex flex-col justify-center gap-8">
            <Image
              src={separator}
              alt="separador"
              className={separatorStyle}
            ></Image>
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-bold text-white md:text-3xl">
                {Titulo}
              </h2>
              <p className="text-[10px] text-white md:text-base">{Corpo}</p>
            </div>
            <Image
              src={separator}
              alt="separador"
              className={separatorStyle}
            ></Image>
          </div>
        </div>
      </div>
    </section>
  );
}
