import { Inscripciones } from '../../models/index.js';

export const create = (req, res) => {
    // Validate request
    if (!req.body.formulario) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a inscripcion
    const inscripcion = {
      formulario: req.body.formulario,
      declaracion: req.body.declaracion,
      estado: req.body.estado,
      idAgencia: req.body.idAgencia,
    };
  
    // Save inscripcion in the database
    Inscripciones.create(inscripcion)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the inscripcion."
        });
      });
  };