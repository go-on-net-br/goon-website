import { BlocksContent } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import goOnSvg from "../../../public/go_on_logo.svg";
import arrowDown from "../../../public/arrow_down.svg";
import BlockRendererClient from "@/helpers/blockRendererClient";
import SocialNetworks from "../socialNetworks";
import BlueBgBox from "../blueBgBox";

export default function AboutBanner({
  inicial,
}: {
  readonly inicial: BlocksContent;
}) {
  return (
    <>
      <BlueBgBox
        bgImage="/building.webp"
        boxStyles="w-full h-[400px] md:h-[670px] after:!opacity-[20%] overflow-visible mb-6"
      >
        <div className="container flex h-auto w-screen max-w-full flex-col items-center justify-center p-4 pt-10 md:gap-24 md:pt-36">
          <Image
            src={goOnSvg}
            alt="GoOn logo"
            className="h-56 w-full object-contain p-6"
          />
          <div className="flex gap-4 px-2 pb-2 md:gap-9">
            <SocialNetworks iconStyle="h-8 w-8" />
          </div>
        </div>
        <div className="-mt-6 flex w-full justify-center">
          <div className="badge badge-lg absolute -bottom-4 border-0 bg-white px-10 py-6 text-sm font-bold uppercase text-goOnBlack shadow-lg md:text-base">
            <span>Nossa história começa aqui</span>
            <Image src={arrowDown} alt="flecha para baixo" className="w-4 h-4 ml-4"></Image>
          </div>
        </div>
      </BlueBgBox>

      {/* <section className="flex flex-col items-center bg-primary"></section> */}
    </>
  );
}
