"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductsItem from "./item";
import { CategoriasDeProduto } from "@/types/categorias-de-produto";
import { Marca } from "@/types/marca";
import Pagination from "./pagination";
import useFetchProduct from "@/hooks/useFetchProduct";

export default function ProductsList({
  allCategories,
  allBrands,
  brandsAndCatsMap,
}: {
  allCategories: CategoriasDeProduto[];
  allBrands: Marca[];
  brandsAndCatsMap: {
    brandsByCategoryMap: Map<string, Set<string>>;
    categoriesByBrandMap: Map<string, Set<string>>;
  };
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [currPage, setCurrPage] = useState(
    parseInt(searchParams.get("pagina") ?? "1"),
  );
  const [brand, setBrand] = useState(searchParams.get("marca") ?? "todas");
  const [category, setCategory] = useState(
    searchParams.get("categoria") ?? "todas",
  );

  const params = new URLSearchParams(searchParams);
  const updateUrl = useCallback(() => {
    brand !== "todas" ? params.set("marca", brand) : params.delete("marca");
    category !== "todas"
      ? params.set("categoria", category)
      : params.delete("categoria");
    currPage > 1
      ? params.set("pagina", currPage.toString())
      : params.delete("pagina");

    router.push(`/produtos?${params.toString()}`, { scroll: true });
  }, [brand, category, currPage]);

  useEffect(() => {
    updateUrl();
  }, [brand, category, currPage, updateUrl]);

  const handlePageChange = (num: number) => {
    setCurrPage(num);
  };

  const handleBrandChange = (newBrand: string) => {
    setBrand(newBrand);
    setCurrPage(1);
    // Reset category to "todas" when brand changes
    setCategory("todas");
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setCurrPage(1);
  };

  const qp = [];
  if (brand && brand !== "todas") {
    qp.push("filters[marca][Marca][$eq]=" + brand);
  }
  if (category && category !== "todas") {
    qp.push("filters[categoria][Titulo]=" + category);
  }
  qp.push("pagination[pageSize]=24&pagination[page]=" + (currPage || 1));

  const { data, isLoading, error } = useFetchProduct(qp);
  const { data: products, meta } = data ?? {};
  const pages = meta?.pagination?.pageCount ?? 0;

  const { brandsByCategoryMap, categoriesByBrandMap } = brandsAndCatsMap;

  // Filter available categories based on selected brand
  const availableCategories =
    brand === "todas"
      ? allCategories
      : Array.from(categoriesByBrandMap.get(brand) || [])
          .map((categoryName) =>
            allCategories.find(
              (category) => category.attributes.Titulo === categoryName,
            ),
          )
          .filter(Boolean);

  return (
    <>
      <div className="container flex flex-col items-center rounded-3xl bg-white">
        <div className="flex w-full flex-col items-center gap-4 py-8">
          <p className="text-primary">Filtrar por:</p>
          <div className="flex w-full flex-col items-center justify-center gap-2 md:w-auto md:flex-row">
            <select
              onChange={(e) => handleBrandChange(e.target.value)}
              value={brand}
              className="select select-primary w-10/12 max-w-sm bg-transparent text-primary md:w-48"
            >
              <option value={"todas"}>Todas marcas</option>
              {allBrands
                .sort((a, b) =>
                  a.attributes.Marca > b.attributes.Marca ? 1 : -1,
                )
                ?.map((brand) => (
                  <option
                    key={"ProductFilterBy" + brand?.id}
                    value={brand?.attributes.Marca}
                  >
                    {brand?.attributes.Marca}
                  </option>
                ))}
            </select>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="select select-primary w-10/12 max-w-sm bg-transparent text-primary md:w-48"
            >
              <option value={"todas"}>Todas categorias</option>
              {availableCategories?.map((category) => (
                <option
                  key={"CategoryFilterBy" + category?.id}
                  value={category?.attributes.Titulo}
                >
                  {category?.attributes.Titulo}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      {isLoading ? (
        <div className="mb-24 flex h-64 w-full items-center justify-center px-4">
          <span className="loading loading-bars loading-lg px-4 text-center text-primary"></span>
        </div>
      ) : error ? (
        <div className="mb-24 flex h-64 w-full items-center justify-center px-4">
          <p className="text-center text-lg font-semibold">
            Ocorreu algum erro. Tente de novo em alguns instantes.
          </p>
        </div>
      ) : (products?.length ?? 0) < 1 ? (
        <div className="mb-24 flex h-64 w-full items-center justify-center px-4">
          <p className="text-lg font-semibold">
            Não encontramos nenhum produto com esses filtros.
          </p>
        </div>
      ) : (
        <>
          <div className="container mx-auto grid max-w-screen-xl gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {products?.map((product) => (
              <ProductsItem
                product={product}
                key={"productItem " + product.id}
              />
            ))}
          </div>
          <div data-theme="light" className="join my-8">
            <Pagination
              currPage={currPage}
              totalPages={pages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
}
