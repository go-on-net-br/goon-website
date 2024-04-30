import Badge from "@/components/badge";
import Carousel from "@/components/carousel";
import HomeCards from "@/components/homeCards";
import { Home } from "@/types/home";

async function getHomeData(): Promise<Home> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home?populate=deep`,
    {
      headers: {
        Authorization: `${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
      },
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json().then((res) => res.data);
}

export default async function HomePage() {
  const data = await getHomeData();
  const { Carrossel } = data?.attributes ?? {};

  return (
    <>
      <section>
        <Carousel carousel={Carrossel} />
      </section>
      <section className="mt-16">
        <h1 className="text-primary text-3xl mx-auto block w-fit">
          Soluções para <u className="font-bold">todos os projetos</u>
        </h1>
        <Badge />
        <p className="text-primary font-light mx-auto block w-fit mt-16 ">
          E muito mais...
        </p>
      </section>
      <section className="mt-16">
        <HomeCards />
      </section>
    </>
  );
}
