"use client";

import separator_white from "../../../public/separator_white.svg";
import { SubmitHandler, useForm } from "react-hook-form";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function EmailPopUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 8000);

    return () => clearTimeout(timeout);
  }, []);

  const onSubmit: SubmitHandler<{ email: string }> = (data) => {
    setIsLoading(true);
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data).toString(),
    })
      .then(() => {
        setStatus("success");
      })
      .catch(() => {
        setStatus("error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const onClose = () => {
    if (!isLoading) {
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
        className="relative flex min-h-[545px] min-w-[625px] max-w-[1000px] cursor-auto flex-col items-center justify-center rounded-[50px] bg-primary px-20 py-12 text-white"
      >
        <button
          onClick={onClose}
          className="absolute right-7 top-7 rounded-full border border-white px-[11px] py-[3px] text-lg font-semibold text-white"
        >
          x
        </button>
        <Image
          src={separator_white}
          alt="separador"
          aria-label="separador"
          className="mx-auto mb-20"
        />
        {status ? (
          <h1 className="mb-2 text-center text-2xl font-bold uppercase">
            {status === "success" ? (
              <span>
                Inscrição realizada
                <br />
                com sucesso!
              </span>
            ) : (
              "falha ao realizar inscrição"
            )}
          </h1>
        ) : (
          <>
            <header>
              <h1 className="mb-2 text-center uppercase">
                <span className="text-2xl font-light">
                  Fique por dentro de todas as
                </span>{" "}
                <br />
                <span className="text-4xl font-bold">novidades do setor</span>
              </h1>
              <p>Assine agora a Newsletter Exclusiva “Sua Casa Inteligente” </p>
            </header>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="mt-3 flex w-full flex-col justify-center"
              data-netlify="true"
              netlify-honeypot="bot-field"
              data-netlify-recaptcha="true"
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
                <span className="min-w-14">E-mail</span>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  className={`input w-full rounded-xl border-none focus:outline-none active:outline-none ${errors.email ? "border-red-500" : ""}`}
                />
                {errors.email && (
                  <p className="mt-2 text-xs italic text-red-500">
                    {errors.email.message}
                  </p>
                )}
                {errors.email && (
                  <p className="mt-2 text-xs italic text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </label>
              <div className="flex h-20 w-full items-end justify-center">
                <div data-netlify-recaptcha="true"></div>
                {isLoading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  <input
                    type="submit"
                    className="btn btn-outline my-0 bg-white px-9 py-0 text-primary"
                    value="Enviar"
                  />
                )}
              </div>
            </form>
          </>
        )}
        <Image
          src={separator_white}
          alt="separador"
          aria-label="separador"
          className="mx-auto mt-20"
        />
      </div>
    </div>
  );
}
