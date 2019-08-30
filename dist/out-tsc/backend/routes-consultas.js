import * as express from 'express';
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
        "md.nomeMedico, idConsulta, idPacienteConsulta, idEmpresaConsulta, idMedicoConsulta, " +
        "dataConsulta, mid(horaConsulta,1,5) horaConsulta, queixaPrincipalConsulta, pesoConsulta, " +
        "alturaConsulta, cabecaConsulta, historiaDoencaAtualConsulta,prescricaoConsulta, " +
        "Date_Format(dataConsulta,'%d/%m/%Y') dataConsultaFrm, " +
        "ct.nome,  ct.maeNome, ct.paiNome, ct.telefone " +
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
        'idPacienteConsulta, idEmpresaConsulta, idMedicoConsulta, dataConsulta, horaConsulta, queixaPrincipalConsulta, ' +
        'pesoConsulta, alturaConsulta, cabecaConsulta, historiaDoencaAtualConsulta, prescricaoConsulta )' +
        'values (' +
        ' ?,?,?,?, ?,?,?,?, ?,?,?)';
    connection.query(sql, [c.idPacienteConsulta, c.idEmpresaConsulta, c.idMedicoConsulta, c.dataConsulta, c.horaConsulta, c.queixaPrincipalConsulta,
        c.pesoConsulta, c.alturaConsulta, c.cabecaConsulta, c.historiaDoencaAtualConsulta, c.prescricaoConsulta], function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.delete('/:idConsulta', function (req, res) {
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
        'cabecaConsulta=?, historiaDoencaAtualConsulta=?, prescricaoConsulta=? ' +
        'where idConsulta=?';
    connection.query(sql, [c.queixaPrincipalConsulta, c.pesoConsulta, c.alturaConsulta,
        c.cabecaConsulta, c.historiaDoencaAtualConsulta, c.prescricaoConsulta,
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
//# sourceMappingURL=routes-consultas.js.map