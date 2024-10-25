import { z } from "zod";

export const CreateUserSchema = z.object({
    id: z.string().optional(),
    email: z.string(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    rg: z.string(),
    cpf: z.string(),
    pis: z.string().optional(),
    ctps: z.string().optional(),
    contactNumber: z.string(),
    contactEmail: z.string(),
    typeHiring: z.string(),
    hiringDate: z.string(),
    position: z.string(),
    salary: z.string().optional(),
    workLoad: z.string().optional(),
    comment: z.string().optional(),
    address:z.array(z.object({
        id: z.number().optional(),
        streetType: z.string(),
        street: z.string(),
        number: z.string(),
        complement: z.string().optional(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
    })).optional(),
    files: z.array(z.object({
        id: z.number().optional(),
        filename: z.string().optional(),
        url: z.string().optional(),
        type: z.string().optional(),
    })).optional(),
    role:z.object({
        id: z.number(),
    }),
})

export type CreateUserData = z.infer<typeof CreateUserSchema>