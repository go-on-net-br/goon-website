"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductsItem from "./item";
import { CategoriasDeProduto } from "@/types/categorias-de-produto";
import { Marca } from "@/types/marca";
import Pagination from "./pagination";
import useFetchProduct from "@/helpers/useFetchProduct";

export default function ProductsList({
  allCategories,
  allBrands,
}: {
  readonly allCategories: CategoriasDeProduto[];
  readonly allBrands: Marca[];
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  const pages = data?.meta?.pagination?.pageCount ?? 0;

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
              {allBrands?.map((brand, i) => (
                <option
                  key={"ProductFilterBy" + brand.id}
                  value={brand.attributes.slug}
                >
                  {brand.attributes.Marca}
                </option>
              ))}
            </select>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="select select-primary w-10/12 max-w-sm bg-transparent text-primary md:w-48"
            >
              <option value={"todas"}>Todas categorias</option>
              {allCategories?.map((category, i) => (
                <option
                  key={"CategoryFilterBy" + category.id}
                  value={category.attributes.slug}
                >
                  {category.attributes.Titulo}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid max-w-screen-xl gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {isLoading ? (
          <span className="loading loading-bars loading-lg"></span>
        ) : (
          data?.data?.map((product) => (
            <ProductsItem product={product} key={"productItem " + product.id} />
          ))
        )}
      </div>
      <div data-theme="light" className="join my-8">
        <Pagination
          currPage={currPage}
          totalPages={pages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}
