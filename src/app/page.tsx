import Carousel from "@/components/carousel";
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
      <Carousel carousel={Carrossel} />
  );
}
