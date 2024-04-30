import Image from "next/image";

export default function Badge({ text, src }: { text: string; src: any }) {
  return (
    <div className="flex flex-col gap-3">
      <Image src={src} alt={text} className="w-12 h-w-12 object-contain" />
      <p className="text-primary font-medium text-lg whitespace-pre">{text}</p>
    </div>
  );
}
