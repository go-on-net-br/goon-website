import Image from "next/image";

export default function Badge({
  badges,
  white = false,
}: {
  badges: { src: any; text: string; fontSize: string }[];
  white?: boolean;
}) {
  return (
    <div className="mx-auto grid w-full grid-cols-2 md:grid-cols-3 gap-2">
      {badges?.map((badge, i) => {
        let fontSize = "text-sm md:text-xl ";
        if (badge.fontSize === "md") {
          fontSize = "text-xs md:text-lg ";
        }
        if (badge.fontSize === "sm") {
          fontSize = "text-xxs md:text-md ";
        }

        const badgeText = badge.text.split("\n");
        return (
          <div
            className={"mx-auto flex w-80 gap-2 " + (i === badges.length - 1 ? "col-span-2 md:col-span-1 " : "")}
            key={badge?.text.slice(0, 5) + i}
          >
            <div className="h-14 md:h-16 md:w-24 p-2">
              <Image
                src={badge?.src}
                alt={badge?.text}
                className="ml-auto h-full w-fit object-contain object-left"
              />
            </div>
            <p className="flex flex-col uppercase tracking-widest justify-center">
              {badgeText.map((txt, txtI) => {
                return (
                  <span
                    key={txt + txtI}
                    className={
                      (white ? "text-white " : "text-primary ") +
                      fontSize +
                      (txtI === 0 ? "font-extralight" : "font-semibold")
                    }
                  >
                    {txt}
                  </span>
                );
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
}
