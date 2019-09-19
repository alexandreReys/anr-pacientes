"use strict";
exports.__esModule = true;
var express = require("express");
var connection = require('./mysql-connection');
var router = express.Router();
router.get('/id/:idEmpresa', function (req, res) {
    var sql = "SELECT * " +
        "FROM awEmpresas " +
        "WHERE (idEmpresa = " + req.params.idEmpresa + ")";
    connection.query(sql, function (err, rows) {
        if (err)
            throw err;
        res.json(rows);
    });
});
// router.post('/', controller.postAutocom)
// router.get('/cnpj/:cnpj', controller.getAutocomCnpj);
module.exports = router;
