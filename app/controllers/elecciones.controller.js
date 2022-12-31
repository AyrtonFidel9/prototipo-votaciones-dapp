import { create } from "../use-cases/elecciones/index.js";
import {
   buscarAgencia,
   eleccionesfindAll,
   eleccionfindOne,
   deleteEleccionById,
   updateEleccion
} from "../use-cases/index.js";

/**
 * Validar que no haya mas de una eleccion por dia en una agencia
 * Validar que no se pueda modificar la eleccion una vez este iniciada
 * Trigger cambiar de estado la eleccion que ha terminado
 * Quitar la opcion de eliminar a las elecciones del pasado
 * 
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
      return res.status(err.status).send({
         message: err.message
      });
   });
}

function getEleccionController(req, res) {
   const { idEleccion } = req.params;

   const search = eleccionfindOne(idEleccion);

   search.then(resp => {
      res.status(resp.status).send({
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

   buscarEleccion(req.params.idEleccion)
   .then(eleccion => actualizar(eleccion.message.id, req.body))
   .then(resp=>{
      res.status(resp.status).send({
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
      res.status(resp.status).send({
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