"use client";
import { useState } from "react";

export default function ProductsFilter({
  brands,
  categories,
}: {
  readonly brands: (string | undefined)[];
  readonly categories: (string | undefined)[];
}) {
  const [brand, setBrand] = useState("Todas marcas");
  const [category, setCategory] = useState("Todas categorias");
  return (
    <>
      <div className="flex flex-col items-center gap-4 py-8">
        <p className="text-primary">Filtrar por:</p>
        <div className="flex justify-center gap-2">
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="select select-primary w-48 max-w-sm bg-transparent text-primary"
          >
            <option>Todas marcas</option>
            {brands?.map((brand, i) => (
              <option key={"ProductFilterBy" + brand}>{brand}</option>
            ))}
          </select>
          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="select select-primary w-48 max-w-sm bg-transparent text-primary"
          >
            <option>Todas categorias</option>
            <option>Todas</option>
            {categories?.map((category, i) => (
              <option key={"CategoryFilterBy" + category}>{category}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
