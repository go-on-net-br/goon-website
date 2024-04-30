import { Media } from "@/types/common";
import NextImage from "next/image";

export default function ApiImage({
  image,
  contentStyles = '',
}: {
  image: Media;
  contentStyles?: string;
}) {
  const imageInfo = image?.data?.attributes ?? {};
  return (
    <NextImage
      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageInfo.url}`}
      width={imageInfo?.width}
      height={imageInfo?.height}
      alt={imageInfo.alternativeText ?? ""}
      className={contentStyles}
    />
  );
}
