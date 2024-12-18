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
  createdAt: z.coerce
    .date()
    .default(() => new Date())
    .nullish(),
  updatedAt: z.coerce.date().nullish(),
  logicalDeleted: z.boolean().optional(),
  clientAddress: z.object({
    id: z.string().optional(),
    streetType: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    neighborhood: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    logicalDeleted: z.boolean().optional(),
  }),
  contacts: z.array(
    z.object({
      id: z.string().optional(),
      name: z.string(),
      email: z.string(),
      phoneNumber: z.string(),
      logicalDeleted: z.boolean().optional(),
    }),
  ),
});

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
};

export type CEPResponseType = {
  cep: string,
  logradouro: string ,
  complemento: string,
  unidade: string,
  bairro: string,
  localidade: string,
  uf: string,
  estado: string,
  regiao: string,
  ibge: string,
  gia: string,
  ddd: string,
  siafi: string
};