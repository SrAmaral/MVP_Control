import { z } from "zod";

export const clientSchema = z.object({
  id: z.string().optional(),
  cnpj: z.string(),
  fantasyName: z.string(),
  companyName: z.string(),
  cnaeCode: z.string(),
  cnaeDescription: z.string(),
  contactNumber: z.string(),
  contactEmail: z.string(),
  openedData: z.string(),
  createdAt: z.coerce.date().default(() => new Date()).nullish(),
  updatedAt: z.coerce.date().nullish(),
  clientAddress: z
    .object({
      id: z.number().optional(),
      streetType: z.string(),
      street: z.string(),
      number: z.string(),
      complement: z.string(),
      neighborhood: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode: z.string(),
    }),
  contacts: z
    .array(
      z.object({
        id: z.number(),
        name: z.string(),
        email: z.string(),
        phoneNumber: z.string(),
}))})

export type ClientType = z.infer<typeof clientSchema>;

export type CNPJRequestType = {
  BAIRRO: string;
  CEP: string;
  "CNAE PRINCIPAL CODIGO": string;
  ["CNAE PRINCIPAL DESCRICAO"]: string;
  CNPJ: string;
  COMPLEMENTO: string;
  ["DATA ABERTURA"]: string;
  DDD: string;
  EMAIL: string;
  LOGRADOURO: string;
  MUNICIPIO: string;
  ["NOME FANTASIA"]: string;
  NUMERO: string;
  ["RAZAO SOCIAL"]: string;
  STATUS: string;
  TELEFONE: string;
  ["TIPO LOGRADOURO"]: string;
  UF: string;
}