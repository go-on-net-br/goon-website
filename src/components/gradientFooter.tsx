import { ReactNode } from "react";

export default function GradientFooter({
  children,
  bgImage,
  boxStyles,
}: {
  children: ReactNode;
  bgImage: string;
  boxStyles: string;
}) {
  return (
    <section className="relative h-[650px] w-full">
      <div className="absolute left-0 top-0 z-[2] h-full w-full bg-gradient-to-r from-primary from-55% to-transparent to-70%"></div>
      <div
        style={{ "--bgImage": `url(${bgImage})` } as any}
        className={`card relative h-[650px] before:absolute  before:top-0 before:z-[0] before:h-full before:w-full before:bg-[#003ef9] before:content-[''] after:absolute after:top-0 after:z-[1] after:block after:h-full after:w-full ${boxStyles} after:bg-[image:var(--bgImage)] after:bg-contain after:bg-right after:bg-no-repeat after:opacity-[27%] after:content-['']`}
      >
        <div className="relative z-[3] h-full">{children}</div>
      </div>
    </section>
  );
}
