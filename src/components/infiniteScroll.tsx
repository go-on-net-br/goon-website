import { ReactNode } from "react";

export default function InfiniteScroll({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex overflow-hidden">
      <div className="flex animate-marquee items-center whitespace-nowrap pt-6 pb-12">
        {children}
      </div>
      <div className="absolute top-0 flex animate-marquee2 items-center whitespace-nowrap pt-6 pb-12">
        {children}
      </div>
    </div>
  );
}
