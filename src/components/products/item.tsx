import { Produto } from "@/types/produto";
import ApiImage from "../ApiImage";
import ProductsDialog from "./dialog";

export default function ProductsItem({
  product,
}: {
  readonly product: Produto;
}) {
  const productImage = product?.attributes?.FotoseVideos?.data.find(
    (e) =>
      ![".mp4", ".mov", ".avi", ".wmv", ".WebM"].includes(e.attributes.ext),
  );
  const modalId = "product_modal_" + product.id;

  return (
    <>
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
        <p className="text-lg text-goOnGrey">
          #{product?.attributes?.Codigo} |{" "}
          {product?.attributes?.marca?.data?.attributes?.Marca}
        </p>
        <a
          className="mt-2 text-sm text-primary underline"
          onClick={() => (document.getElementById(modalId) as any).showModal()}
        >
          Mais informações
        </a>
      </div>

      {/* Dialog */}

      <dialog id={modalId} className="modal modal-bottom sm:modal-middle">
        <ProductsDialog product={product} />
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
