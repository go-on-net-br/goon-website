import Link from "next/link";
import BlueBgBox from "../blueBgBox";

export default function HomeCards() {
  const cards = [
    {
      src: "/laptop.webp",
      text: "Seja uma revenda",
      href: "/credenciamento",
    },
    {
      src: "/products.webp",
      text: "Nossas marcas",
      href: "/marcas",
    },
    {
      src: "/handshake.webp",
      text: "Onde comprar",
      href: "/rede-credenciada",
    },
  ];
  return (
    <div className="flex flex-wrap justify-evenly gap-6">
      {cards.map((card, i) => {
        return (
          <Link key={card.text.slice(0, 4) + i} href={card?.href}>
            <BlueBgBox
              bgImage={card.src}
              boxStyles="card h-44 md:h-[475px] w-[320px] md:w-[350px] rounded-3xl shadow-md transition-all before:rounded-3xl after:rounded-3xl hover:scale-105"
            >
              <p className="absolute bottom-0 left-0 right-0 top-0 z-10 m-auto block h-fit w-56 text-center text-3xl md:text-4xl font-bold uppercase text-white">
                {card.text}
              </p>
            </BlueBgBox>
          </Link>
        );
      })}
    </div>
  );
}
