import { 
    ingresarAgencia, 
    buscarAgencia,
    eliminarAgencia,
    actualizarAgencia
} from "../use-cases/agencias/index.js";

const ingresarAgenciaController = async (req, res) => {
    const {
        nombre,
        ubicacion,
        representantes,
        ganadores
    } = req.body;

    const addedAgencia = ingresarAgencia(
        nombre, ubicacion, representantes, ganadores
    );

    addedAgencia.then(resp => {
        res.status(resp.status).send({
            message: resp.message,
            datos: resp.datos
        })
    }).catch(err => {
        res.status(err.status).send({
            name: err.message.name,
            message: err.message.errors[0].message,
            tipo: err.message.errors[0].type,
        })
    });
}

const buscarAgenciaController = (req, res) => {
    const { agenciaId } = req.params;
    
    const search = buscarAgencia(agenciaId);

    search.then(resp => {
        res.status(resp.status).send({
            message: resp.message
        });
    });
}

const eliminarAgenciaController = async (req, res) => {
    const { agenciaId } = req.params;
    
    //const search = buscarAgencia(agenciaId);

    /*search.then(resp => {
        if(resp.status !== 200)
        {
            res.status(resp.status).send({
                message: resp.message
            });
        }
    }).then( resp => {
        const eliminar = eliminarAgencia(agenciaId);

        eliminar.then(resp => {
            res.status(resp.status).send({
                message: resp.message,
            })
        }).catch(err => {
            res.status(err.status).send({
                message: err.message
            })
        });
    });*/
    Promise.all([
        await buscarAgencia(agenciaId), 
        eliminarAgencia(agenciaId)
    ])
    .then(resp => {
        const search = resp[0]; // se guarda el proceso de buscar agencia

        if(search.status !== 200)
        {
            res.status(search.status).send({
                message: search.message
            });

            return;
        }

        const deleted = resp[1]; // se guarda el proceso de eliminar agencia

        res.status(deleted.status).send({
            message: deleted.message,
        });

    }).catch(err => {
        res.status(err.status).send({
            message: err.message
        });
    });
}

const actualizarAgenciaController = (req, res) => {
    
    const { agenciaId } = req.params;

    function search(id){
        return new Promise((res, rej)=>{
            const buscar = buscarAgencia(id);
            res(buscar);
        })
    }

    function update(id, newDatos){
        return new Promise((res, rej)=>{
            const up = actualizarAgencia(id, newDatos);
            res(up);
        });
    }

    search(agenciaId).then((agencia) => {

        agencia.status !== 200 && 
        res.status(agencia.status).send({
            message: agencia.message
        });
        
        return agencia.message;
    })
    .then((datos) => update(datos.id, req.body))
    .then(result => {
        res.status(result.status).send({
            message: result.message,
        })
    })
    .catch(err=>{
        res.status(err.status).send({
            message: err.message
        })
    });
}

export default Object.freeze({
    ingresarAgencia: ingresarAgenciaController,
    buscarAgencia: buscarAgenciaController,
    eliminarAgencia: eliminarAgenciaController,
    actualizarAgencia: actualizarAgenciaController,
});