import { ReactNode } from "react";

export default function MvvCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div
      className="card card-normal mx-2 bg-primary py-12 shadow-lg transition-all hover:scale-105  md:mx-0"
      key={"aboutMvv_" + title}
    >
      <h3 className="text-center text-4xl font-bold uppercase text-white">
        {title}
      </h3>
      <div className="card-body">
        <p className="text-center text-white">{children}</p>
      </div>
    </div>
  );
}
