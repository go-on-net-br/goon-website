import { BlocksContent } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import goOnSvg from "../../../public/go_on_logo.svg";
import instagramIcon from "../../../public/instagram.svg";
import linkedInIcon from "../../../public/linkedin.svg";
import youtubeIcon from "../../../public/youtube.svg";
import facebookIcon from "../../../public/facebook.svg";
import BlockRendererClient from "@/helpers/blockRendererClient";

export default function AboutBanner({
  inicial,
}: {
  readonly inicial: BlocksContent;
}) {
  const externalLinks = [
    {
      text: "instagram",
      src: instagramIcon,
      url: "https://www.instagram.com/goonbrasil_/",
    },
    {
      text: "linkedin",
      src: linkedInIcon,
      url: "https://www.linkedin.com/company/goonbrasil/",
    },
    {
      text: "youtube",
      src: youtubeIcon,
      url: "https://www.youtube.com/channel/UCt-5PLtA0-4VWYrDajETigQ",
    },
    {
      text: "facebook",
      src: facebookIcon,
      url: "https://www.facebook.com/goonautomacao",
    },
  ];

  return (
    <>
      <section className="flex flex-col items-center bg-primary">
        <div className="container flex h-auto w-full flex-col items-center justify-center gap-24 bg-primary p-6 pt-36">
          <Image src={goOnSvg} alt="GoOn logo" className="object-contain" />
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex gap-9 border-b border-white px-2 pb-2">
              {externalLinks?.map((icon) => (
                <a
                  key={"externalLink" + icon?.text}
                  href={icon?.url}
                  target="_blank"
                >
                  <Image
                    src={icon?.src}
                    className="h-8 w-8 object-contain"
                    alt={icon?.text}
                  />
                </a>
              ))}
            </div>
            <div className="mb-8 w-3/4 text-white">
              <BlockRendererClient content={inicial} />
            </div>
          </div>
        </div>
      </section>
      <div className="mt-[-24px] flex w-full justify-center">
        <div className="text-md badge badge-lg border-0 bg-white px-10 py-6 font-bold uppercase text-primary shadow-lg">
          Nossa história começa aqui
        </div>
      </div>
    </>
  );
}
