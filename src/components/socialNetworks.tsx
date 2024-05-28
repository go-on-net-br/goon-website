import SocialIconMap from "@/components/socialNetworks/socialIconMap";
import { Rede } from "@/types/common";
import Image from "next/image";

export default function SocialNetworks({ iconStyle }: { iconStyle: string }) {
  const externalLinks: Record<Exclude<Rede, "Tiktok">, string> = {
    Instagram: "https://www.instagram.com/goonbrasil_/",
    LinkedIn: "https://www.linkedin.com/company/goonbrasil/",
    YouTube: "https://www.youtube.com/channel/UCt-5PLtA0-4VWYrDajETigQ",
    Facebook: "https://www.facebook.com/goonautomacao",
  };

  return (
    <>
      {Object.entries(externalLinks)?.map(([name, url]) => {
        return (
          <a key={name} href={url} target="_blank">
            <SocialIconMap
              iconStyle={iconStyle + " fill-white object-contain"}
              networkTitle={name as Rede}
            />
          </a>
        );
      })}
    </>
  );
}
