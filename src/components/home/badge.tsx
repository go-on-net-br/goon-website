import Image from "next/image";

type BadgeTextSize = "sm" | "md" | "lg";
export type BadgeProps = { src: any; text: string; fontSize: BadgeTextSize };

export default function Badge({
  badges,
  white = false,
}: {
  badges: BadgeProps[];
  white?: boolean;
}) {
  return (
    <div className="mx-auto grid w-full grid-cols-2 gap-2 md:grid-cols-3">
      {badges?.map((badge, i) => {
        let fontSize = "text-sm md:text-xl ";
        if (badge.fontSize === "md") {
          fontSize = "text-xs md:text-lg ";
        }
        if (badge.fontSize === "sm") {
          fontSize = "text-[10px] md:text-sm ";
        }

        const badgeText = badge.text.split("\n");
        return (
          <div
            className={
              "mx-auto flex w-80 gap-2 " +
              (i === badges.length - 1 && badges.length % 2 === 1
                ? "col-span-2 md:col-span-1 "
                : "")
            }
            key={badge?.text.slice(0, 5) + i}
          >
            <div className="h-14 p-2 md:h-16 md:w-24">
              <Image
                src={badge?.src}
                alt={badge?.text}
                className="mx-auto h-full w-fit object-contain object-center"
              />
            </div>
            <p className="flex flex-col justify-center uppercase tracking-widest">
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
