import Image from "next/image";
import image from "../../../public/produtos.png";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import { Produto } from "@/types/produto";
import ProductsFilter from "@/components/products/filter";

export default async function Page() {
  const products = await fetchDataFromApi<Produto[]>("produtos");

  const brands = Array.from(
    new Set(products.map((p) => p?.attributes?.marca?.data?.attributes?.Marca)),
  );

  const categories = Array.from(
    new Set(
      products.map((p) => p.attributes?.categoria?.data?.attributes?.Titulo),
    ),
  );

  return (
    <>
      <section className="absolute z-[-1] max-h-72 bg-primary">
        <Image
          className="max-h-72 min-h-56 object-cover opacity-25"
          alt="mãos apontando para uma folha de projeto"
          src={image}
        />
      </section>
      <section className="flex flex-col items-center px-4 py-16">
        <h1 className="text-5xl font-bold text-white">Produtos</h1>
        <p className=" max-w-lg text-center text-white">
          Oferecemos uma gama completa de produtos, das melhores marcas que irão
          elevar a experiência do seu projeto
        </p>
      </section>
      <section className=" -mt-4 flex flex-col items-center">
        <div className="container flex flex-col items-center rounded-3xl bg-[#F5F5F5]">
          <ProductsFilter brands={brands} categories={categories} />
        </div>
      </section>
    </>
  );
}
