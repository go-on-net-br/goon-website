import { Corporativo } from "@/types/components";
import MvvCard from "./mvvCard";
import MvvCarrousel from "./mvvCarousel";

export default function AboutMVV({ mvv }: { readonly mvv: Corporativo[] }) {
  return (
    <section className="container flex max-w-screen-xl justify-center px-2 py-12 md:mx-auto">
      <div className="hidden flex-col justify-center gap-4 md:flex md:flex-row md:gap-10">
        {mvv?.map((card) => (
          <MvvCard title={card.Titulo} key={card.Titulo}>
            {card.Corpo}
          </MvvCard>
        ))}
      </div>
      <div className="md:hidden">
        <MvvCarrousel mvv={mvv} />
      </div>
    </section>
  );
}
