import * as db from '../../models/index.js'
import { Elecciones } from db.Elecciones


// Delete a Elecciones with the specified id in the request
export const deleteById = (req, res) => {
    const id = req.params.id;
  
    Elecciones.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Elecciones was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Elecciones with id=${id}. Maybe Elecciones was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Elecciones with id=" + id
        });
      });
  };
  
  // Delete all Elecciones from the database.
export const deleteAll = (req, res) => {
    Elecciones.destroy({
      where: {},
      truncate: false
    })
      .then(nums => {
        res.send({ message: `${nums} Elecciones were deleted successfully!` });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all Elecciones."
        });
      });
  };