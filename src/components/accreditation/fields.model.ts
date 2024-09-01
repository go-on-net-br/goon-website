export type AccreditationInputs = {
  nome: string;
  email: string;
  celular: string;
  nomeDaEmpresa: string;
  cnpj: string;
  cidadeEUF: string;
  endereco: string;
  complemento?: string;
  marcas: { value: string; label: string }[];
};
