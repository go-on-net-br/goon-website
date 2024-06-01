import { Corporativo } from "@/types/components";
import Image from "next/image";
import separator from "../../../public/separator.svg";

export default function AboutInformation({
  information,
}: {
  readonly information: Corporativo[];
}) {
  return (
    <section className="my-32 flex flex-col items-center gap-32 overflow-hidden">
      {information?.map((info, i) => (
        <div
          className={
            "container flex max-w-screen-lg flex-col items-center justify-center gap-6 " +
            (i % 2 ? "md:flex-row-reverse" : "md:flex-row")
          }
          key={"aboutInfo" + i}
        >
          <Image
            className={
              "w-32 object-contain md:w-64 " +
              (i % 2 ? "md:-mr-64" : "md:-ml-64")
            }
            alt="separador"
            src={separator}
          />
          <div
            className={
              "container flex flex-col items-center gap-4 px-4 md:gap-32 md:px-0 " +
              (i % 2 ? "md:flex-row-reverse" : "md:flex-row")
            }
          >
            <h3 className="text-center text-3xl font-bold uppercase text-primary md:text-start md:text-5xl md:first-line:font-normal">
              {info?.Titulo}
            </h3>
            <p className="text-justify text-lg text-primary">{info?.Corpo}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
