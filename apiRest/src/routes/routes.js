const express = require('express');
const router = express.Router();

router.get('/servicios', (req, res) => {
    const entrada = req.query.entrada;
    const result = calcular(entrada);

    const return_json = {
        entrada  : entrada,
        resultado : result
    };

    console.log("json api: " + return_json);
    res.status(201).json(return_json);
});

function calcular(expression){
	expression = expression.replace(/\^/g, "**");

	let x = Function('return ' + expression)();
	return x;
}


module.exports = router;