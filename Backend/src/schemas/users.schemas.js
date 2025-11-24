import { z } from "zod";

const userSchema = z.object({
  first_name: z
    .string()
    .min(1, "The first name cannot be empty")
    .max(100, "The first name cannot exceed 100 characters"),
  last_name: z
    .string()
    .min(1, "The last name cannot be empty")
    .max(100, "The last name cannot exceed 100 characters"),
  user_name: z
    .string()
    .min(1, "The user name cannot be empty")
    .max(100, "The user name cannot exceed 100 characters"),
  password: z
    .string()
    .min(8, "The password must be at least 8 characters long")
    .regex(/[A-Z]/, "The password must contain at least one uppercase letter")
    .regex(/[a-z]/, "The password must contain at least one lowercase letter")
    .regex(/[0-9]/, "The password must contain at least one number"),
  email: z.string().email("Must be a valid email"),
  // status: z
  // .enum(["active", "inactive"]),
});

export default userSchema;
