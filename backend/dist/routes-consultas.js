"use strict";
exports.__esModule = true;
var express = require("express");
var connection = require('./mysql-connection');
var router = express.Router();
router.get('/', function (req, res) {
    connection.query('select * from awConsultas order by idConsulta', function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.get('/paciente/:idPaciente', function (req, res) {
    var idPaciente = req.params.idPaciente;
    var sql = "SELECT * FROM awConsultas WHERE idPaciente = " + "'" + idPaciente + "'" + " ORDER BY idConsulta";
    connection.query(sql, function (err, rows) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.post('/', function (req, res) {
    var c = req.body;
    var sql = 'insert into ' +
        'awConsultas (' +
        'idPaciente, dataConsulta, horaConsulta, motivoConsulta, ' +
        'pesoConsulta, alturaConsulta, cabecaConsulta, infoConsulta, ' +
        'prescricaoConsulta, dataNascConsulta )' +
        'values (' +
        ' ?,?,?,?, ?,?,?,?, ?,?)';
    connection.query(sql, [c.idPaciente, c.dataConsulta, c.horaConsulta, c.motivoConsulta,
        c.pesoConsulta, c.alturaConsulta, c.cabecaConsulta, c.infoConsulta,
        c.prescricaoConsulta, c.dataNascConsulta], function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router["delete"]('/:idConsulta', function (req, res) {
    connection.query('delete from awConsultas where idConsulta = ?', [req.params.idConsulta], function (err, rows, fields) {
        if (err)
            throw err;
        res.end('Deletado');
    });
});
router.put('/', function (req, res) {
    var c = req.body;
    var sql = 'update awConsultas set ' +
        'idPaciente=?, dataConsulta=?, horaConsulta=?, motivoConsulta=?, ' +
        'pesoConsulta=?, alturaConsulta=?, cabecaConsulta=?, infoConsulta=?, ' +
        'prescricaoConsulta=?, dataNascConsulta=? ' +
        'where idConsulta=?';
    connection.query(sql, [c.idPaciente, c.dataConsulta, c.horaConsulta, c.motivoConsulta,
        c.pesoConsulta, c.alturaConsulta, c.cabecaConsulta, c.infoConsulta,
        c.prescricaoConsulta, c.dataNascConsulta], function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
// router.get('/:nome', (req, res) => {
//     let sNome: string = req.params.nome;
//     let sql = "SELECT * FROM awConsultas WHERE nome LIKE " + "'%" + sNome + "%'" + " ORDER BY nome";
//     connection.query(sql, 
//       function(err, rows) {
//         if (err) throw err;
//         res.json(rows);
//       }
//     );
// });
// router.post('/', controller.postAutocom)
// router.get('/cnpj/:cnpj', controller.getAutocomCnpj);
module.exports = router;
