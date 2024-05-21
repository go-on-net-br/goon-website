import { Corporativo } from "@/types/components";

export default function AboutMVV({ mvv }: { readonly mvv: Corporativo[] }) {
  return (
    <section className="container mx-auto flex max-w-screen-xl justify-center py-12">
      <div className="flex flex-row justify-center gap-10">
        {mvv?.map((card, i) => (
          <div
            className="card card-normal bg-primary py-12 shadow-lg"
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
