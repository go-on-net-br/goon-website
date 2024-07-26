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
      <div className="box-border flex h-full w-full flex-col justify-center pl-9 text-white md:mx-auto md:container">
        <Image
          src={separator}
          alt="separador"
          aria-label="separador"
          className="mb-6"
        />
        <h2 className="text-2xl font-bold md:text-6xl">
          Seja uma<br/> Revenda Credenciada
        </h2>
        <p className="mb-6 mt-4 text-lg md:text-2xl">
          E trabalhe com as melhores marcas do mercado mundial
        </p>
        <Link href="/credenciamento">
          <button className="btn btn-secondary btn-sm w-fit text-primary">
            Quero me tornar revendedor
          </button>
        </Link>
      </div>
    </GradientFooter>
  );
}
