import separator from "../../public/separator_white.svg";
import Image from "next/image";
import GradientFooter from "./gradientFooter";
import Link from "next/link";

export default function BeAReseller() {
  return (
    <GradientFooter
      bgImage="/realtor-with-clients.webp"
      boxStyles="text-3xl py-4 md:py-0"
    >
      <div className="box-border flex h-full w-full flex-col pl-9 text-white md:container md:mx-auto md:justify-center">
        <Image
          src={separator}
          alt="separador"
          aria-label="separador"
          className="mb-6 w-12 md:w-20"
        />
        <h2 className="text-3xl font-bold md:text-6xl">
          Seja uma
          <br /> Revenda Credenciada
        </h2>
        <p className="mb-2 mt-2 text-xs md:mb-6 md:mt-4 md:text-2xl">
          E trabalhe com as melhores marcas do{" "}
          <span className="font-bold">Mercado Mundial</span>
        </p>
        <Link href="/credenciamento">
          <button className="btn btn-secondary btn-sm w-fit text-goOnBlue">
            Quero me tornar revendedor
          </button>
        </Link>
      </div>
    </GradientFooter>
  );
}
