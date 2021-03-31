const {validationResult} = require('express-validator');

// valido los errores con el middleware que esta en la ruta

const valirdarCampos = (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    // si el middleware pasa, sigue con el siguiente middleware
    // o el controlador
    next();
}

module.exports = {
    valirdarCampos
}