function validateCedula(req, res, next){

    console.log(req.body);

    let { cedula } = req.body;

    let cedulaClean = cedula.replaceAll(' ', '');

    const value = [...cedulaClean].reduce((acumulador, currentValue, index)=>{

        const newValue = index % 2 === 0 ? 
            (parseInt(currentValue) * 2) : 
            parseInt(currentValue);

        return acumulador + (newValue >= 10 ? (newValue - 9) : newValue);
    },0);
    const residuo = value % 10;
    console.log(residuo);
    if(residuo !== 0){
        const finalValue = 10 - residuo;
        const respuesta = finalValue === cedulaClean.charAt(cedulaClean.length - 1);
        if(!respuesta) 
            return res.status(401).send({
                message: "Cédula no válida!",
            });
        else
            next();
    }else{
        next();
    }
}

export { validateCedula };