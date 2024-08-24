import Image from "next/image";

export default function HomeBadge({
  badges,
  white = false,
}: {
  badges: { src: any; text: string }[];
  white?: boolean;
}) {
  return (
    <div className="md:mx-6 mt-6 grid grid-cols-3 gap-4 px-4 md:flex md:flex-wrap md:justify-evenly">
      {badges?.map((badge, i) => (
        <div
          className="flex flex-col items-center gap-2 md:max-w-[140px]"
          key={badge?.text.slice(0, 5) + i}
        >
          <div className="h-20 w-16 p-2 md:w-full md:max-w-[76px]">
            <Image
              src={badge?.src}
              alt={badge?.text}
              className="h-full w-full object-contain"
            />
          </div>
          <p
            className={
              "whitespace-pre-wrap text-center text-sm font-semibold md:text-lg " +
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
