import * as db from '../../models/index.js'
import { Listas } from db.Listas


// Delete a Listas with the specified id in the request
export const deleteById = (req, res) => {
    const id = req.params.id;
  
    Listas.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Listas was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Listas with id=${id}. Maybe Listas was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Listas with id=" + id
        });
      });
  };
  
  // Delete all Listas from the database.
export const deleteAll = (req, res) => {
    Listas.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Listas were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Listas."
        });
      });
  };