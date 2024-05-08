import { BlocksContent } from "@strapi/blocks-react-renderer"
import Image from "next/image";
import goOnSvg from "../../../../public/go_on_logo.svg";
import instagramIcon from "../../../../public/instagram.svg"
import linkedInIcon from "../../../../public/linkedin.svg"
import youtubeIcon from "../../../../public/youtube.svg"
import facebookIcon from "../../../../public/facebook.svg"
import BlockRendererClient from "@/helpers/blockRendererClient";

export default function AboutBanner({
    inicial,
}: {
    readonly inicial: BlocksContent
}) {
    const externalLinks = [
        { src: instagramIcon, url: 'https://www.instagram.com/goonbrasil_/' },
        { src: linkedInIcon, url: 'https://www.linkedin.com/company/goonbrasil/' },
        { src: youtubeIcon, url: 'https://www.youtube.com/channel/UCt-5PLtA0-4VWYrDajETigQ' },
        { src: facebookIcon, url: 'https://www.facebook.com/goonautomacao' },
    ];

    return (<section>
        <div className="w-full pt-36 p-6 h-auto flex flex-col gap-24 justify-center items-center bg-primary">
            <Image
                src={goOnSvg}
                alt="GoOn logo"
                className="object-contain"
            />
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex gap-9 border-b pb-2 px-2 border-white">
                    {externalLinks?.map((icon, i) => (
                        <a key={'externalLinkId' + i} href={icon?.url} target="_blank">
                            <Image
                                src={icon?.src}
                                className="h-8 w-8 object-contain"
                                alt={icon?.url}
                            />
                        </a>
                    ))}
                </div>
                <div className="text-white w-3/4 mb-8">
                    <BlockRendererClient content={inicial} />
                </div>
            </div>
        </div>
        <div className="w-full flex justify-center mt-[-17px]">
            <div className="badge badge-lg bg-white uppercase py-6 px-10 text-primary font-bold text-md border-0 shadow-lg">
                Nossa história começa aqui
            </div>
        </div>
    </section>)
}