import {z} from "zod";

export const loginSchema = z.object({
  email: z.string()
  .min(1, "email address is required")
  .email("invalid email address"),
  password: z
  .string()
  .min(1, "Password is required")
  .min(6, "password must be at least 6 characters")
  .max(100, "password must be at most 100 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;