import { Rede } from "@/types/common";
import InstagramIcon from "./instagram";
import LinkedInIcon from "./linkedin";
import YouTubeIcon from "./youtube";
import FacebookIcon from "./facebook";
import TiktokIcon from "./tiktok";

export default function SocialIconMap({
  networkTitle,
  iconStyle
}: {
  networkTitle: Rede;
  iconStyle: string
}) {
  const externalLinks: Record<Rede, any> = {
    Instagram: <InstagramIcon className={iconStyle} />,
    LinkedIn: <LinkedInIcon className={iconStyle} />,
    YouTube: <YouTubeIcon className={iconStyle} />,
    Facebook: <FacebookIcon className={iconStyle} />,
    Tiktok: <TiktokIcon className={iconStyle} />,
  };

  return externalLinks[networkTitle];
}
