import { z } from "zod";

export const studentSchema = z.object({
  full_name: z.string().min(3, "El nombre es muy corto"),
  phone: z.string().optional(),
  billing_type: z.enum(["monthly", "per_class"]),
  due_date: z.string().optional().nullable(),
  status: z.enum(["active", "inactive"]),
});

export type StudentFormValues = z.infer<typeof studentSchema>;
