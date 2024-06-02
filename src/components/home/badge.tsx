import Image from "next/image";

export default function Badge({
  badges,
  white = false,
}: {
  badges: { src: any; text: string }[];
  white?: boolean;
}) {
  return (
    <div className="mt-16 grid grid-cols-2 items-center justify-center gap-10 md:flex md:flex-wrap md:justify-evenly">
      {badges?.map((badge, i) => (
        <div
          className="flex flex-col items-center gap-3"
          key={badge?.text.slice(0, 5) + i}
        >
          <Image
            src={badge?.src}
            alt={badge?.text}
            className="h-w-12 w-12 object-contain"
          />
          <p
            className={
              "whitespace-pre text-lg font-medium " +
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
