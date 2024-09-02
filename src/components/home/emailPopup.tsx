"use client";

import separator_white from "../../../public/separator_white.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { useEffect, useState } from "react";

type BtnTextProps =
  | "Enviar"
  | "Enviando..."
  | "Enviado ✓"
  | "Erro. Tentar novamente";

export default function EmailPopUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 8000);

    return () => clearTimeout(timeout);
  }, []);

  const [btnText, setBtnText] = useState<BtnTextProps>("Enviar");

  const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
    console.log(
      new URLSearchParams({
        "form-name": "newsletter",
        ...data,
      }).toString(),
    );
    try {
      setBtnText("Enviando...");
      const res = await fetch("/__newsletter.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "newsletter",
          ...data,
        }).toString(),
      });
      if (res.status === 200) {
        setBtnText("Enviado ✓");
      } else {
        setBtnText("Erro. Tentar novamente");
      }
    } catch (e) {
      setBtnText("Erro. Tentar novamente");
    }
  };

  const onClose = () => {
    if (btnText !== "Enviando...") {
      setIsOpen(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed left-0 top-0 z-30 flex h-full w-full cursor-pointer items-center justify-center bg-[rgba(255,255,255,0.6)] backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative m-4 flex cursor-auto flex-col items-center justify-center rounded-[50px] bg-primary px-6 py-4 text-white md:m-0 md:min-h-[545px] md:min-w-[625px] md:max-w-[1000px] md:px-20 md:py-12"
      >
        <button
          onClick={onClose}
          className="absolute right-7 top-7 rounded-full border border-white px-[9px] py-1 text-sm font-semibold text-white md:px-[11px] md:py-[3px] md:text-lg"
        >
          x
        </button>
        <Image
          src={separator_white}
          alt="separador"
          aria-label="separador"
          className="mx-auto mb-10 mt-4 md:mb-20 md:mt-0"
        />
        {btnText === "Enviado ✓" ? (
          <h1 className="mb-2 text-center text-2xl font-bold uppercase">
            <span>
              Inscrição realizada
              <br />
              com sucesso!
            </span>
          </h1>
        ) : (
          <>
            <header>
              <h1 className="m-auto mb-2 w-[200px] text-center uppercase md:m-0 md:w-auto">
                <span className="text-lg font-light md:text-2xl">
                  Fique por dentro de todas as
                </span>{" "}
                <br />
                <span className="text-2xl font-bold md:text-4xl">
                  novidades do setor
                </span>
              </h1>
              <p className="text-center text-sm md:text-base">
                Assine agora a Newsletter Exclusiva “Sua Casa Inteligente”{" "}
              </p>
            </header>
            <form
              encType="application/x-www-form-urlencoded"
              onSubmit={handleSubmit(onSubmit)}
              className="mt-3 flex w-full flex-col justify-center"
              data-netlify="true"
              netlify-honeypot="bot-field"
              name="newsletter"
            >
              <input type="hidden" name="form-name" value="newsletter" />
              <p className="hidden">
                <label>
                  Don’t fill this out if you’re human:{" "}
                  <input name="bot-field" />
                </label>
              </p>

              <label className="font-lg input input-bordered flex w-full items-center gap-2 rounded-md bg-primary text-white focus-within:outline-none focus:outline-none">
                <span className="min-w-12 text-sm md:min-w-14 md:text-base">
                  E-mail
                </span>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className={`input w-full rounded-xl border-none text-sm focus:outline-none active:outline-none md:text-base ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="mt-2 text-xs italic text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </label>
              <div className="flex h-20 w-full items-end justify-center">
                <input
                  type="submit"
                  className="btn btn-outline my-0 bg-white px-9 py-0 text-primary"
                  value={btnText}
                  disabled={
                    !["Enviar", "Erro. Tentar novamente"].includes(btnText)
                  }
                />
              </div>
            </form>
          </>
        )}
        <Image
          src={separator_white}
          alt="separador"
          aria-label="separador"
          className="mx-auto mb-4 mt-10 md:mb-0 md:mt-20"
        />
      </div>
    </div>
  );
}
