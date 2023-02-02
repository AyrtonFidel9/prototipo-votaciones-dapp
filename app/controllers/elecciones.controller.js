import { create } from "../use-cases/elecciones/index.js";
import {
   buscarAgencia,
   eleccionesfindAll,
   eleccionfindOne,
   deleteEleccionById,
   updateEleccion
} from "../use-cases/index.js";
import { VotacionesController } from "./index.js";

/**
 * Validar que no haya mas de una eleccion por dia en una agencia [X]
 * Validar que no se pueda modificar la eleccion una vez este iniciada [X] back []front
 * Trigger cambiar de estado la eleccion que ha terminado - [-] - NO SE HACE
 * Quitar la opcion de eliminar a las elecciones del pasado [-] desde el FRONT
 * Validar que la creacion de una eleccion se de en el estado no iniciado [X]
 * Para en CURSO se debe estar enla fecha actual [X]
 * Si esta guardado como EXITOSO solo se puede cambiar a nulidad  e impugnado y viceversa [X]
 * EN CURSO no se acepta modificaciones [X]
 * Si esta EN CURSO, no puede pasar a NO INICIADO [ X ]
 * Si esta en EXITOSO NO PUEDE CAMBIAR A EN CURSO [ x ]
      * de EN CURSO solo puede cambiar a NO INICIADO [ X ]
 * Que la duracion de la eleccion no exceda las 8 horas habiles []
 */

function ingresarEleccionController(req, res) {
   function searchAgencia(idAgencia) {
      return new Promise((resolve, reject) => {
         const buscar = buscarAgencia(idAgencia);
         resolve(buscar);
      });
   }

   function ingresarEleccion(datos) {
      return new Promise((resolve, reject) => {
         const ingresar = create(datos);
         resolve(ingresar);
      });
   }

   searchAgencia(req.body.idAgencia)
      .then(agencia => agencia.message.id)
      .then(idAgencia => {
         req.body.idAgencia = idAgencia;
         return ingresarEleccion(req.body);
      })
      .then(result => {
         return res.status(result.status).send({
            message: result.message,
         });
      })
      .catch(err => {
         return res.status(err.status).send({
            message: err.message
         })
      });
}

function getAllEleccionesController(req, res) {
   const buscar = eleccionesfindAll();

   buscar.then(eleccion => {
      if (eleccion.status === 200)
         return res.status(eleccion.status).send({
            message: eleccion.message
         });
   }).catch(err => {
      console.log(err);
      return res.status(err.status).send({
         message: err.message
      });
   });
}

function getEleccionController(req, res) {
   const { idEleccion } = req.params;

   const search = eleccionfindOne(idEleccion);

   search.then(resp => {
      return res.status(resp.status).send({
         message: resp.message
      });
   }).catch(err => {
      return res.status(err.status).send({
         message: err.message
      });
   });
}

function updateEleccionController (req, res) {
   const buscarEleccion = (id) => new Promise((resolve, reject)=>{
      const search = eleccionfindOne(id);
      resolve(search);
   });

   const actualizar = (id, datos) => new Promise((resolve, reject)=>{
      const up = updateEleccion(id, datos);
      resolve(up);
   });

   const existEleccionToken = (id, address) => new Promise((resolve, reject)=>{
      const proc = VotacionesController.validarExistenciaEleccion(
         id,
         address
      );
      resolve(proc);
   })

   buscarEleccion(req.params.idEleccion)
   .then(eleccion => {
      if(req.body.estado === 'EN-CURSO'){
         return existEleccionToken(
            eleccion.message.id,
            req.body.wallet,
         )
      }else return false;
   })
   .then(resp=>{
      if(resp === true){
         return VotacionesController.registrarEleccion(
            req.params.idEleccion, 
            req.body.dia,
            req.body.wallet,
            res,
         );
      }
   })
   .then((e) => {
      if(e.status === 400){
         throw(e);
      }
      return actualizar(req.params.idEleccion, req.body)
   })
   .then(resp=>{
      return res.status(resp.status).send({
         message: resp.message
      });
   }).catch(err => {
      console.log(err);
      return res.status(err.status).send({
         message: err.message
      });
   });
}

function deleteEleccionController (req, res) {
   const eliminar = (id) => new Promise((resolve, reject)=>{
      const elim = deleteEleccionById(id);
      resolve(elim);
   });

   const buscarEleccion = (id) => new Promise((resolve, reject)=>{
      const search = eleccionfindOne(id);
      resolve(search);
   });

   buscarEleccion(req.params.idEleccion)
   .then(eleccion => eliminar(eleccion.message.id))
   .then(resp=>{
      return res.status(resp.status).send({
         message: resp.message
      });
   }).catch(err => {
      console.log(err);
      return res.status(err.status).send({
         message: err.message
      });
   });
}

export default Object.freeze({
   ingresarElecciones: ingresarEleccionController,
   getAllElecciones: getAllEleccionesController,
   getEleccion: getEleccionController,
   updateEleccion: updateEleccionController,
   deleteEleccion: deleteEleccionController,
});