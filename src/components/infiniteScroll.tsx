import { ReactNode } from "react";

export default function InfiniteScroll({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex overflow-x-hidden">
      <div className="animate-marquee whitespace-nowrap py-12">{children}</div>
      <div className="animate-marquee2 absolute top-0 whitespace-nowrap py-12">
        {children}
      </div>
    </div>
  );
}
