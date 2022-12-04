import * as db from '../../models/index.js';
import { Agencias } from db.Agencias;

export const update = (req, res) => {
    const id = req.params.id;
  
    Agencias.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Agencias actualizada correctamente."
          });
        } else {
          res.send({
            message: `No se puede actualizar Agencias con id=${id}. Talvez la Agencias no fue encontrada o la consulta esta vacia!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error Al actualizar la Agencias con id=" + id
        });
      });
  };