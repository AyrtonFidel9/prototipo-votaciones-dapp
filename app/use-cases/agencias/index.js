import * as db from '../../models/index.js'
import Agencias from db.Agencias

// Update a Agencias by the id in the request




// find all published Agencias
exports.findAllPublished = (req, res) => {
  Agencias.findAll({ where: { published: true } })
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