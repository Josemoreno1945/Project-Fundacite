export const isAdmin = (req, res, next) => {
  // El usuario debe estar autenticado y tener el rol de admin
  if (
    req.user &&
    (req.user.rol === 1 ||
      req.user.rol === 3 ||
      req.user.rol === "Administrador principal" ||
      req.user.rol === "Administrador")
  ) {
    return next();
  }
  return res
    .status(403)
    .json({ error: "Acceso denegado: solo administradores" });
};
