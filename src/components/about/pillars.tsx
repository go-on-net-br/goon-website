import { Pilares } from "@/types/components";
import ApiImage from "../ApiImage";

export default function AboutPillars({
  pillars,
}: {
  readonly pillars: Pilares[];
}) {
  const imgStyles = "min-h-20 min-w-20 h-40 w-40 object-contain object-center";
  return (
    <section className="container mx-auto flex max-w-screen-xl flex-col items-center py-12">
      <div className="container flex flex-col items-center gap-8">
        <h2 className="hidden text-3xl font-bold text-primary md:block">
          Pilares da Empresa
        </h2>
        <div className="grid-lines-3 grid grid-cols-1 justify-center gap-10 md:grid-cols-3">
          {pillars?.map((pillar, i) => (
            <div
              className={
                "flex w-72 items-center justify-start gap-5 md:flex-col" +
                (i % 2 ? " flex-row-reverse" : " flex-row")
              }
              key={"aboutPillar" + i}
            >
              <div className="">
                <ApiImage
                  image={pillar?.Imagem?.data}
                  contentStyles={imgStyles}
                />
              </div>
              <div className="flex flex-col items-start md:items-center">
                <p className="text-xl font-bold text-primary md:h-20 md:text-center md:text-3xl">
                  {pillar?.Titulo}
                </p>
                <p className="text-sm text-black md:text-center md:text-base">
                  {pillar?.Corpo}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
