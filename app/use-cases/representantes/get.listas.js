import * as db from '../../models/index.js'
import { Listas } from db.Listas

export const findAll = (req, res) => {
    Listas.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Listas."
        });
      });
  };
  
  // Find a single Listas with an id
  export const findOne = (req, res) => {
    const id = req.params.id;
  
    Listas.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(404).send({
          message: "No se encontró Listas con id= " + id
        });
      });t
  };