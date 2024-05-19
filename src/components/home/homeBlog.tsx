import { Blog } from "@/types/blog";
import ApiImage from "../ApiImage";
import universalSlugify from "@/helpers/universalSlugify";

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
    <div
      className={`relative h-[1000px] w-full before:absolute before:top-0 before:z-[0]  before:h-[650px] before:w-full before:bg-[#003ef9] before:content-[''] after:absolute after:top-0 after:z-[1] after:block after:h-[650px] after:w-full after:bg-[url('/blogSection.webp')] after:bg-cover after:bg-center after:bg-no-repeat after:opacity-[14%] after:content-['']`}
    >
      <div className="relative z-10 pt-16 text-center uppercase text-white">
        <h2 className="text-5xl font-medium">
          Conheça o nosso blog especializado <br />
          <span className="text-xl font-normal underline underline-offset-[16px] normal-case">
            E aprenda tudo sobre o universo das casas inteligentes
          </span>
        </h2>
        <h3 className="mt-16 text-4xl font-bold">últimas notícias</h3>
        <div className="flex justify-evenly mt-12 gap-6 px-6">
          {blogPosts.map((post) => {
            const {
              Capa,
              Titulo,
              Resumo,
            } = post?.attributes;

            return (
              <div key={post?.id}>
                <div className="card max-w-[450px] shadow-lg bg-[#F8F8F8]">
                  <figure className="px-6 pt-6 rounded-3xl">
                    <ApiImage image={Capa.data} />
                  </figure>
                  <div className="card-body text-[#4E4E4E] normal-case">
                    <h4 className="card-title font-bold">{Titulo}</h4>
                    <p className="text-sm mt-5">{Resumo}</p>
                    <div className="card-actions mt-5 mx-auto">
                      <a href={`/blog/${universalSlugify(Titulo)}`} className="btn btn-link">Veja mais</a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
