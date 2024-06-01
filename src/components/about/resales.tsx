import { Revendas } from "@/types/components";
import ApiImage from "../ApiImage";
import Image from "next/image";
import separator from "../../../public/separator_white.svg";

export default function AboutResales({
  resales,
}: {
  readonly resales: Revendas;
}) {
  const imgStyles = "w-96 h-auto";
  const separatorStyle = "w-12";
  const { Titulo, Foto, Corpo } = resales;
  return (
    <section className="flex justify-center bg-primary p-10">
      <div className="container mx-auto max-w-screen-xl">
        <div className="w- flex flex-col gap-8 md:flex-row">
          <ApiImage contentStyles={imgStyles} image={Foto.data}></ApiImage>
          <div className="flex flex-col justify-center gap-8">
            <Image
              src={separator}
              alt="separador"
              className={separatorStyle}
            ></Image>
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold text-white">{Titulo}</h2>
              <p className="text-white">{Corpo}</p>
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
