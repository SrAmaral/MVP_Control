import { z } from "zod";

export const CreateUserSchema = z.object({
    email: z.string(),
    password: z.string().optional(),
    firstName: z.string(),
    lastName: z.string().optional(),
    rg: z.string().optional(),
    cpf: z.string().optional(),
    pis: z.string().optional(),
    ctps: z.string().optional(),
    contactNumber: z.string().optional(),
    contactEmail: z.string().optional(),
    typeHiring: z.string().optional(),
    hiringDate: z.coerce.date().optional(),
    position: z.string().optional(),
    salary: z.string().optional(),
    workLoad: z.string().optional(),
    comment: z.string().optional(),
    address:z.array(z.object({
        streetType: z.string(),
        street: z.string(),
        number: z.string(),
        complement: z.string(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
    })).optional(),
    role:z.object({
        id: z.number(),
    }).optional(),
})

export type CreateUserData = z.infer<typeof CreateUserSchema>

export const UpdateUserSchema = z.object({
    id: z.string(),
    email: z.string().optional(),
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    rg: z.string().optional(),
    cpf: z.string().optional(),
    pis: z.string().optional(),
    ctps: z.string().optional(),
    contactNumber: z.string().optional(),
    contactEmail: z.string().optional(),
    typeHiring: z.string().optional(),
    hiringDate: z.coerce.date().optional(),
    position: z.string().optional(),
    salary: z.string().optional(),
    workLoad: z.string().optional(),
    comment: z.string().optional(),
    address:z.array(z.object({
        id: z.number(),
        streetType: z.string(),
        street: z.string(),
        number: z.string(),
        complement: z.string(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string(),
    })).optional(),
    role:z.object({
        id: z.number(),
    }).optional(),
})

export type UpdateUserData = z.infer<typeof UpdateUserSchema>