import * as db from '../../models/index.js';
import { Listas } from db.Listas

export const create = (req, res) => {
    // Validate request
    if (!req.body.idBilletera) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
  
    // Create a lista
    const lista = {
      nombre: req.body.nombre,
      imagen: req.body.imagen,
      ethCantVot: req.body.ethCantVot,
      idBilletera: req.body.idBilletera,
    };
  
    // Save lista in the database
    Listas.create(lista)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the lista."
        });
      });
  };