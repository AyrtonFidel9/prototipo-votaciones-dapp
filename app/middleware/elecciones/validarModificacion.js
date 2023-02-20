import { eleccionfindOne } from "../../use-cases/index.js";


async function validarModificacion(req, res, next) {
    const { idEleccion } = req.params;
    const { estado } = req.body;

    const elecciones = await eleccionfindOne(idEleccion);
    const eleccion = elecciones.message.dataValues;

    const fecha = new Date(`${eleccion.dia} ${eleccion.hora}`);
    const horaInicial = fecha.getTime();
    const horaFinal = fecha.setHours(fecha.getHours() + eleccion.duracion);
    const horaActual = (new Date()).getTime();

    
    if(eleccion.estado === 'NO-INICIADO'){
        if(estado === 'NO-INICIADO') {
            next();
            return;
        }

        console.log("LLEGO HASTA AQUI");

        if(estado !== 'EN-CURSO') return res.status(400).send({
            message:
            "La elección solo puede cambiar al estado de EN CURSO"
        })
        // console.log(eleccion.dia);
        // const fecEle = new Date(eleccion.dia).toLocaleDateString('en-CA');
        const fecHoy = new Date().toLocaleDateString('en-CA');
        console.log(eleccion.dia, fecHoy);
        if(eleccion.dia !== fecHoy && estado === 'EN-CURSO') return res.status(400).send({
            message:
            "La elección no puede ser modificada al estado de EN CURSO, por la fecha"
        });

        if(horaActual < horaInicial && estado === 'EN-CURSO') return res.status(400).send({
            message:
            "La elección no puede ser modificada al estado de EN CURSO, por la fecha"
        });

        if(horaActual > horaFinal && estado === 'EN-CURSO') return res.status(400).send({
            message:
            "La elección no puede ser modificada al estado de EN CURSO, por la fecha"
        });

    }else if(eleccion.estado === 'EN-CURSO'){
        //toma toda la fecha completa con hora
        if(horaActual >= horaInicial && horaActual <= horaFinal) return res.status(400).send({
            message:
            "La elección esta EN CURSO, no puede ser modificada "
        }); 

        if( horaActual > horaInicial && estado !== 'NO-INICIADO'){
            if(estado !== 'EXITOSO'){
                return res.status(400).send({
                    message:
                    "La elección solo puede cambiar al estado de NO-INICIADO"
                })
            }
        } else if(horaActual < horaFinal && estado !== 'EXITOSO'){
            return res.status(400).send({
                message:
                "La elección solo puede cambiar al estado de EXITOSO"
            })
        }

    } else if(eleccion.estado === 'EXITOSO') {
        if(estado !== 'NULIDAD' && estado !== 'IMPUGNADO') return res.status(400).send({
            message:
            "Una elección EXITOSA solo puede cambiar al estado de NULIDAD o IMPUGNADO "
        });
    } else if(eleccion.estado === 'IMPUGNADO' || eleccion.estado === 'NULIDAD' ) { 
        if(estado !== 'IMPUGNADO' && estado !== 'NULIDAD' && estado !== 'EXITOSO'){
            return res.status(400).send({
                message:
                "La elección no puede ser modificada al estado de EN CURSO , NO INICIADO o EXITOSO"
            });
        }
    }
    //else {
    //     const fecEle = new Date(eleccion.dia);
    //     const fecHoy = new Date().toLocaleDateString('en-CA');
    //     if(fecEle !== fecHoy && estado === 'EN-CURSO') return res.status(400).send({
    //         message:
    //         "La elección no puede ser modificada al estado de EN CURSO"
    //     });
    // }

    next();
}


export { validarModificacion };
