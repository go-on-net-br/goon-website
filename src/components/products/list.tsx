"use client";
import { Produto } from "@/types/produto";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ProductsItem from "./item";
import universalSlugify from "@/helpers/universalSlugify";

export default function ProductsList({
  productsFromApi,
}: {
  productsFromApi: Produto[];
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [page, setPage] = useState(parseInt(searchParams.get("pagina") ?? "1"));
  const [brand, setBrand] = useState(searchParams.get("marca") ?? "todas");
  const [category, setCategory] = useState(
    searchParams.get("categoria") ?? "todas",
  );

  const [filteredProducts, setFilteredProducts] = useState(
    filterProducts(productsFromApi, category, brand),
  );

  const allCategories = getProductCategories(productsFromApi);
  const allBrands = getProductBrands(productsFromApi);

  const [totalPages, setpagesArray] = useState(
    Math.ceil(filteredProducts.length / 9),
  );

  const [shownProductList, setShownProductList] = useState(
    filteredProducts.slice(page * 9 - 9, page * 9),
  );

  useEffect(() => {
    setShownProductList(filteredProducts.slice(page * 9 - 9, page * 9));
    setpagesArray(filteredProducts.length / 9);
  }, [filteredProducts, page]);

  const pages = [];
  for (let i = 1; i < totalPages + 1; i++) {
    pages.push(
      <button
        key={"productPage" + i}
        className={
          "btn border-0 " +
          (totalPages > 1 ? "join-item " : "") +
          (page === i ? "btn-primary" : "")
        }
        onClick={() => {
          setPage(i);
        }}
      >
        {i}
      </button>,
    );
  }

  useEffect(() => {
    setFilteredProducts(filterProducts(productsFromApi, category, brand));
    let qp = "";
    if (page === 1 && brand === "todas" && category === "todas") {
      router.push("/produtos", { scroll: false });
    } else {
      qp = "?";
      if (page != 1) {
        qp += "pagina=" + page.toString();
      }
      if (brand != "todas") {
        qp = qp.length > 1 ? qp + "&" : qp;
        qp += "marca=" + brand;
      }
      if (category != "todas") {
        qp = qp.length > 1 ? qp + "&" : qp;
        qp += "categoria=" + category;
      }
      router.push(qp, { scroll: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand, category, page]);

  return (
    <>
      <div className="container flex flex-col items-center rounded-3xl bg-[#F5F5F5]">
        <div className="flex flex-col items-center gap-4 py-8">
          <p className="text-primary">Filtrar por:</p>
          <div className="flex justify-center gap-2">
            <select
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              className="select select-primary w-48 max-w-sm bg-transparent text-primary"
            >
              <option value={"todas"}>Todas marcas</option>
              {allBrands?.map((brand, i) => (
                <option
                  key={"ProductFilterBy" + brand}
                  value={universalSlugify(brand)}
                >
                  {brand}
                </option>
              ))}
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-primary w-48 max-w-sm bg-transparent text-primary"
            >
              <option value={"todas"}>Todas categorias</option>
              {allCategories?.map((category, i) => (
                <option
                  key={"CategoryFilterBy" + category}
                  value={universalSlugify(category)}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="container mx-auto grid max-w-screen-xl gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        {shownProductList?.map((product) => (
          <ProductsItem product={product} key={"productItem " + product.id} />
        ))}
      </div>
      <div data-theme="light" className="join my-8">
        {pages}
      </div>
    </>
  );
}

function getProductCategories(
  productsFromApi: Produto[],
): (string | undefined)[] {
  return Array.from(
    new Set(
      productsFromApi.map(
        (p) => p.attributes?.categoria?.data?.attributes?.Titulo,
      ),
    ),
  );
}

function getProductBrands(productsFromApi: Produto[]): (string | undefined)[] {
  return Array.from(
    new Set(
      productsFromApi.map((p) => p?.attributes?.marca?.data?.attributes?.Marca),
    ),
  );
}

function filterProducts(
  productsFromApi: Produto[],
  category = "todas",
  brand = "todas",
): Produto[] {
  return productsFromApi.filter(
    (product) =>
      // All brands and categories
      (brand === "todas" && category === "todas") ||
      // All brands, filtered category
      (brand === "todas" &&
        category ===
          universalSlugify(
            product.attributes.categoria?.data.attributes.Titulo,
          )) ||
      // All categories, filtered brand
      (category === "todas" &&
        brand ===
          universalSlugify(product.attributes.marca?.data.attributes.Marca)) ||
      // Filtered brand and category
      (brand ===
        universalSlugify(product.attributes.marca?.data.attributes.Marca) &&
        category ===
          universalSlugify(
            product.attributes.categoria?.data.attributes.Titulo,
          )),
  );
}
