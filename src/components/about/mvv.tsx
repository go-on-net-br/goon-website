import { Corporativo } from "@/types/components";

export default function AboutMVV({ mvv }: { readonly mvv: Corporativo[] }) {
  return (
    <section className="container flex max-w-screen-xl justify-center px-2 py-12 md:mx-auto">
      <div className="flex flex-col justify-center gap-4 md:flex-row md:gap-10">
        {mvv?.map((card, i) => (
          <div
            className="card card-normal bg-primary py-12 shadow-lg transition-all hover:scale-105"
            key={"aboutMvv_" + card.Titulo}
          >
            <h3 className="text-center text-4xl font-bold uppercase text-white">
              {card?.Titulo}
            </h3>
            <div className="card-body">
              <p className="text-center text-white">{card?.Corpo}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
