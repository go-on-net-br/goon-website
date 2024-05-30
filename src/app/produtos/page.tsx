import Image from "next/image";
import image from "../../../public/produtos.png";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import { Produto } from "@/types/produto";
import ProductsList from "@/components/products/list";
import GradientFooter from "@/components/gradientFooter";
import separator from "../../../public/separator_white.svg";
import Link from "next/link";

export default async function Page() {
  const productsFromApi = await fetchDataFromApi<Produto[]>("produtos");
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
        <p className=" max-w-xl text-center text-white">
          Oferecemos uma gama completa de produtos, das melhores marcas que irão
          elevar a experiência do seu projeto
        </p>
      </section>
      <section className=" -mt-4 flex flex-col items-center">
        <ProductsList productsFromApi={productsFromApi} />
      </section>
      <section>
        <GradientFooter
          bgImage="/realtor-with-clients.webp"
          boxStyles="text-3xl"
        >
          <div className="box-border flex h-full w-[820px] flex-col justify-center pl-9 text-white">
            <Image
              src={separator}
              alt="separador"
              aria-label="separador"
              className="mb-6"
            />
            <h2 className="text-6xl font-bold">Seja uma Revenda Credenciada</h2>
            <p className="mb-6 mt-4 text-2xl">
              E trabalhe com as melhores marcas do mercado mundial
            </p>
            <Link href="/credenciamento">
              <button className="btn btn-secondary btn-sm w-fit text-primary">
                Quero me tornar revendedor
              </button>
            </Link>
          </div>
        </GradientFooter>
      </section>
    </>
  );
}
