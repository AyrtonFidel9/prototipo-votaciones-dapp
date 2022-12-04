export default function cantidadGanadores(req, res, next){

    const {
        representantes,
        ganadores
    } = req.body;

    if(ganadores >= representantes){
        res.status(400).send({
            message: "La cantidad de ganadores no puede ser mayor a la cantidad de representantes",
        });
        return;
    }

    next();
}