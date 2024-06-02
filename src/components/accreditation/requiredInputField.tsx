"use client";

import { useFormContext } from "react-hook-form";
import { AccreditationInputs } from "./fields.model";
import {
  validCnpj,
  normalizeCnpjNumber,
  validEmail,
  normalizePhoneNumber,
} from "@/helpers/inputMasks";
import { ContactInputs } from "../contact/contactInputs.model";

interface RequiredFields extends ContactInputs, AccreditationInputs {}

export default function RequiredInputField({
  value,
  type,
  fullWidth = false,
}: {
  value: keyof RequiredFields;
  type: string;
  fullWidth?: boolean;
}) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<RequiredFields>();

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
    mensagem: "Mensagem",
    tema: "tema",
  };

  let fieldStyles = "flex h-24 flex-col " + (fullWidth ? "w-full" : "w-[45%]");

  fullWidth;

  return (
    <label className={fieldStyles + (errors?.[value] ? " text-red-500" : "")}>
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
