"use client";

import Image from "next/image";
import goOnSvg from "../../public/go_on_logo.svg";
import Link from "next/link";
import universalSlugify from "@/helpers/universalSlugify";
import { usePathname } from "next/navigation";

export default function Topbar({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    "home",
    "marcas",
    "rede credenciada",
    "projetos",
    "produtos",
    "credenciamento",
    "termos e garantia",
    "sobre",
    "contato",
  ];

  const pathname = usePathname();

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="navbar h-24 w-full bg-primary px-4">
          <div className="mx-2 flex-1 px-2">
            <Link href="/">
              <Image
                src={goOnSvg}
                className="h-6 w-fit object-contain"
                alt="GoOn logo"
              />
            </Link>
          </div>
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  stroke="white"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="hidden flex-none lg:block">
            <ul className="menu menu-horizontal">
              {links.map((link) => {
                const slug = universalSlugify(link);
                const isActive =
                  (link === "home" && pathname === "/") ||
                  pathname.includes(slug);

                return (
                  <li key={"navbar_" + link}>
                    <Link
                      href={`/${slug === "home" ? "" : slug}`}
                      className={`${
                        isActive && "font-bold"
                      } uppercase !text-white`}
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
        {/* Page content here */}
        {children}
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu min-h-full w-80 bg-white p-0">
          <div className="min-wifull bg-primary p-4">
            <Link href="/">
              <Image
                src={goOnSvg}
                className="h-8 w-fit object-contain"
                alt="GoOn logo"
              />
            </Link>
          </div>
          <ul className="min-h-full w-80 bg-white p-4">
            {/* Sidebar content here */}
            {links.map((link) => {
              const slug = universalSlugify(link);
              const isActive =
                (link === "home" && pathname === "/") ||
                pathname.includes(slug);

              return (
                <li key={"sidebar_" + link}>
                  <Link
                    href={`/${slug === "home" ? "" : slug}`}
                    className={`${isActive && "font-bold"} uppercase text-primary`}
                    aria-current="page"
                    onClick={() => {
                      document.getElementById("my-drawer")?.click();
                    }}
                  >
                    {link}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
