import { Corporativo } from "@/types/components";
import Image from "next/image";
import separator from "../../../public/separator.svg";

export default function AboutInformation({
  information,
}: {
  readonly information: Corporativo[];
}) {
  return (
    <section className="my-32 flex flex-col items-center gap-32">
      {information?.map((info, i) => (
        <div
          className={
            "container flex max-w-screen-lg justify-center gap-6 " +
            (i % 2 ? "flex-row-reverse" : "flex-row")
          }
          key={"aboutInfo" + i}
        >
          <Image
            className={"w-64 object-contain " + (i % 2 ? " -mr-64" : "-ml-64")}
            alt="separador"
            src={separator}
          />
          <div
            className={
              "container flex items-center gap-32 " +
              (i % 2 ? "flex-row-reverse" : "flex-row")
            }
          >
            <h3 className="text-5xl font-bold uppercase text-primary first-line:font-normal">
              {info?.Titulo}
            </h3>
            <p className="text-justify text-lg text-primary">{info?.Corpo}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
