"use strict";
exports.__esModule = true;
var express = require("express");
var connection = require('./mysql-connection');
var router = express.Router();
router.get('/', function (req, res) {
    connection.query('select * from awMedicos order by nomeMedico', function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.get('/:nomeMedico', function (req, res) {
    var nomeMedico = req.params.nomeMedico;
    var sql = "SELECT * FROM awMedicos WHERE nomeMedico LIKE " + "'%" + nomeMedico + "%'" + " ORDER BY nomeMedico";
    connection.query(sql, function (err, rows) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.get('/id/:idMedico', function (req, res) {
    var idMedico = req.params.idMedico;
    var sql = "select * from awMedicos WHERE idMedico = " + idMedico;
    connection.query(sql, function (err, rows) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.post('/', function (req, res) {
    var c = req.body;
    var sql = 'insert into ' +
        'awMedicos (' +
        'nomeMedico, telefoneMedico, enderecoMedico, numeroMedico, complementoMedico, ' +
        'bairroMedico, cidadeMedico, estadoMedico, cepMedico, crmMedico, especialidadeMedico )' +
        'values (' +
        '?,?,?,?,?,  ?,?,?,?,?,  ? )';
    connection.query(sql, [c.nomeMedico, c.telefoneMedico, c.enderecoMedico, c.numeroMedico, c.complementoMedico,
        c.bairroMedico, c.cidadeMedico, c.estadoMedico, c.cepMedico, c.crmMedico, c.especialidadeMedico], function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router["delete"]('/:id', function (req, res) {
    connection.query('DELETE FROM awMedicos WHERE idMedico = ?', [req.params.id], function (err, rows, fields) {
        if (err)
            throw err;
        res.end('Deletado');
    });
});
router.put('/', function (req, res) {
    var c = req.body;
    var sql = 'update awMedicos set ' +
        'nomeMedico=?, telefoneMedico=?, enderecoMedico=?, numeroMedico=?, complementoMedico=?, bairroMedico=?, ' +
        'cidadeMedico=?, estadoMedico=?, cepMedico=?, crmMedico=?, especialidadeMedico=? ' +
        'where idMedico=?';
    connection.query(sql, [c.nomeMedico, c.telefoneMedico, c.enderecoMedico, c.numeroMedico, c.complementoMedico, c.bairroMedico,
        c.cidadeMedico, c.estadoMedico, c.cepMedico, c.crmMedico, c.especialidadeMedico, c.idMedico], function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
// router.post('/', controller.postAutocom)
// router.get('/cnpj/:cnpj', controller.getAutocomCnpj);
module.exports = router;
