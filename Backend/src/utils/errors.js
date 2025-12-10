export function throwError(errorObj) {
  const error = new Error(errorObj.message);
  error.status = errorObj.status;
  throw error;
}

export const errors = {
  // Usuarios
  userNotFound: {
    status: 404,
    message: "Usuario no encontrado",
  },
  userDuplicated: {
    status: 409,
    message: "El usuario ya esta registrado",
  },
  User_emailDuplicated: {
    status: 409,
    message: "El email ya esta registrado",
  },

  ProyectotituloDuplicated: {
    status: 409,
    message: "El titulo del proyecto ya esta registrado",
  },

  NombreCategoriaDuplicated: {
    status: 409,
    message: "El nombre de la categoria ya esta registrado",
  },

  //login
  InvalidPassword: {
    status: 401,
    message: "Contraseña incorrecta",
  },

  // Errores generales de base de datos / consultas---------------------------------------------------------------

  dbConnectionError: {
    status: 503,
    message: "Database connection error",
  },
  querySyntaxError: {
    status: 400,
    message: "SQL syntax error",
  },
  foreignKeyViolation: {
    status: 409,
    message: "Foreign key constraint violation",
  },
  notNullViolation: {
    status: 400,
    message: "Null value in column violates not-null constraint",
  },
  dataTypeMismatch: {
    status: 400,
    message: "Data type mismatch in query",
  },

  rowNotFound: {
    status: 404,
    message: "No data found for the query",
  },

  //Error de autenticacion o token---------------------------------------------------------
  unauthorized: {
    status: 403,
    message: "Admin-only access",
  },
  Notoken: {
    status: 401,
    message: "No token provided",
  },
  invalidToken: {
    status: 403,
    message: "Invalid token",
  },

  // Otros errores comunes
  missingFields: {
    status: 400,
    message: "Campos obligatorios faltantes",
  },
  invalidData: {
    status: 400,
    message: "invalid id",
  },
};
