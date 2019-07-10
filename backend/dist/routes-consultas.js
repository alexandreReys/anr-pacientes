"use strict";
exports.__esModule = true;
var express = require("express");
var connection = require('./mysql-connection');
var router = express.Router();
router.get('/', function (req, res) {
    var sql = "SELECT " +
        "idConsulta, idPacienteConsulta, idEmpresaConsulta, idMedicoConsulta, " +
        "dataConsulta, horaConsulta, motivoConsulta, pesoConsulta, alturaConsulta, " +
        "cabecaConsulta, infoConsulta, prescricaoConsulta, " +
        "Date_Format(dataConsulta,'%d/%m/%Y') dataConsultaFrm, " +
        "ct.nome,  ct.maeNome, ct.paiNome, ct.telefone " +
        "FROM awConsultas " +
        "INNER JOIN awContatos ct " +
        "ON awConsultas.idPacienteConsulta = ct.id " +
        "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") " +
        "ORDER BY Date_Format(dataConsulta,'%Y-%m-%d'), horaConsulta";
    connection.query(sql, function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.get('/id/:idConsulta', function (req, res) {
    var idConsulta = req.params.idConsulta;
    //  let sql = "SELECT * FROM awConsultas WHERE idConsulta = " + "'" + idConsulta + "'" + " ORDER BY idConsulta";
    var sql = "SELECT " +
        "idConsulta, idPacienteConsulta, idEmpresaConsulta, idMedicoConsulta, " +
        "dataConsulta, horaConsulta, motivoConsulta, pesoConsulta, alturaConsulta, " +
        "cabecaConsulta, infoConsulta,prescricaoConsulta, Date_Format(dataConsulta,'%d/%m/%Y') dataConsultaFrm, " +
        "ct.nome,  ct.maeNome, ct.paiNome, ct.telefone " +
        "FROM awConsultas " +
        "INNER JOIN awContatos ct " +
        "ON awConsultas.idPacienteConsulta = ct.id " +
        "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") " +
        "AND (idConsulta = " + "'" + idConsulta + "') " +
        "ORDER BY Date_Format(dataConsulta,'%Y-%m-%d'), horaConsulta";
    connection.query(sql, function (err, rows) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.get('/data/:dataConsulta', function (req, res) {
    var dataConsulta = req.params.dataConsulta;
    var sql = "SELECT " +
        "idConsulta, idPacienteConsulta, idEmpresaConsulta, idMedicoConsulta, dataConsulta, horaConsulta, motivoConsulta, " +
        "pesoConsulta, alturaConsulta, cabecaConsulta, infoConsulta,prescricaoConsulta, " +
        "Date_Format(dataConsulta,'%d/%m/%Y') dataConsultaFrm, " +
        "ct.nome,  ct.maeNome, ct.paiNome, ct.telefone " +
        "FROM awConsultas " +
        "INNER JOIN awContatos ct " +
        "ON awConsultas.idPacienteConsulta = ct.id " +
        "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") " +
        "AND (Date_Format(dataConsulta,'%Y-%m-%d') = " + "'" + dataConsulta + "') " +
        "ORDER BY Date_Format(dataConsulta,'%Y-%m-%d'), horaConsulta";
    connection.query(sql, function (err, rows) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.get('/paciente/:idPacienteConsulta', function (req, res) {
    var idPacienteConsulta = req.params.idPacienteConsulta;
    var sql = "SELECT * " +
        "FROM awConsultas " +
        "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") " +
        "AND (idPacienteConsulta = " + "'" + idPacienteConsulta + "') " +
        "ORDER BY idConsulta";
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
        'idPacienteConsulta, idEmpresaConsulta, idMedicoConsulta, dataConsulta, horaConsulta, motivoConsulta, ' +
        'pesoConsulta, alturaConsulta, cabecaConsulta, infoConsulta, prescricaoConsulta )' +
        'values (' +
        ' ?,?,?,?, ?,?,?,?, ?,?,?)';
    connection.query(sql, [c.idPacienteConsulta, c.idEmpresaConsulta, c.idMedicoConsulta, c.dataConsulta, c.horaConsulta, c.motivoConsulta,
        c.pesoConsulta, c.alturaConsulta, c.cabecaConsulta, c.infoConsulta, c.prescricaoConsulta], function (err, rows, fields) {
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
        'motivoConsulta=?, pesoConsulta=?, alturaConsulta=?, ' +
        'cabecaConsulta=?, infoConsulta=?, prescricaoConsulta=? ' +
        'where idConsulta=?';
    connection.query(sql, [c.motivoConsulta, c.pesoConsulta, c.alturaConsulta,
        c.cabecaConsulta, c.infoConsulta, c.prescricaoConsulta,
        c.idConsulta], function (err, rows, fields) {
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
