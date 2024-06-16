import { Produto } from "@/types/produto";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import ProductsList from "@/components/products/list";
import BeAReseller from "@/components/beAResellerFooter";
import { Metadata } from "next";
import BlueBgBox from "@/components/blueBgBox";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Produtos",
};

export default async function Page() {
  const productsFromApi = await fetchDataFromApi<Produto[]>("produtos");
  return (
    <>
      <section>
        <BlueBgBox
          bgImage="/blueprint.webp"
          boxStyles="w-screen h-[260px] md:h-[300px] after:!opacity-[36%]"
        >
          <div className="mx-auto mt-8 text-center text-white md:mt-20 md:w-[700px]">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Produtos</h1>
            <p className="text-lg font-light md:text-xl">
              Oferecemos uma gama completa de produtos, das melhores marcas que
              irão elevar a experiência do seu projeto
            </p>
          </div>
        </BlueBgBox>
      </section>
      <section className=" -mt-4 flex flex-col items-center">
        <Suspense>
          <ProductsList productsFromApi={productsFromApi} />
        </Suspense>
      </section>
      <section>
        <BeAReseller />
      </section>
    </>
  );
}
