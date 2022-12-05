import * as db from '../../models/index.js'
import { Elecciones } from db.Elecciones

export const findAll = (req, res) => {
    Elecciones.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Elecciones."
        });
      });
  };
  
  // Find a single Elecciones with an id
  export const findOne = (req, res) => {
    const id = req.params.id;
  
    Elecciones.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(404).send({
          message: "No se encontró Elecciones con id= " + id
        });
      });t
  };