export const normalizePhoneNumber = (value: String | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})(\d+?)/, "$1");
};

export const normalizeCnpjNumber = (value: String | undefined) => {
  if (!value) return "";

  return value
    .replace(/[\D]/g, "")
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export function validCnpj(cnpj: string) {
  const cleanCnpj = cnpj.replace(/[^\d]+/g, "");

  if (cleanCnpj.length != 14) return false;

  var tamanhoTotal = cleanCnpj.length - 2;
  var cnpjSemDigitos = cleanCnpj.substring(0, tamanhoTotal);
  var digitosVerificadores = cleanCnpj.substring(tamanhoTotal);
  var soma = 0;
  var pos = tamanhoTotal - 7;
  for (let i = tamanhoTotal; i >= 1; i--) {
    soma += parseInt(cnpjSemDigitos.charAt(tamanhoTotal - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != parseInt(digitosVerificadores.charAt(0))) return false;

  tamanhoTotal = tamanhoTotal + 1;
  cnpjSemDigitos = cleanCnpj.substring(0, tamanhoTotal);
  soma = 0;
  pos = tamanhoTotal - 7;
  for (let i = tamanhoTotal; i >= 1; i--) {
    soma += parseInt(cnpjSemDigitos.charAt(tamanhoTotal - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != parseInt(digitosVerificadores.charAt(1))) return false;

  return true;
}

export function validEmail(email: string) {
  const regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);

  return regex.test(email);
}
