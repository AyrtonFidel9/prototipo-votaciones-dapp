import * as db from '../../models/index.js'
import { Inscripciones } from db.Inscripciones


// Delete a Inscripciones with the specified id in the request
export const deleteById = (req, res) => {
    const id = req.params.id;
  
    Inscripciones.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Inscripcion was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Inscripcion with id=${id}. Maybe Inscripciones was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Inscripcion with id=" + id
        });
      });
  };
  
  // Delete all Inscripciones from the database.
export const deleteAll = (req, res) => {
    Inscripciones.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Inscripciones were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Inscripciones."
        });
      });
  };