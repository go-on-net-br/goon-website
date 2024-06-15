import Image from "next/image";
import goOnSvg from "../../public/go_on_logo.svg";
import Link from "next/link";
import SocialNetworks from "./socialNetworks";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-primary p-12 text-primary-content">
      <div className="flex flex-col md:flex-row">
        <aside>
          <Link href="/">
            <Image
              src={goOnSvg}
              className="mt-2 h-16 w-fit object-contain"
              alt="GoOn logo"
            />
          </Link>
        </aside>
        <div className="mx-4 my-4 h-0.5 w-full rounded-full bg-white md:h-20 md:w-1" />
        <nav>
          <p className="mb-3 text-left font-bold text-white">
            Nos encontre aqui
          </p>
          <div className="grid grid-flow-col gap-6">
            <SocialNetworks iconStyle="h-10 w-10" />
          </div>
        </nav>
      </div>
      <p className="tracking-wider text-white">
        (11) 3567-7777 | contato@goon.com.br
      </p>
    </footer>
  );
}
