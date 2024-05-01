import Badge from "@/components/badge";
import Carousel from "@/components/carousel";
import HomeCards from "@/components/homeCards";
import { Home } from "@/types/home";
import Image from "next/image";
import separator from "../../public/separator.svg";
import HomeBlog from "@/components/homeBlog";

async function getHomeData(): Promise<Home> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/home?populate=deep`,
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

export default async function HomePage() {
  const data = await getHomeData();
  const { Carrossel } = data?.attributes ?? {};

  return (
    <>
      <section>
        <Carousel carousel={Carrossel} />
      </section>
      <section className="mt-16">
        <h2 className="mx-auto block w-fit text-3xl text-primary">
          Soluções para <u className="font-bold">todos os projetos</u>
        </h2>
        <Badge />
        <p className="mx-auto mt-16 block w-fit font-light text-primary ">
          E muito mais...
        </p>
      </section>
      <section className="mt-16">
        <HomeCards />
      </section>
      <Image
        src={separator}
        alt="separador"
        aria-label="separador"
        className="mx-auto my-28"
      />
      <section className="mb-16">
        <HomeBlog />
      </section>
    </>
  );
}
