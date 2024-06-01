import BlueBgBox from "@/components/blueBgBox";
import TermsTabs from "@/components/terms/tabs";
import fetchDataFromApi from "@/helpers/fetchFromApi";
import { TermoEAviso } from "@/types/termo-e-aviso";

export default async function Page() {
  const apiData = await fetchDataFromApi<TermoEAviso>("termo-e-aviso");
  return (
    <>
      <section>
        <BlueBgBox
          bgImage="/containers.webp"
          boxStyles="w-screen pb-24 after:!opacity-[10%]"
        >
          <div className="mx-auto mt-8 text-center text-white md:mt-20 md:w-[700px]">
            <h1 className="mb-4 text-4xl font-bold md:text-6xl">
              Termos & Garantia
            </h1>
            <p className="p-4 font-light md:p-0 md:text-lg">
              Aqui reunimos projetos incríveis de nossas empresas parceiras para
              que você conheça mais a fundo o que a sua casa inteligente pode
              fazer por você
            </p>
          </div>
        </BlueBgBox>
      </section>
      <section className="container relative z-[1] mx-auto -mt-10 max-w-screen-xl rounded-3xl bg-white px-9 py-8">
        <TermsTabs apiData={apiData} />
      </section>
    </>
  );
}
