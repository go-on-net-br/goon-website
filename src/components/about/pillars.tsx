import { Pilares } from "@/types/components";
import ApiImage from "../ApiImage";

export default function AboutPillars({
  pillars,
}: {
  readonly pillars: Pilares[];
}) {
  const imgStyles = "h-40 w-40 object-contain object-center";
  return (
    <section className="container mx-auto flex max-w-screen-xl flex-col items-center py-12">
      <div className="container flex flex-col items-center gap-8">
        <h2 className="text-3xl font-bold text-primary">Pilares da Empresa</h2>
        <div className="grid-lines-3 grid grid-cols-1 justify-center gap-10 md:grid-cols-3">
          {pillars?.map((pillar, i) => (
            <div
              className="flex w-72 flex-col items-center justify-start gap-5"
              key={"aboutPillar" + i}
            >
              <div className="">
                <ApiImage
                  image={pillar?.Imagem?.data}
                  contentStyles={imgStyles}
                />
              </div>
              <div className="flex h-20 items-center">
                <p className="text-center text-3xl font-bold text-primary">
                  {pillar?.Titulo}
                </p>
              </div>
              <p className=" text-center text-black">{pillar?.Corpo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
