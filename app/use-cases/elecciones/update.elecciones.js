import * as db from '../../models/index.js';
import { Elecciones } from db.Elecciones;

export const update = (req, res) => {
    const id = req.params.id;
  
    Elecciones.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Elecciones actualizada correctamente."
          });
        } else {
          res.send({
            message: `No se puede actualizar Elecciones con id=${id}. Quizás la Eleccion no fue encontrada o la consulta esta vacia!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error Al actualizar la Elecciones con id=" + id
        });
      });
  };