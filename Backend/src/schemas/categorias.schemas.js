import { z } from "zod";

const CategoriasSchema = z.object({
  Cate_NomCa: z
    .string()
    .min(1, "El nombre no puede estar vacío")
    .max(50, "El nombre no debe exceder los 100 caracteres"),
  Cate_Descr: z
    .string()
    .min(1, "La descripcion no debe estar vacia")
    .max(150, "La descripcion no debe superar los 150 caracteres"),
});

export default CategoriasSchema;
