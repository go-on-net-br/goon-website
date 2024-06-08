import { Produto } from "@/types/produto";
import Image from "next/image";
import blueprintImage from "../../../public/blueprint.webp";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import ProductsList from "@/components/products/list";
import BeAReseller from "@/components/beAResellerFooter";

export default async function Page() {
  const productsFromApi = await fetchDataFromApi<Produto[]>("produtos");
  return (
    <>
      <section className="absolute z-[-1] max-h-72 bg-primary">
        <Image
          className="max-h-72 min-h-56 object-cover opacity-25"
          alt="mãos apontando para uma folha de projeto"
          src={blueprintImage}
        />
      </section>
      <section className="flex flex-col items-center px-4 py-16">
        <h1 className=" text-4xl font-bold text-white md:text-5xl">Produtos</h1>
        <p className=" max-w-xl text-center text-white">
          Oferecemos uma gama completa de produtos, das melhores marcas que irão
          elevar a experiência do seu projeto
        </p>
      </section>
      <section className=" -mt-4 flex flex-col items-center">
        <ProductsList productsFromApi={productsFromApi} />
      </section>
      <section>
        <BeAReseller />
      </section>
    </>
  );
}
