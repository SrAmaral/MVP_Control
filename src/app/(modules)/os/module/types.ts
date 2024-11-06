import { z } from "zod";
import { clientSchema } from "../../clients/module/types";
import { CreateUserSchema } from "../../users/module/types";

export const osSchema = z.object({
  id: z.string().optional(),
  scheduleDate: z.string(),
  description: z.string(),
  serviceDescription: z.string().optional(),
  realizedDate: z.string().optional(),
  approverName : z.string().optional(),
  approverDate: z.string().optional(),
  signatureImage: z.string().optional(),
  principalContact: z.string(),
  deadline: z.string(),
  status: z.string().optional(),
  createdAt: z.coerce.date().default(() => new Date()).nullish(),
  updatedAt: z.coerce.date().nullish(),
  logicalDeleted: z.boolean().optional(),
  client: clientSchema,
  users: z.array(CreateUserSchema),
  files: z.array(z.object({
    id: z.number().optional(),
    filename: z.string().optional(),
    url: z.string().optional(),
    type: z.string().optional(),
})).optional(),
});

export type OSType = z.infer<typeof osSchema>;