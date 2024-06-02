import Image from "next/image";

export default function Badge({
  badges,
  white = false,
}: {
  badges: { src: any; text: string }[];
  white?: boolean;
}) {
  return (
    <div className="mt-16 flex flex-wrap items-center justify-evenly gap-10">
      {badges?.map((badge, i) => (
        <div className="flex flex-col gap-3" key={badge?.text.slice(0, 5) + i}>
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
