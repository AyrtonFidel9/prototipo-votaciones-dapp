function validarHorasHabiles(req, res, next) {
  const { duracion } = req.body;

  if (duracion > 8)
    return res.status(400).send({
      message: "La duración maxima de la elección es de 8 horas",
    });

  next();
}

export { validarHorasHabiles };
