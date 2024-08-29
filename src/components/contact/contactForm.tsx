"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ContactInputs } from "./contactInputs.model";
import RequiredInputField from "../accreditation/requiredInputField";
import { useState } from "react";

export default function ContactForm() {
  const methods = useForm<ContactInputs>({
    mode: "onBlur",
    shouldFocusError: true,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  const [btnText, setBtnText] = useState("Enviar");

  const onSubmit: SubmitHandler<ContactInputs> = async (data) => {
    try {
      setBtnText("Enviando...");
      const res = await fetch("/__contact.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          "form-name": "contato",
          ...data,
        }).toString(),
      });
      if (res.status === 200) {
        setBtnText("Enviado ✓");
      } else {
        setBtnText("Erro");
      }
    } catch (e) {
      setBtnText("Erro");
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center"
        data-netlify="true"
        netlify-honeypot="bot-field"
        name="contato"
      >
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        <RequiredInputField fullWidth type="text" value="nome" />
        <RequiredInputField fullWidth type="email" value="email" />
        <RequiredInputField fullWidth type="text" value="tema" />
        <label
          className={
            "flex w-full flex-col gap-2 " +
            (errors?.mensagem ? "text-red-500" : "")
          }
        >
          {errors?.mensagem
            ? `Mensagem* - ` + errors?.mensagem?.message
            : `Mensagem*`}
          <textarea
            required={true}
            className="input input-bordered input-primary h-full w-full rounded-lg"
            rows={6}
            {...register("mensagem", {
              validate: (val) => {
                if (val?.length === 0) return "Campo obrigatório";
              },
            })}
          />
        </label>

        <div className="flex h-20 w-full items-end justify-center">
          <input
            type="submit"
            className="btn btn-outline btn-primary btn-lg my-0 w-1/2 py-0"
            value={btnText}
            disabled={btnText !== "Enviar"}
          />
        </div>
      </form>
    </FormProvider>
  );
}
