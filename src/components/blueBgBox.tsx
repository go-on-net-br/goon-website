import { ReactNode } from "react";

export default function BlueBgBox({
  children,
  bgImage,
  boxStyles,
}: {
  children: ReactNode;
  bgImage: string;
  boxStyles: string;
}) {
  return (
    <div
      style={
        { "--bgImage": `url(${bgImage})` } as any
      }
      className={`card relative before:absolute before:top-0  before:z-[0] before:h-full before:w-full before:bg-[#003ef9] before:content-[''] after:absolute after:top-0 after:z-[1] after:block after:h-full after:w-full ${boxStyles} after:bg-[image:var(--bgImage)] after:bg-cover after:bg-center after:bg-no-repeat after:opacity-[14%] after:content-[''] `}
    >
      {children}
    </div>
  );
}
