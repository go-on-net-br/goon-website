"use client";
import { Produto } from "@/types/produto";
import ApiImage from "../ApiImage";
import ProductsDialog from "./dialog";

export default function ProductsItem({
  product,
  handleClick,
}: {
  readonly product: Produto;
  handleClick: (action: "open" | "close", productId: number) => void;
}) {
  const productImage = product?.attributes?.FotoseVideos?.data.find(
    (e) =>
      ![".mp4", ".mov", ".avi", ".wmv", ".WebM"].includes(e.attributes.ext),
  );
  const modalId = "product_modal_" + product.id;

  return (
    <>
      <div
        className="flex max-w-full cursor-pointer flex-col items-center justify-end"
        onClick={() => handleClick("open", product.id)}
      >
        {productImage !== undefined && (
          <div className="flex h-80 w-96 max-w-full flex-col items-center justify-end px-2 md:px-0">
            <ApiImage
              contentStyles="object-contain max-h-80 max-w-96"
              image={productImage}
            ></ApiImage>
          </div>
        )}
        <p className="text-xl font-bold text-primary">
          {product?.attributes?.Titulo}
        </p>
        <p className="text-lg text-goOnGrey">
          #{product?.attributes?.Codigo} |{" "}
          {product?.attributes?.marca?.data?.attributes?.Marca}
        </p>
        <a className="mt-2text-sm text-primary underline">Mais informações</a>
      </div>

      {/* Dialog */}

      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <ProductsDialog product={product} />
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => handleClick("close", 0)}>close</button>
        </form>
      </dialog>
    </>
  );
}
