import { z } from "zod";

const proyectoSchema = z.object({
  Proy_Titul: z
    .string()
    .min(1, "El titulo del proyecto no puede estar vacío")
    .max(50, "El titulo del proyecto no debe exceder los 50 caracteres"),
  Proy_Descr: z
    .string()
    .min(1, "La descripcion del proyecto no debe estar vacio")
    .max(100, "La descripcion no debe superar los 100 caracteres"),
  Proy_NomAu: z
    .string()
    .min(1, "El nombre del autor no debe estar vacio")
    .max(100, "El nombre del autor no debe superar los 100 caracteres"),
  Proy_Resum: z
    .string()
    .min(1, "El resumen del proyecto no debe estar vacio")
    .max(100, "El resumen no debe exceder los 100 caracteres"),
  // status: z
  // .enum(["active", "inactive"]),
});

export default proyectoSchema;
