"use client";

import Image from "next/image";
import goOnSvg from "../../public/go_on_logo.svg";
import Link from "next/link";
import universalSlugify from "@/helpers/universalSlugify";
import { usePathname } from "next/navigation";

export default function Topbar() {
  const links = [
    "home",
    "marcas",
    "rede credenciada",
    "projetos",
    "produtos",
    "credenciamento",
    "sobre",
    "contato",
  ];

  const pathname = usePathname();

  return (
    <nav className="border-gray-200 bg-primary">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link href="/">
          <Image
            src={goOnSvg}
            className="h-8 object-contain w-fit"
            alt="GoOn logo"
          />
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="flex gap-5">
            {links.map((link) => {
              const slug = universalSlugify(link);
              const isActive =
                (link === "home" && pathname === "/") ||
                pathname.includes(slug);

              return (
                <li key={link}>
                  <Link
                    href={`/${slug}`}
                    className={`${
                      isActive && "font-bold"
                    } uppercase text-white`}
                    aria-current="page"
                  >
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
