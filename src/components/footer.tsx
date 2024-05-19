import Image from "next/image";
import goOnSvg from "../../public/go_on_logo.svg";
import Link from "next/link";
import SocialNetworks from "./socialNetworks";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-primary p-12 text-primary-content">
      <div className="flex">
        <aside>
          <Link href="/">
            <Image
              src={goOnSvg}
              className="mt-2 h-16 w-fit object-contain"
              alt="GoOn logo"
            />
          </Link>
        </aside>
        <div className="mx-4 h-20 w-1 rounded-full bg-white" />
        <nav>
          <p className="mb-3 text-left font-bold text-white">
            Nos encontre aqui
          </p>
          <div className="grid grid-flow-col gap-6">
            <SocialNetworks iconStyle="h-10 w-10" />
          </div>
        </nav>
      </div>
      <p className="text-white tracking-wider">
        Rua Ferreira de Araújo, 741, Conj 108 - Pinheiros, São Paulo - SP,
        <br />
        05428-002 (11) 3567-7777 | contato@goon.com.br
      </p>
    </footer>
  );
}
