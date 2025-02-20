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
  let smallerWid = `${badges[0]?.src?.width}px`;
  let smallerHei = `${badges[0]?.src?.height}px`;
  badges.forEach((bdg) => {
    if (bdg?.src?.width < smallerWid) {
      smallerWid = `${bdg?.src?.width}px`;
    }
    if (bdg?.src?.height < smallerHei) {
      smallerWid = `${bdg?.src?.height}px`;
    }
  });
  return (
    <div className="-ml-5 xs:mx-auto grid w-full grid-cols-2 gap-2 md:grid-cols-3">
      {badges?.map((badge, i) => {
        let fontSize = "text-sm md:text-xl !leading-[1.25rem] ";
        if (badge.fontSize === "md") {
          fontSize = "text-xs md:text-lg !leading-[1.45rem] ";
        }
        if (badge.fontSize === "sm") {
          fontSize = "text-[10px] md:text-sm !leading-[1.25rem] ";
        }

        const badgeText = badge.text.split("\n");
        return (
          <div
            className={
              "mx-auto flex w-fit gap-2 xs:scale-100 scale-[87%]" +
              (i === badges.length - 1 && badges.length % 2 === 1
                ? "col-span-2 md:col-span-1 "
                : "")
            }
            key={badge?.text.slice(0, 5) + i}
          >
            <div
              className="h-14 p-2 md:h-16"
              style={{ width: smallerWid, height: smallerHei }}
            >
              <Image
                src={badge?.src}
                alt={badge?.text}
                className="mx-auto h-full w-fit object-contain object-center"
              />
            </div>
            <p className="whitespace-nowrap flex flex-col justify-center uppercase tracking-widest">
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
