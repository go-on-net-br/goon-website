import { Corporativo } from "@/types/components";

export default function AboutMVV({ mvv }: { readonly mvv: Corporativo[] }) {
  return (
    <section className="flex justify-center py-12">
      <div className="container flex max-w-screen-lg flex-row justify-center gap-10">
        {mvv?.map((card, i) => (
          <div className="card card-normal bg-primary py-12 shadow-lg">
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
