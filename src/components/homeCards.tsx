import Link from "next/link";

export default function HomeCards() {
  const cards = [
    {
      src: "before:bg-[url('/sejaRevenda.webp')]",
      text: "Seja revenda",
      href: "/revendas",
    },
    {
      src: "before:bg-[url('/nossasMarcas.webp')]",
      text: "Nossas marcas",
      href: "/marcas",
    },
    {
      src: "before:bg-[url('/ondeComprar.webp')]",
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
              className={`relative h-[375px] w-[280px] rounded-3xl before:absolute before:top-0 before:z-0 before:block before:h-full before:w-full  before:rounded-3xl before:opacity-50 after:rounded-3xl ${card.src} transition-all before:bg-cover before:bg-center before:bg-no-repeat before:blur-sm before:content-[''] after:absolute after:top-0 after:z-[1] after:h-full after:w-full after:bg-[#003ef9ad] after:content-[''] hover:scale-105`}
            >
              <p className="absolute bottom-0 left-0 right-0 top-0 z-10 m-auto block h-fit w-fit text-center text-4xl font-bold uppercase text-white">
                {card.text}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
