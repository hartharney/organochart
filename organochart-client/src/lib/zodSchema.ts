import { z } from "zod";

export const departments = [
  "HR",
  "IT",
  "Sales",
  "Finance",
  "Marketing",
] as const;
export const roles = ["USER", "ADMIN"] as const;

export const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  //   department: z.enum(departments),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password is required"),
});
