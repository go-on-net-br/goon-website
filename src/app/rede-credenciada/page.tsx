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
    <section className="flex flex-col-reverse md:flex-row">
      <BlueBgBox
        bgImage="/blueprint.webp"
        boxStyles="w-full h-[350px] md:h-auto md:w-1/2 after:!opacity-[36%]"
      >
        <></>
      </BlueBgBox>
      <div className="bg-white py-8 md:w-1/2 md:py-32">
        <div className="text-center text-goOnBlack md:mx-12 md:mb-16 md:text-start">
          <h1 className="mx-auto mb-4 text-3xl font-bold  md:text-4xl">
            Rede Credenciada
          </h1>
          <p className="text-md font-light md:text-xl">
            Queremos te ajudar! Preencha o formulário e nossa equipe encontrará
            a revenda credenciada mais próxima de você.
          </p>
        </div>
        <div className="mx-4 my-8 h-[1px] w-auto bg-goOnBlue md:mx-12"></div>
        <NetworkForm brands={brands} />
      </div>
    </section>
  );
}
