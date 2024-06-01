"use client";

import { useFormContext } from "react-hook-form";
import { AccreditationInputs } from "./fields.model";
import {
  validCnpj,
  normalizeCnpjNumber,
  validEmail,
  normalizePhoneNumber,
} from "@/helpers/inputMasks";

export default function RequiredInputField({
  value,
  type,
}: {
  value: keyof AccreditationInputs;
  type: string;
}) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<AccreditationInputs>();

  const labelMap: Record<typeof value, string> = {
    nome: "Nome",
    email: "E-mail",
    celular: "Celular",
    nomeDaEmpresa: "Nome da empresa",
    cnpj: "CNPJ",
    cidadeEUF: "Cidade e UF",
    endereco: "Endereço",
    complemento: "Complemento",
    marcas: "Marcas",
  };

  return (
    <label
      className={
        "flex w-[45%] flex-col gap-2 " + (errors?.[value] ? "text-red-500" : "")
      }
    >
      {errors?.[value]
        ? `${labelMap[value]}* - ` + errors?.[value]?.message
        : `${labelMap[value]}*`}
      <input
        required={true}
        type={type}
        className="input input-bordered input-primary w-full rounded-lg"
        {...register(value, {
          validate: (val) => {
            if (val?.length === 0) return "Campo obrigatório";
            if (typeof val === "string") {
              if (value === "cnpj" && !validCnpj(val)) {
                return "CNPJ inválido";
              }
              if (value === "email" && !validEmail(val)) {
                return "E-mail inválido";
              }
              if (value === "celular" && val.length !== 15) {
                console.log(val);
                return "Celular inválido";
              }
            }
          },
          onChange: (e) => {
            if (value === "cnpj") {
              setValue("cnpj", normalizeCnpjNumber(e?.target?.value));
            }
            if (value === "celular") {
              setValue("celular", normalizePhoneNumber(e?.target?.value));
            }
          },
        })}
      />
    </label>
  );
}
