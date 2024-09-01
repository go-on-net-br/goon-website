"use client";
import { Produto } from "@/types/produto";
import ApiImage from "../ApiImage";
import ProductsDialog from "./dialog";
import { useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ProductsItem({
  product,
}: {
  readonly product: Produto;
}) {
  const productImage = product?.attributes?.FotoseVideos?.data.find(
    (e) =>
      ![".mp4", ".mov", ".avi", ".wmv", ".WebM"].includes(e.attributes.ext),
  );
  const searchParams = useSearchParams();
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (searchParams.get("id") === product.id.toString()) {
      dialogRef.current?.showModal();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("id");
    dialogRef.current?.close();
    router.push(`/produtos?${params.toString()}`, { scroll: false });
  };

  const handleOpen = (id: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("id", id.toString());
    dialogRef.current?.showModal();
    router.push(`/produtos?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <div
        className="flex max-w-full cursor-pointer flex-col items-center justify-end"
        onClick={() => handleOpen(product.id)}
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

      <dialog className="modal modal-bottom sm:modal-middle" ref={dialogRef}>
        <ProductsDialog product={product} handleClose={handleClose} />
        <form method="dialog" className="modal-backdrop">
          <button onClick={() => handleClose()}>close</button>
        </form>
      </dialog>
    </>
  );
}
