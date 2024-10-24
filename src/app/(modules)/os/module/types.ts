import { z } from "zod";
import { clientSchema } from "../../clients/module/types";
import { CreateUserSchema } from "../../users/module/types";

export const osSchema = z.object({
  id: z.string().optional(),
  scheduleDate: z.string(),
  description: z.string(),
  deadline: z.string(),
  status: z.string().optional(),
  createdAt: z.coerce.date().default(() => new Date()).nullish(),
  updatedAt: z.coerce.date().nullish(),
  logicalDeleted: z.boolean().optional(),
  client: clientSchema,
  users: z.array(CreateUserSchema)
});

export type OSType = z.infer<typeof osSchema>;