import { z } from "zod";

export const studentSchema = z.object({
  full_name: z.string().min(3, "El nombre es muy corto"),
  phone: z.string().optional(),
  dni: z.string().optional(),
  birth_date: z.string().optional().nullable(),
  weight: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.coerce.number().optional(),
  ),
  height: z.preprocess(
    (v) => (v === "" ? undefined : v),
    z.coerce.number().optional(),
  ),
  billing_type: z.enum(["monthly", "per_class"]),
  status: z.enum(["active", "inactive"]),
  medical_notes: z.string().optional(),
  emergency_contact: z.string().optional(),
});

export type StudentFormInput = z.input<typeof studentSchema>;
export type StudentFormOutput = z.output<typeof studentSchema>;
