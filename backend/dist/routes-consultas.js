"use strict";
exports.__esModule = true;
var express = require("express");
var connection = require('./mysql-connection');
var router = express.Router();
router.get('/', function (req, res) {
    var where;
    if (!req.query.idMedico) {
        where =
            "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") ";
    }
    else {
        where =
            "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") " +
                "AND (idMedicoConsulta = " + req.query.idMedico + ") ";
    }
    ;
    var sql = "SELECT " +
        "md.nomeMedico, ct.nome, dataConsulta, mid(horaConsulta,1,5) horaConsulta, " +
        "idConsulta, idMedicoConsulta, idPacienteConsulta, idEmpresaConsulta, " +
        "queixaPrincipalConsulta, pesoConsulta, alturaConsulta, cabecaConsulta, historiaDoencaAtualConsulta, " +
        "exameFisicoConsulta, hipoteseDiagnosticaConsulta, condutaConsulta, " +
        "prescricaoConsulta, Date_Format(dataConsulta,'%d/%m/%Y') dataConsultaFrm, " +
        "ct.maeNome, ct.paiNome, ct.telefone " +
        "FROM awConsultas " +
        "INNER JOIN awContatos ct " +
        "ON awConsultas.idPacienteConsulta = ct.id " +
        "INNER JOIN awMedicos md " +
        "ON awConsultas.idMedicoConsulta = md.idMedico " +
        where +
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
        "dataConsulta, mid(horaConsulta,1,5) horaConsulta, queixaPrincipalConsulta, pesoConsulta, alturaConsulta, " +
        "cabecaConsulta, historiaDoencaAtualConsulta,prescricaoConsulta, Date_Format(dataConsulta,'%d/%m/%Y') dataConsultaFrm, " +
        "exameFisicoConsulta, hipoteseDiagnosticaConsulta, condutaConsulta, " +
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
    var where;
    if (!req.query.idMedico) {
        where =
            "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") " +
                "AND (Date_Format(dataConsulta,'%Y-%m-%d') = " + "'" + dataConsulta + "') ";
    }
    else {
        where =
            "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") " +
                "AND (idMedicoConsulta = " + req.query.idMedico + ") " +
                "AND (Date_Format(dataConsulta,'%Y-%m-%d') = " + "'" + dataConsulta + "') ";
    }
    ;
    var sql = "SELECT " +
        "Date_Format(dataConsulta,'%d/%m/%Y') dataConsultaFrm, mid(horaConsulta,1,5) horaConsultaFrm, horaConsulta, " +
        "dataConsulta, idConsulta, idPacienteConsulta, idEmpresaConsulta, idMedicoConsulta, " +
        "queixaPrincipalConsulta, pesoConsulta, alturaConsulta, cabecaConsulta, historiaDoencaAtualConsulta, " +
        "prescricaoConsulta, exameFisicoConsulta, hipoteseDiagnosticaConsulta, condutaConsulta, " +
        "ct.nome,  ct.maeNome, ct.paiNome, ct.telefone, md.nomeMedico " +
        "FROM awConsultas " +
        "INNER JOIN awContatos ct " +
        "ON awConsultas.idPacienteConsulta = ct.id " +
        "INNER JOIN awMedicos md " +
        "ON awConsultas.idMedicoConsulta = md.idMedico " +
        where +
        "ORDER BY Date_Format(dataConsulta,'%Y-%m-%d'), horaConsulta";
    connection.query(sql, function (err, rows) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.get('/paciente/:idPacienteConsulta', function (req, res) {
    var idPacienteConsulta = req.params.idPacienteConsulta;
    // let sql =   "SELECT * "+
    //             "FROM awConsultas "+
    //             "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") "+
    //               "AND (idPacienteConsulta = " + "'" + idPacienteConsulta + "') " + 
    //             "ORDER BY idConsulta";
    var sql = "SELECT " +
        "md.nomeMedico, ct.nome, dataConsulta, mid(horaConsulta,1,5) horaConsulta, " +
        "idConsulta, idMedicoConsulta, idPacienteConsulta, idEmpresaConsulta, " +
        "queixaPrincipalConsulta, pesoConsulta, alturaConsulta, cabecaConsulta, historiaDoencaAtualConsulta, " +
        "exameFisicoConsulta, hipoteseDiagnosticaConsulta, condutaConsulta, " +
        "prescricaoConsulta, Date_Format(dataConsulta,'%d/%m/%Y') dataConsultaFrm, " +
        "ct.maeNome, ct.paiNome, ct.telefone " +
        "FROM awConsultas " +
        "INNER JOIN awContatos ct " +
        "ON awConsultas.idPacienteConsulta = ct.id " +
        "INNER JOIN awMedicos md " +
        "ON awConsultas.idMedicoConsulta = md.idMedico " +
        "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") " +
        "AND (idPacienteConsulta = " + "'" + idPacienteConsulta + "') " +
        "ORDER BY dataConsulta DESC, horaConsulta DESC";
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
        'idPacienteConsulta, idEmpresaConsulta, idMedicoConsulta, dataConsulta, horaConsulta, queixaPrincipalConsulta, ' +
        'pesoConsulta, alturaConsulta, cabecaConsulta, historiaDoencaAtualConsulta, exameFisicoConsulta, ' +
        'hipoteseDiagnosticaConsulta, condutaConsulta, prescricaoConsulta )' +
        'values (' +
        ' ?,?,?,?, ?,?,?,?, ?,?,?, ?,?,?)';
    connection.query(sql, [c.idPacienteConsulta, c.idEmpresaConsulta, c.idMedicoConsulta, c.dataConsulta, c.horaConsulta, c.queixaPrincipalConsulta,
        c.pesoConsulta, c.alturaConsulta, c.cabecaConsulta, c.historiaDoencaAtualConsulta, c.exameFisicoConsulta, c.hipoteseDiagnosticaConsulta,
        c.condutaConsulta, c.prescricaoConsulta], function (err, rows, fields) {
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
        'queixaPrincipalConsulta=?, pesoConsulta=?, alturaConsulta=?, ' +
        'cabecaConsulta=?, historiaDoencaAtualConsulta=?, exameFisicoConsulta=?, ' +
        'hipoteseDiagnosticaConsulta=?, condutaConsulta=?, prescricaoConsulta=? ' +
        'where idConsulta=?';
    connection.query(sql, [c.queixaPrincipalConsulta, c.pesoConsulta, c.alturaConsulta,
        c.cabecaConsulta, c.historiaDoencaAtualConsulta, c.exameFisicoConsulta,
        c.hipoteseDiagnosticaConsulta, c.condutaConsulta, c.prescricaoConsulta,
        c.idConsulta], function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.put('/remarcacao', function (req, res) {
    var c = req.body;
    var sql = 'update awConsultas set ' +
        'idMedicoConsulta=?, dataConsulta=?, horaConsulta=? ' +
        'where idConsulta=?';
    connection.query(sql, [c.idMedicoConsulta, c.dataConsulta, c.horaConsulta, c.idConsulta], function (err, rows, fields) {
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
