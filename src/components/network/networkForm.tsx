"use client";

import Select from "react-select";
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useEffect, useState } from "react";
import RequiredInputField from "../accreditation/requiredInputField";

export type NetworkInputs = {
  nome: string;
  email: string;
  celular: string;
  cidadeEUF: string;
  CEP: string;
  marcas: { value: string; label: string }[];
  tipoDeProjeto: string;
};

export default function NetworkForm({ brands }: { brands: string[] }) {
  const methods = useForm<NetworkInputs>({
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

  const onSubmit: SubmitHandler<NetworkInputs> = async (data) => {
    try {
      setBtnText("Enviando...");

      const formattedData = {
        ...data,
        marcas: formatMarcas(data.marcas),
      };
      const body = new URLSearchParams({
        "form-name": "redeCredenciada",
        ...formattedData,
      }).toString();

      const res = await fetch("/__redeCredenciada.html", {
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
        name="redeCredenciada"
      >
        <p className="hidden">
          <label>
            Don’t fill this out if you’re human: <input name="bot-field" />
          </label>
        </p>
        <RequiredInputField type="text" value="nome" />
        <RequiredInputField type="email" value="email" />
        <RequiredInputField type="tel" value="celular" />
        <RequiredInputField type="text" value="cidadeEUF" />
        <RequiredInputField type="tel" value="CEP" />
        <label className="flex h-24 w-full flex-col md:w-[45%]">
          Qual tipo de projeto?
          <input
            {...register("tipoDeProjeto")}
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
