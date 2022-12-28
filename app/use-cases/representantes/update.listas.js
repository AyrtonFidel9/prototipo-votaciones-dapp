

import * as db from '../../models/index.js';
import { Listas } from db.Listas;

export const update = (req, res) => {
    const id = req.params.id;
  
    Listas.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Listas actualizada correctamente."
          });
        } else {
          res.send({
            message: `No se puede actualizar Listas con id=${id}. Quizás la Eleccion no fue encontrada o la consulta esta vacia!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error Al actualizar la Listas con id=" + id
        });
      });
  };