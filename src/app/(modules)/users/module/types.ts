import { z } from "zod";

export const CreateUserSchema = z.object({
    id: z.string().optional(),
    email: z.string().optional(),
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
    hiringDate: z.string().optional(),
    position: z.string().optional(),
    salary: z.string().optional(),
    workLoad: z.string().optional(),
    comment: z.string().optional(),
    address:z.array(z.object({
        id: z.number().optional(),
        streetType: z.string(),
        street: z.string(),
        number: z.string(),
        complement: z.string().optional(),
        neighborhood: z.string().optional(),
        city: z.string(),
        state: z.string(),
        zipCode: z.string().optional(),
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
    hiringDate: z.string().optional(),
    position: z.string().optional(),
    salary: z.string().optional(),
    workLoad: z.string().optional(),
    comment: z.string().optional(),
    address:z.array(z.object({
        id: z.number().optional(),
        streetType: z.string().optional(),
        street: z.string().optional(),
        number: z.string().optional(),
        complement: z.string().optional(),
        neighborhood: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        zipCode: z.string().optional(),
    })).optional(),
    role:z.object({
        id: z.number(),
    }).optional(),
})

export type UpdateUserData = z.infer<typeof UpdateUserSchema>