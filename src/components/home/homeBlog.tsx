import { Blog } from "@/types/blog";
import ApiImage from "../ApiImage";
import universalSlugify from "@/helpers/universalSlugify";
import BlueBgBox from "../blueBgBox";

async function getBlogData(): Promise<Blog[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/blogs?populate=deep`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json().then((res) => res.data);
}
export default async function HomeBlog() {
  const blogPosts = await getBlogData();
  return (
    <BlueBgBox
      bgImage="/smartphoneApp.webp"
      boxStyles={`h-[1000px] w-full before:!h-[650px] after:!h-[650px]`}
    >
      <div className="relative z-10 pt-16 text-center uppercase text-white">
        <h2 className="text-5xl font-medium">
          Conheça o nosso blog especializado <br />
          <span className="text-xl font-normal normal-case underline underline-offset-[16px]">
            E aprenda tudo sobre o universo das casas inteligentes
          </span>
        </h2>
        <h3 className="mt-16 text-4xl font-bold">últimas notícias</h3>
        <div className="mt-12 flex justify-evenly gap-6 px-6">
          {blogPosts.map((post) => {
            const { Capa, Titulo, Resumo } = post?.attributes;

            return (
              <div key={post?.id}>
                <div className="card max-w-[450px] bg-[#F8F8F8] shadow-lg">
                  <figure className="rounded-3xl px-6 pt-6">
                    <ApiImage image={Capa.data} />
                  </figure>
                  <div className="card-body normal-case text-[#4E4E4E]">
                    <h4 className="card-title font-bold">{Titulo}</h4>
                    <p className="mt-5 text-sm">{Resumo}</p>
                    <div className="card-actions mx-auto mt-5">
                      <a
                        href={`/blog/${universalSlugify(Titulo)}`}
                        className="btn btn-link"
                      >
                        Veja mais
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </BlueBgBox>
  );
}
