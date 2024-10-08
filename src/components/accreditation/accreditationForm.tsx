"use client";

import Select from "react-select";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { AccreditationInputs } from "./fields.model";
import RequiredInputField from "./requiredInputField";
import { useEffect, useState } from "react";

export default function AccreditationForm({ brands }: { brands: string[] }) {
  const methods = useForm<AccreditationInputs>({
    mode: "onBlur",
    shouldFocusError: true,
  });
  const { register, control, handleSubmit } = methods;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const [btnText, setBtnText] = useState("Enviar");

  const formatMarcas = (
    marcasObj: { value: string; label: string }[],
  ): string => {
    const marcas = marcasObj.map((m) => m.label);
    if (marcas.length === 1) {
      return marcas[0];
    } else if (marcas.length === 2) {
      return `${marcas[0]} e ${marcas[1]}`;
    } else if (marcas.length > 2) {
      const lastMarca = marcas.pop();
      return `${marcas.join(", ")} e ${lastMarca}`;
    }
    return "";
  };

  const onSubmit: SubmitHandler<AccreditationInputs> = async (data) => {
    try {
      setBtnText("Enviando...");

      const formattedData = {
        ...data,
        marcas: formatMarcas(data.marcas),
      };
      const body = new URLSearchParams({
        "form-name": "credenciamento",
        ...formattedData,
      }).toString();

      const res = await fetch("/__accreditation.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
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
  const selectOptions = brands.map((brand) => ({ value: brand, label: brand }));

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center gap-4 px-4 text-sm md:flex-row md:flex-wrap md:items-start md:text-base"
        data-netlify="true"
        netlify-honeypot="bot-field"
        name="credenciamento"
      >
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
        {isMounted && (
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
                      control: () => "min-h-12 p-2 !rounded-lg !border-primary",
                    }}
                  />
                );
              }}
            />
          </label>
        )}
        <input className="hidden" type="text" {...register("marcas")} />
        <div className="flex h-20 w-full items-end justify-center">
          <input
            type="submit"
            className="btn btn-outline btn-primary btn-lg my-0 w-1/2 py-0"
            value={btnText}
            disabled={!["Enviar", "Erro. Tentar novamente"].includes(btnText)}
          />
        </div>
      </form>
    </FormProvider>
  );
}
