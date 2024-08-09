import { Corporativo } from "@/types/components";
import Image from "next/image";
import separator from "../../../public/separator.svg";

export default function AboutInformation({
  information,
}: {
  readonly information: Corporativo[];
}) {
  return (
    <section className="my-32 flex flex-col items-center gap-8 overflow-hidden md:gap-32">
      {information?.map((info, i) => (
        <div
          className={
            "container flex max-w-screen-lg flex-col items-center justify-center gap-6 " +
            (i % 2 ? "md:flex-row-reverse" : "md:flex-row")
          }
          key={"aboutInfo" + i}
        >
          <div
            className={
              "container flex items-center gap-4 px-4 md:gap-32 md:px-0 " +
              (i % 2 ? "flex-row-reverse" : "flex-row")
            }
          >
            <Image
              className={
                "w-64 object-contain " +
                (i % 2 ? "-mr-32 md:-mr-64" : "-ml-32 md:-ml-64")
              }
              alt="separador"
              src={separator}
            />
            <h3
              className={
                "text-5xl font-bold uppercase text-primary first-line:font-normal " +
                (i % 2 ? "text-end" : "text-start")
              }
            >
              {info?.Titulo}
            </h3>
          </div>
          <p className="px-4 text-justify text-sm text-primary md:px-0 md:text-lg">
            {info?.Corpo}
          </p>
        </div>
      ))}
    </section>
  );
}
