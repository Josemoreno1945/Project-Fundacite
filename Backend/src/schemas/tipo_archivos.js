import { z } from "zod";

const tipo_aSchema = z.object({
  TipA_Nombr: z
    .string()
    .min(1, "El nombre no puede estar vacío")
    .max(4, "El nombre no debe exceder los 4 caracteres"),
});

export default tipo_aSchema;
