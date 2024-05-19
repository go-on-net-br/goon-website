import instagramIcon from "../../public/instagram.svg";
import linkedInIcon from "../../public/linkedin.svg";
import youtubeIcon from "../../public/youtube.svg";
import facebookIcon from "../../public/facebook.svg";
import Image from "next/image";

export default function SocialNetworks({ iconStyle }: { iconStyle: string }) {
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
      {externalLinks?.map((icon) => (
        <a key={"externalLink" + icon?.text} href={icon?.url} target="_blank">
          <Image
            src={icon?.src}
            className={iconStyle + " object-contain"}
            alt={"ícone da rede social " + icon?.text}
          />
        </a>
      ))}
    </>
  );
}
