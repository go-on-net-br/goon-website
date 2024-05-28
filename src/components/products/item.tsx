import { Produto } from "@/types/produto";
import ApiImage from "../ApiImage";

export default function ProductsItem({
  product,
}: {
  readonly product: Produto;
}) {
  const productImage = product?.attributes?.FotoseVideos?.data.find(
    (e) => e.attributes.ext === ".png",
  );
  return (
    <div className="flex flex-col items-center justify-end">
      {productImage !== undefined && (
        <div className="flex h-80 w-96 flex-col items-center justify-end">
          <ApiImage
            contentStyles="object-contain max-h-80 max-w-96"
            image={productImage}
          ></ApiImage>
        </div>
      )}
      <p className="text-xl font-bold text-primary">
        {product?.attributes?.Titulo}
      </p>
      <p className="text-goOnGrey text-lg">
        #{product?.attributes?.Codigo} |{" "}
        {product?.attributes?.marca?.data?.attributes?.Marca}
      </p>
      <a className="mt-2 text-sm text-primary underline">Mais informações</a>
    </div>
  );
}
