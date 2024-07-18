import { Projeto } from "@/types/projeto";
import HighlightedProjectsItem from "./highlightedProjectsItem";

export default function HighlightedProjects({
  projects,
}: {
  projects: Projeto[];
}) {
  const chunkSize = 3;
  const slides: Projeto[][] = [];
  for (let i = 0; i < projects.length; i += chunkSize) {
    const chunk = projects.slice(i, i + chunkSize);
    slides.push(chunk);
  }
  return (
    <section className="mt-4 md:mt-12">
      <div className="carousel hidden w-full md:inline-flex">
        {slides?.map((slide, i) => {
          return (
            <div
              key={"homeProjectsSlide" + i}
              id={"slide" + (i + 1)}
              className="carousel-item relative w-full"
            >
              <div className="flex w-full justify-center gap-6">
                {slide.map((card, j) => {
                  return (
                    <HighlightedProjectsItem
                      project={card}
                      key={"slide" + i + "card" + j}
                    ></HighlightedProjectsItem>
                  );
                })}
              </div>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href={"#slide" + i}
                  className="btn btn-circle border-0 bg-white text-primary shadow"
                >
                  ❮
                </a>
                <a
                  href={"#slide" + (i + 2)}
                  className="btn btn-circle border-0 bg-white text-primary shadow"
                >
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div className="carousel w-full md:hidden">
        {projects.map((project, i) => {
          return (
            <div
              key={"homeProjectsSlide" + i}
              id={"card" + (i + 1)}
              className="carousel-item relative flex w-full justify-center"
            >
              <HighlightedProjectsItem
                project={project}
              ></HighlightedProjectsItem>
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href={"#card" + i}
                  className="btn btn-circle border-0 bg-white text-primary shadow"
                >
                  ❮
                </a>
                <a
                  href={"#card" + (i + 2)}
                  className="btn btn-circle border-0 bg-white text-primary shadow"
                >
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
