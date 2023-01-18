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
 * Validar que no haya mas de una eleccion por dia en una agencia
 * Validar que no se pueda modificar la eleccion una vez este iniciada
 * Trigger cambiar de estado la eleccion que ha terminado -
 * Quitar la opcion de eliminar a las elecciones del pasado
 * Validar que la creacion de una eleccion se de en el estado no iniciado
 * Para en CURSO se debe estar enla fecha actual
 * Si esta guardado como EXITOSO solo se puede cambiar a nulidad  e impugnado y viceversa
 * EN CURSO no se acepta modificaciones
 * Si esta EN CURSO, no puede pasar a NO INICIADO
 * Si esta en EXITOSO NO PUEDE CAMBIAR A EN CURSO
 * de EN CURSO solo puede cambiar a NO INICIADO
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
         existEleccionToken(
            eleccion.message.id,
            req.body.wallet,
         ).then(resp=>{
            if(resp === true){
               VotacionesController.registrarEleccion(
                  eleccion.message.id, 
                  req.body.dia,
                  req.body.wallet,
               );
            }
         });
      }
      return eleccion;
   })
   .then(eleccion => {
      return actualizar(eleccion.message.id, req.body)
   })
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