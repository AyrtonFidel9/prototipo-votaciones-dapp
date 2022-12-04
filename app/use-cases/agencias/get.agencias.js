import * as db from '../../models/index.js'
import { Agencias } from db.Agencias

export const findAll = (req, res) => {
    Agencias.findAll()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Agencias."
        });
      });
  };
  
  // Find a single Agencias with an id
  export const findOne = (req, res) => {
    const id = req.params.id;
  
    Agencias.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(404).send({
          message: "No se encontró Agencias con id= " + id
        });
      });t
  };