export default function cantidadGanadores(req, res, next){
    const {
        numRepresentantes,
        numGanadores
    } = req.body;

    if(numGanadores >= numRepresentantes){
        res.status(400).send({
            message: "La cantidad de ganadores no puede ser mayor a la cantidad de representantes",
        });
        return;
    }

    next();
}