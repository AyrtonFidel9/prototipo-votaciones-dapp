function validateCedula(req, res, next){
    let { cedula } = req.body;

    const value = [...cedula].reduce((acumulador, currentValue, index)=>{

        const newValue = index % 2 === 0 ? 
            (parseInt(currentValue) * 2) : 
            parseInt(currentValue);

        return acumulador + (newValue >= 10 ? (newValue - 9) : newValue);
    },0);

    const residuo = value % 10;
    const finalValue = 10 - residuo;
    const respuesta = finalValue === cedula.charAt(cedula.length - 1);

    if(residuo !== 0 && !respuesta) 
        return res.status(401).send({
            message: "Cédula no válida!",
        });

    next();
}

export { validateCedula };