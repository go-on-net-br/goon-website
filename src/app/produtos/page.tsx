import fetchDataFromApi from "@/helpers/fetchFromApi";
import ProductsList from "@/components/products/list";
import BeAReseller from "@/components/beAResellerFooter";
import { Metadata } from "next";
import BlueBgBox from "@/components/blueBgBox";
import { Suspense } from "react";
import { CategoriasDeProduto } from "@/types/categorias-de-produto";
import { Marca } from "@/types/marca";
import { Produto } from "@/types/produto";

export const metadata: Metadata = {
  title: "Produtos",
};

export default async function Page() {
  const productCategoriesFromApi = await fetchDataFromApi<
    CategoriasDeProduto[]
  >("categorias-de-produtos", "fields[0]=id&fields[1]=slug&fields[2]=Titulo");
  const brandsFromApi = await fetchDataFromApi<Marca[]>(
    "marcas",
    "fields[0]=id&fields[1]=slug&fields[2]=Marca",
  );
  const catAndBrands = await fetchDataFromApi<Produto[]>(
    "produtos",
    "populate[marca][fields][0]=Marca&populate[categoria][fields][0]=Titulo",
  );

  function createBrandAndCatDictionary(products: Produto[]) {
    const categoriesByBrandMap = new Map<string, Set<string>>();
    const brandsByCategoryMap = new Map<string, Set<string>>();

    products.forEach((product) => {
      const brand = product?.attributes?.marca?.data?.attributes?.Marca;
      const category = product?.attributes?.categoria?.data?.attributes?.Titulo;

      if (brand) {
        if (!categoriesByBrandMap.has(brand)) {
          categoriesByBrandMap.set(brand, new Set());
        }
        if (category) {
          categoriesByBrandMap.get(brand)?.add(category);
        }
      }

      if (category) {
        if (!brandsByCategoryMap.has(category)) {
          brandsByCategoryMap.set(category, new Set());
        }
        if (brand) {
          brandsByCategoryMap.get(category)?.add(brand);
        }
      }
    });

    return { brandsByCategoryMap, categoriesByBrandMap };
  }

  const brandsAndCatsMap = createBrandAndCatDictionary(catAndBrands);
  return (
    <>
      <section>
        <BlueBgBox
          bgImage="/products.webp"
          boxStyles="w-screen h-[250px] md:pb-0 md:h-[350px] after:!opacity-[25%]"
        >
          <div className="mx-auto mt-8 text-center text-white md:mt-20 md:w-[700px]">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">Produtos</h1>
            <p className="text-md font-light md:text-xl">
              Oferecemos uma seleção exclusiva de produtos premium, das marcas
              mais renomadas do mercado, para que você tenha um ambiente rico,
              seguro e completamente funcional.
            </p>
          </div>
        </BlueBgBox>
      </section>
      <section className="container relative z-[1] mx-auto max-w-screen-xl rounded-3xl bg-white pb-12 md:-mt-12 md:px-9 md:py-6">
        <Suspense>
          <ProductsList
            allCategories={productCategoriesFromApi}
            allBrands={brandsFromApi}
            brandsAndCatsMap={brandsAndCatsMap}
          />
        </Suspense>
      </section>
      <section>
        <BeAReseller />
      </section>
    </>
  );
}
