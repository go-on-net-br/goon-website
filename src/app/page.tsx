import Badge from "@/components/badge";
import Carousel from "@/components/carousel";
import HomeCards from "@/components/homeCards";
import { Home } from "@/types/home";
import Image from "next/image";
import separator from "../../public/separator.svg";
import HomeBlog from "@/components/homeBlog";
import fetchDataFromApi from "@/helpers/fetchFromApi";

export default async function HomePage() {
  const data = await fetchDataFromApi<Home>("home");
  const { Carrossel } = data?.attributes ?? {};

  return (
    <div className="container mx-auto max-w-screen-xl">
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
    </div>
  );
}
