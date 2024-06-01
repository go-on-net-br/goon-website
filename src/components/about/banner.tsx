import { BlocksContent } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import goOnSvg from "../../../public/go_on_logo.svg";
import BlockRendererClient from "@/helpers/blockRendererClient";
import SocialNetworks from "../socialNetworks";

export default function AboutBanner({
  inicial,
}: {
  readonly inicial: BlocksContent;
}) {
  return (
    <>
      <section className="flex flex-col items-center bg-primary">
        <div className="container flex h-auto w-full flex-col items-center justify-center gap-24 bg-primary p-4 pt-10 md:pt-36">
          <Image src={goOnSvg} alt="GoOn logo" className="object-contain p-6" />
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex gap-9 border-b border-white px-2 pb-2">
              <SocialNetworks iconStyle="h-8 w-8" />
            </div>
            <div className="mb-8 text-justify text-white md:w-3/4 md:text-start">
              <BlockRendererClient content={inicial} />
            </div>
          </div>
        </div>
      </section>
      <div className="-mt-6 flex w-full justify-center">
        <div className="text-md badge badge-lg border-0 bg-white px-10 py-6 font-bold uppercase text-primary shadow-lg">
          Nossa história começa aqui
        </div>
      </div>
    </>
  );
}
