import Image from "next/image";

export default function Badge({
  badges,
  white = false,
}: {
  badges: { src: any; text: string }[];
  white?: boolean;
}) {
  return (
    <div className="mt-16 flex flex-wrap items-center justify-around gap-10 px-4 md:justify-evenly">
      {badges?.map((badge, i) => (
        <div
          className="flex flex-col items-center gap-3"
          key={badge?.text.slice(0, 5) + i}
        >
          <Image
            src={badge?.src}
            alt={badge?.text}
            className="h-16 w-16 object-contain"
          />
          <p
            className={
              "whitespace-pre text-center text-lg font-semibold " +
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
