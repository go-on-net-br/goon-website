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
      className="card card-normal flex h-full flex-col bg-goOnBlack py-12 shadow-lg transition-all hover:scale-105 hover:bg-goOnBlue"
      key={"aboutMvv_" + title}
    >
      <h3 className="px-4 text-center text-4xl font-bold uppercase text-white">
        {title}
      </h3>
      <div className="card-body flex-grow">
        <p className="text-center text-white">{children}</p>
      </div>
    </div>
  );
}
