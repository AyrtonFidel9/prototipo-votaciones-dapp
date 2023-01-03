import { Inscripciones } from '../../models/index.js';


export const update = (req, res) => {
    const id = req.params.id;
  
    Inscripciones.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Inscripciones actualizada correctamente."
          });
        } else {
          res.send({
            message: `No se puede actualizar Inscripciones con id=${id}. Quizás la Eleccion no fue encontrada o la consulta esta vacia!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error Al actualizar la Inscripciones con id=" + id
        });
      });
  };