import Image from "next/image";

export default function Badge({
  badges,
  white = false,
}: {
  badges: { src: any; text: string }[];
  white?: boolean;
}) {
  return (
    <div className="mt-16 flex flex-wrap justify-around gap-10 px-4 md:justify-evenly">
      {badges?.map((badge, i) => (
        <div
          className="flex flex-col gap-5"
          key={badge?.text.slice(0, 5) + i}
        >
          <div className="h-20 w-full p-2">
          <Image
            src={badge?.src}
            alt={badge?.text}
            className="h-full w-full object-left object-contain"
          />
          </div>
          <p
            className={
              "whitespace-pre text-lg font-semibold " +
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
