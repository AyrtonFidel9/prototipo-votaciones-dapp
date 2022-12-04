import * as db from '../../models/index.js'
import { Agencias } from db.Agencias


// Delete a Agencias with the specified id in the request
export const deleteById = (req, res) => {
    const id = req.params.id;
  
    Agencias.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Agencias was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Agencias with id=${id}. Maybe Agencias was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Agencias with id=" + id
        });
      });
  };
  
  // Delete all Agencias from the database.
export const deleteAll = (req, res) => {
    Agencias.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Agencias were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Agencias."
        });
      });
  };