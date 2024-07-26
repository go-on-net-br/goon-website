import { Projeto } from "@/types/projeto";
import ApiImage from "../ApiImage";

export default function HighlightedProjectsItem({
  project,
}: {
  project: Projeto;
}) {
  return (
    <div className="card mb-8 mx-6  bg-base-100 shadow-xl">
      <div className="flex flex-col items-center gap-4 p-4">
        <ApiImage
          image={project?.attributes?.media?.data[0]}
          contentStyles="h-32 object-cover w-full rounded-md"
        />
        <div className="flex w-full flex-col items-center text-center uppercase">
          <h2 className="text-lg font-bold text-goOnGrey">
            {project?.attributes?.Titulo}
          </h2>
          <h3 className="font-light text-sm md:text-base">
            By {project?.attributes?.revenda?.data?.attributes?.Titulo}
          </h3>
        </div>
        <a href="/projetos" className="font-bold text-primary underline">
          Veja mais
        </a>
      </div>
    </div>
  );
}
