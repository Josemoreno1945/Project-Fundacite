import { z } from "zod";

const userSchema = z.object({
  Usua_PrimN: z
    .string()
    .min(1, "El primer nombre no puede estar vacío")
    .max(100, "El primer nombre no debe exceder los 100 caracteres"),
  Usua_PrimA: z
    .string()
    .min(1, "El primer apellido no debe estar vacio")
    .max(100, "El primer apellido no debe superar los 100 caracteres"),
  Usua_NomUs: z
    .string()
    .min(1, "El nombre de usuario no debe estar vacio")
    .max(100, "El nombre de usuario no debe exceder los 100 caracteres"),
  Usua_Contr: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una letra mayúscula")
    .regex(/[a-z]/, "La contraseña debe contener al menos una letra minúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
  Usua_Email: z.string().email("Debe ser un correo electrónico válido"),
  // status: z
  // .enum(["active", "inactive"]),
});

export default userSchema;
