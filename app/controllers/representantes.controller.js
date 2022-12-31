import {
   representantesFindAll,
   representanteFindOne,
   createRepresentante,
   deleteRepresentanteById,
   updateRepresentante,
   eleccionfindOne
} from "../use-cases/index.js";

/**
 * Hacer el proceso de validacion para las inscripciones
 */

function ingresarRepresentantesController(req, res) {
   function searchEleccion(idEleccion) {
      return new Promise((resolve, reject) => {
         const buscar = eleccionfindOne(idEleccion);
         resolve(buscar);
      });
   }

   function searchInscripcion(idEleccion) {
      return new Promise((resolve, reject) => {
         
      });
   }

   function ingresarRepresentante(datos) {
      return new Promise((resolve, reject) => {
         const ingresar = createRepresentante(datos);
         resolve(ingresar);
      });
   }

   searchEleccion(req.body.idElecciones)
   .then(eleccion => eleccion.message.id)
   .then(idEleccion => {
      req.body.idEleccion = idEleccion;
      return ingresarRepresentante(req.body);
   })
   .then(result => {
      return res.status(result.status).send({
         message: result.message,
         datos: result.datos
      });
   })
   .catch(err => {
      return res.status(err.status).send({
         message: err.message
      })
   });
}

function getAllRepresentantesController(req, res) {
   const buscar = representantesFindAll();

   buscar.then(representante => {
      if (representante.status === 200)
         return res.status(representante.status).send({
            message: representante.message
         });
   }).catch(err => {
      return res.status(err.status).send({
         message: err.message
      });
   });
}

function getRepresentanteController(req, res) {
   const { idRepresentante } = req.params;

   const search = representanteFindOne(idRepresentante);

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

function updateRepresentanteController (req, res) {
   const buscarRepresentante = (id) => new Promise((resolve, reject)=>{
      const search = representanteFindOne(id);
      resolve(search);
   });

   function searchEleccion(idEleccion) {
      return new Promise((resolve, reject) => {
         const buscar = eleccionfindOne(idEleccion);
         resolve(buscar);
      });
   }

   function searchInscripcion(idEleccion) {
      return new Promise((resolve, reject) => {
         
      });
   }

   const actualizar = (id, datos) => new Promise((resolve, reject)=>{
      const up = updateRepresentante(id, datos);
      resolve(up);
   });

   searchEleccion(req.body.idElecciones)
   .then(eleccion => eleccion.message.id)
   .then(idEleccion => {
      req.body.idEleccion = idEleccion;
      return buscarRepresentante(req.params.idRepresentante);
   })
   .then(representante => actualizar(representante.message.id, req.body))
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


function deleteRepresentanteController (req, res) {
   const eliminar = (id) => new Promise((resolve, reject)=>{
      const elim = deleteRepresentanteById(id);
      resolve(elim);
   });

   const buscarRepresentante = (id) => new Promise((resolve, reject)=>{
      const search = representanteFindOne(id);
      resolve(search);
   });

   buscarRepresentante(req.params.idRepresentante)
   .then(representante => eliminar(representante.message.id))
   .then(resp=>{
      res.status(resp.status).send({
         message: resp.message
      });
   }).catch(err => {console.log(err);
      return res.status(err.status).send({
         message: err.message
      });
   });
}

export default Object.freeze({
   ingresarRepresentantes: ingresarRepresentantesController,
   getAllRepresentantes: getAllRepresentantesController,
   getRepresentante: getRepresentanteController,
   updateRepresentante: updateRepresentanteController,
   deleteRepresentante: deleteRepresentanteController,
});