// import BeAReseller from "@/components/beAResellerFooter";
// import { Revenda } from "@/types/revenda";
// import dynamic from "next/dynamic";
// import { Suspense } from "react";

// const MapWithNoSSR = dynamic(() => import("@/components/network/map"), {
//   ssr: false,
//   loading: () => (
//     <section className="container relative z-[1] -mt-10 flex min-h-[1000px] max-w-screen-xl rounded-3xl bg-white px-9 py-16 md:mx-auto md:mb-16">
//       <span className="loading loading-spinner m-auto text-primary"></span>
//     </section>
//   ),
// });

// export default async function RedeCredenciada() {
//   const resellerData = await fetchDataFromApi<Revenda[]>(
//     "revendas",
//     "populate[marcas][fields][0]=Marca",
//   );
//   const brandsData = await fetchDataFromApi<Marca[]>(
//     "marcas",
//     "field[0]=Marca",
//   );
//   const brands = brandsData.map((brand) => brand.attributes.Marca).sort();

//   return (
//     <div>
//       <section>
//         <BlueBgBox
//           bgImage="/blueprint.webp"
//           boxStyles="w-screen h-[300px] after:!opacity-[36%]"
//         >
//           <header className="mx-auto mt-8 text-center text-white md:mt-20 md:w-[700px]">
//             <h1 className="mb-4 text-4xl font-bold text-white md:text-5xl">
//               Rede Credenciada
//             </h1>
//             <p className="text-lg font-light md:text-xl">
//               Encontre a revenda credenciada mais próxima de você e tenha um
//               projeto completamente personalizado para o seu ambiente.
//             </p>
//           </header>
//         </BlueBgBox>
//       </section>
//       <Suspense>
//         <MapWithNoSSR resellerData={resellerData} brands={brands} />
//       </Suspense>
//       <section>
//         <BeAReseller />
//       </section>
//     </div>
//   );
// }

import fetchDataFromApi from "@/helpers/fetchFromApi";
import { Marca } from "@/types/marca";
import { Metadata } from "next";
import NetworkForm from "@/components/network/networkForm";
import BlueBgBox from "@/components/blueBgBox";

export const metadata: Metadata = {
  title: "Rede credenciada",
};

export default async function RedeCredenciada() {
  const brandsData = await fetchDataFromApi<Marca[]>(
    "marcas",
    "field[0]=Marca",
  );
  const brands = brandsData
    .map((brand) => brand.attributes.Marca)
    .sort((a, b) => (a > b ? 1 : -1));

  return (
    <div>
      <section>
        <BlueBgBox
          bgImage="/blueprint.webp"
          boxStyles="w-screen h-[300px] after:!opacity-[36%]"
        >
          <></>
        </BlueBgBox>
      </section>
      <section className=" container relative z-[1] mx-auto -mt-52 max-w-screen-xl rounded-3xl bg-white px-9 pb-12 pt-12 md:-mt-20 md:py-36 md:pt-20">
        <header className="mx-auto md:w-[880px] text-center text-primary mb-16">
          <h1 className="mx-auto mb-4 text-4xl font-bold uppercase  md:text-7xl">
            Deixe o seu contato
          </h1>
          <p className="text-lg font-light uppercase md:text-3xl">
            E indicamos a{" "}
            <span className="font-bold">revenda <br className="block md:hidden"/> mais próxima de você</span>
          </p>
        </header>
        <NetworkForm brands={brands} />
      </section>
    </div>
  );
}
