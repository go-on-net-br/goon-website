"use client";

import Select from "react-select";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { AccreditationInputs } from "./fields.model";
import RequiredInputField from "./requiredInputField";

export default function AccreditationForm({ brands }: { brands: string[] }) {
  const methods = useForm<AccreditationInputs>({
    mode: "onBlur",
    shouldFocusError: true,
  });
  const { register, control } = methods;

  const selectOptions = brands.map((brand) => ({ value: brand, label: brand }));

  const controlStyles = "min-h-12 p-2 !rounded-lg !border-primary";

  return (
    <FormProvider {...methods}>
      <form
        {...{ netlify: true }}
        encType="application/x-www-form-urlencoded"
        className="flex flex-col items-center justify-center gap-4 px-4 md:flex-row md:flex-wrap md:items-start"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        data-netlify-recaptcha="true"
        name="credenciamento"
      >
        <input type="hidden" name="form-name" value="credenciamento" />
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        <RequiredInputField type="text" value="nome" />
        <RequiredInputField type="email" value="email" />
        <RequiredInputField type="tel" value="celular" />
        <RequiredInputField type="text" value="nomeDaEmpresa" />
        <RequiredInputField type="text" value="cnpj" />
        <RequiredInputField type="text" value="cidadeEUF" />
        <RequiredInputField type="text" value="endereco" />
        <label className="flex h-24 w-full flex-col md:w-[45%]">
          Complemento
          <input
            {...register("complemento")}
            type="text"
            className="input input-bordered input-primary w-full"
          />
        </label>
        <label className="flex h-24 w-full flex-col md:w-[91%]">
          Marcas de interesse
          <Controller
            control={control}
            name="marcas"
            render={({ field: { onChange, onBlur } }) => {
              return (
                <Select
                  isMulti
                  name="marcas"
                  options={selectOptions}
                  onChange={onChange}
                  onBlur={onBlur}
                  classNames={{
                    control: () => controlStyles,
                  }}
                />
              );
            }}
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
