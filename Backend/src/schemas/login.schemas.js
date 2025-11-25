import { z } from "zod";

const loginSchema = z.object({
  Usua_NomUs: z
    .string()
    .min(1, "El nombre de usuario no debe estar vacio")
    .max(100, "El nombre de usuario no debe exceder los 100 caracteres"),
  Usua_Contr: z.string().min(1, "Debes ingresar la contraseña"),
});

export default loginSchema;
