import Link from "next/link";

export default function HomeCards() {
  const cards = [
    {
      src: "after:bg-[url('/sejaRevenda.webp')]",
      text: "Seja uma revenda",
      href: "/revendas",
    },
    {
      src: "after:bg-[url('/nossasMarcas.webp')]",
      text: "Nossas marcas",
      href: "/marcas",
    },
    {
      src: "after:bg-[url('/ondeComprar.webp')]",
      text: "Onde comprar",
      href: "/onde-comprar",
    },
  ];
  return (
    <div className="flex flex-wrap justify-evenly gap-6">
      {cards.map((card, i) => {
        return (
          <Link key={card.text.slice(0, 4) + i} href={card?.href}>
            <div
              className={`card relative h-[475px] w-[350px] rounded-3xl shadow-md transition-all before:absolute before:top-0  before:z-[0] before:h-full before:w-full before:rounded-3xl before:bg-[#003ef9] before:content-[''] after:absolute after:top-0 after:z-[1] after:block after:h-full after:w-full after:rounded-3xl ${card.src} after:bg-cover after:bg-center after:bg-no-repeat after:opacity-[14%] after:content-[''] hover:scale-105`}
            >
              <p className="absolute bottom-0 left-0 right-0 top-0 z-10 m-auto block h-fit w-56 text-center text-4xl font-bold uppercase text-white">
                {card.text}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
