import { fetchDataFromApiWithParams } from "@/helpers/fetchFromApi";
import ProductsList from "@/components/products/list";
import BeAReseller from "@/components/beAResellerFooter";
import { Metadata } from "next";
import BlueBgBox from "@/components/blueBgBox";
import { Suspense } from "react";
import { CategoriasDeProduto } from "@/types/categorias-de-produto";
import { Marca } from "@/types/marca";

export const metadata: Metadata = {
  title: "Produtos",
};

export default async function Page() {
  const productCategoriesFromApi = await fetchDataFromApiWithParams<
    CategoriasDeProduto[]
  >("categorias-de-produtos");
  const brandsFromApi = await fetchDataFromApiWithParams<Marca[]>("marcas");

  return (
    <>
      <section>
        <BlueBgBox
          bgImage="/products.webp"
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
      <section className=" -mt-4 flex flex-col items-center bg-white">
        <Suspense>
          <ProductsList
            allCategories={productCategoriesFromApi}
            allBrands={brandsFromApi}
          />
        </Suspense>
      </section>
      <section>
        <BeAReseller />
      </section>
    </>
  );
}
