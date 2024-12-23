import { Media } from "@/types/common";
import NextImage from "next/image";

export default function ApiImage({
  image,
  contentStyles = "",
  alt,
}: {
  image: Media;
  contentStyles?: string;
  alt?: string;
}) {
  const imageInfo = image?.attributes ?? {};

  return (
    <NextImage
      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageInfo.url}`}
      width={imageInfo?.width}
      height={imageInfo?.height}
      alt={alt ?? imageInfo.alternativeText ?? ""}
      className={contentStyles}
    />
  );
}
