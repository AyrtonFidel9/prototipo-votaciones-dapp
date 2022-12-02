function validateCedula(req, res, next){

    const value = cedula.reduce((acumulador, currentValue, index)=>{
        const newValue = index % 2 === 0 ? (currentValue * 2) : currentValue;
        return acumulador + (newValue > 9 ? newValue - 9 : newValue);
    });

    const residuo = value % 10;
    const finalValue = 10 - residuo;
    const respuesta = finalValue === cedula.charAt(cedula.length - 1);
    
    !respuesta && res.status(401).send({
        message: "Cédula no válida!",
    });

    next();
}

export { validateCedula };