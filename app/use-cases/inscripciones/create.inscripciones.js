import { Inscripciones } from '../../models/index.js';

export const create = async ({
  formulario,
  declaracion,
  estado,
  idAgencia,
  idSocio
}) => {
    // Validate request
    try{
      const inscripcion = await Inscripciones.create({
        formulario,
        declaracion,
        estado,
        idAgencia,
        idSocio
      });
      return({
        status: 200,
        message: inscripcion.dataValues,
      })

    } catch(e){
      throw ({
        status: 400,
        message: e,
      })
    }
  };
  
    // // Create a inscripcion
    // const inscripcion = {
    //   formulario: req.body.formulario,
    //   declaracion: req.body.declaracion,
    //   estado: req.body.estado,
    //   idAgencia: req.body.idAgencia,
    // };
  
    // Save inscripcion in the database
  //   Inscripciones.create(inscripcion)
  //     .then(data => {
  //       res.send(data);
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message:
  //           err.message || "Some error occurred while creating the inscripcion."
  //       });
  //     });
  // };