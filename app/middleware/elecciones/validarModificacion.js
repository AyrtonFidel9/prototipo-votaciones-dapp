import { eleccionfindOne } from "../../use-cases/index.js";


async function validarModificacion(req, res, next) {
    const { idEleccion } = req.params;
    const { estado } = req.body;

    const elecciones = await eleccionfindOne(idEleccion);
    const eleccion = elecciones.message.dataValues;

    const fecha = new Date(`${eleccion.dia} ${eleccion.hora}`);
    const horaInicial = fecha.getTime();
    const fechaFinal = fecha.addHours(eleccion.duracion);
    const horaFinal = fechaFinal.getTime();
    const horaActual = Date.now().getTime();


    if(eleccion.estado === 'NO-INICIADO'){
        if(estado !== 'EN-CURSO') return res.status(400).send({
            message:
            "La elección solo puede cambiar al estado de EN CURSO"
        })
    }else if(eleccion.estado === 'EN-CURSO')
        //toma toda la fecha completa con hora
        if(horaActual >= horaInicial && horaActual <= horaFinal) return res.status(400).send({
            message:
            "La elección esta EN CURSO, no puede ser modificada "
        }); else if( horaActual > horaInicial && estado !== 'NO-INICIADO' ){
            return res.status(400).send({
                message:
                "La elección solo puede cambiar al estado de NO-INICIADO"
            })
        } else if(horaActual < horaFinal && estado !== 'EXITOSO'){
            return res.status(400).send({
                message:
                "La elección solo puede cambiar al estado de EXITOSO"
            })
        }
    else if(eleccion.estado === 'EXITOSO') {
        if(estado !== 'NULIDAD' || estado !== 'IMPUGNADO') return res.status(400).send({
            message:
            "Una elección EXITOSA solo puede cambiar al estado de NULIDAD o IMPUGNADO "
        });
    }else {
        const fecEle = new Date(eleccion.dia);
        const fecHoy = new Date(Date.now().toLocaleDateString('en-CA'));
        if(fecEle !== fecHoy && estado === 'EN-CURSO') return res.status(400).send({
            message:
            "La elección no puede ser modificada al estado de EN CURSO"
        });
    }

    next();
}


export { validarModificacion };
