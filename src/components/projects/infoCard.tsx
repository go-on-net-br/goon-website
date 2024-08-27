import Image from "next/image";

export default function InfoCard({
  card,
}: {
  card: {
    src: any;
    title: string;
    description: string;
  };
}) {
  return (
    <div
      className="card mx-2 w-full rounded-3xl bg-primary shadow-xl md:mx-0 md:h-[390px] md:w-96"
      key={card.title}
    >
      <figure className="px-4 pt-4 md:px-8 md:pt-8">
        <Image src={card.src} alt={card.title} className="max-w-20" />
      </figure>
      <div className="card-body p-4 md:p-8">
        <h2 className="card-title mx-auto mb-2 text-3xl font-medium leading-8">
          {card.title}
        </h2>
        <p className="text-sm">{card.description}</p>
      </div>
    </div>
  );
}
