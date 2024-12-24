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
    <div className="flex flex-col justify-evenly md:flex-row">
      {cards.map((card, i) => {
        return (
          <Link
            key={card.text.slice(0, 4) + i}
            href={card?.href}
            className="md:w-1/3"
          >
            <BlueBgBox
              bgImage={card.src}
              boxStyles="h-44 md:h-[475px] w-full transition-all hover:scale-105 hover:z-10"
            >
              <p className="absolute bottom-0 left-0 right-0 top-0 z-10 m-auto block h-fit w-56 text-center text-3xl font-bold uppercase text-white first-line:font-normal md:text-4xl">
                {card.text}
              </p>
            </BlueBgBox>
          </Link>
        );
      })}
    </div>
  );
}
