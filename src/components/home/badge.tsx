import Image from "next/image";

export default function Badge({
  badges,
  white = false,
}: {
  badges: { src: any; text: string }[];
  white?: boolean;
}) {
  return (
    <div className="mx-6 mt-16 flex flex-wrap justify-around gap-9 px-4 md:justify-evenly">
      {badges?.map((badge, i) => (
        <div
          className="flex flex-col gap-2 last:flex-row md:max-w-[140px] md:gap-5 md:last:flex-col"
          key={badge?.text.slice(0, 5) + i}
        >
          <div className="h-20 w-16 p-2 last:w-24 md:w-full md:max-w-[76px] md:last:w-16">
            <Image
              src={badge?.src}
              alt={badge?.text}
              className="h-full w-full object-contain object-left"
            />
          </div>
          <p
            className={
              "whitespace-pre-wrap text-sm font-semibold md:text-lg " +
              (white ? "text-white" : "text-primary")
            }
          >
            {badge?.text}
          </p>
        </div>
      ))}
    </div>
  );
}
