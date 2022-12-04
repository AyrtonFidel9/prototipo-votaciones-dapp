import * as db from '../../models/index.js';
import { Agencias } from db.Agencias;

export const create = (req, res) => {
    // Validate request
    if (!req.body.nombre) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a Agencia
    const agencia = {
      nombre: req.body.nombre,
      ubicacion: req.body.ubicacion,
      numRepresentantes: req.body.numRepresentantes,
      numGanadores: req.body.numGanadores,
    };
  
    // Save Agencia in the database
    Agencias.create(agencia)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Agencia."
        });
      });
  };