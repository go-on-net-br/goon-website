"use client";

import { FormProvider, useForm } from "react-hook-form";
import { ContactInputs } from "./contactInputs.model";
import RequiredInputField from "../accreditation/requiredInputField";

export default function ContactForm() {
  const methods = useForm<ContactInputs>({
    mode: "onBlur",
    shouldFocusError: true,
  });
  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col justify-center"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        data-netlify-recaptcha="true"
        name="contato"
      >
        <input type="hidden" name="form-name" value="contato" />
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
            className="input input-bordered input-primary w-full rounded-lg h-full"
            rows={6}
            {...register("mensagem", {
              validate: (val) => {
                if (val?.length === 0) return "Campo obrigatório";
              },
            })}
          />
        </label>

        <div className="flex h-20 w-full items-end justify-center">
          <div data-netlify-recaptcha="true"></div>
          <input
            type="submit"
            className="btn btn-outline btn-primary btn-lg my-0 w-1/2 py-0"
            value="Enviar"
          />
        </div>
      </form>
    </FormProvider>
  );
}
