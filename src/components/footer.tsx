import Image from "next/image";
import goOnSvg from "../../public/go_on_logo.svg";
import Link from "next/link";
import SocialNetworks from "./socialNetworks";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-primary p-8 text-primary-content md:p-12">
      <div className="flex md:flex-row">
        <aside className="w-[49%] md:w-auto">
          <Link href="/">
            <Image
              src={goOnSvg}
              className="h-16 w-fit object-contain md:mt-2"
              alt="GoOn logo"
            />
          </Link>
        </aside>
        <div className="mx-2 my-auto h-12 w-1 rounded-full bg-white md:mx-4 md:my-4 md:h-20" />
        <nav className="w-[49%] md:w-auto">
          <p className="mb-3 text-left font-bold text-white">
            Nos encontre aqui
          </p>
          <div className="grid grid-flow-col gap-2 md:gap-6">
            <SocialNetworks iconStyle="h-5 w-5" />
          </div>
        </nav>
      </div>
      <div className="flex max-w-96 w-full justify-evenly tracking-wider text-white">
        <p>+55 (11) 4328-8808</p>
        <span> | </span>
        <span>contato@goon.net.br</span>
      </div>
    </footer>
  );
}
