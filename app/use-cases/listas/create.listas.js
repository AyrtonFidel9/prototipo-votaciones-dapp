import * as db from '../../models/index.js';
import { Elecciones } from db.Elecciones
import { findOne } from '../agencias/index.js'


export const create = (req, res) => {
    // Validate request
    const id = req.params.id;
    id = req.body.idAgencia;
    if (!findOne(id, res)) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a eleccion
    const eleccion = {
      dia: req.body.dia,
      hora: req.body.hora,
      duracion: req.body.duracion,
      idAgencia: req.body.idAgencia,
    };
  
    // Save eleccion in the database
    Elecciones.create(eleccion)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the eleccion."
        });
      });
  };