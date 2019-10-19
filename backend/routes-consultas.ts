import * as express from 'express';

const connection = require('./mysql-connection');

const router = express.Router();

router.get('/', (req, res) => {
    let where: string;
    if(!req.query.idMedico){
      where =
        "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") ";
    } else {
        where =
            "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") " +
                "AND (idMedicoConsulta = " + req.query.idMedico + ") ";
    };

    let sql = "SELECT " + 
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

    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/id/:idConsulta', (req, res) => {
    let idConsulta: string = req.params.idConsulta;
//  let sql = "SELECT * FROM awConsultas WHERE idConsulta = " + "'" + idConsulta + "'" + " ORDER BY idConsulta";
    let sql =   "SELECT " + 
                    "idConsulta, idPacienteConsulta, idEmpresaConsulta, idMedicoConsulta, " + 
                    "dataConsulta, mid(horaConsulta,1,5) horaConsulta, queixaPrincipalConsulta, pesoConsulta, alturaConsulta, " + 
                    "cabecaConsulta, historiaDoencaAtualConsulta,prescricaoConsulta, Date_Format(dataConsulta,'%d/%m/%Y') dataConsultaFrm, " +
                    "exameFisicoConsulta, hipoteseDiagnosticaConsulta, condutaConsulta, " +
                    "ct.nome,  ct.maeNome, ct.paiNome, ct.telefone " +
                "FROM awConsultas " +
                    "INNER JOIN awContatos ct " +
                        "ON awConsultas.idPacienteConsulta = ct.id " +
                "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") "+
                  "AND (idConsulta = " + "'" + idConsulta + "') " +
                "ORDER BY Date_Format(dataConsulta,'%Y-%m-%d'), horaConsulta";

    connection.query(sql, 
        function(err, rows) {
            if (err) throw err;
            res.json(rows);
        }
    );
});

router.get('/data/:dataConsulta', (req, res) => {
    let dataConsulta: string = req.params.dataConsulta;

    let where: string;
    if(!req.query.idMedico){
      where =
        "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") "+
            "AND (Date_Format(dataConsulta,'%Y-%m-%d') = " + "'" + dataConsulta + "') ";
    } else {
        where =
            "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") "+
                "AND (idMedicoConsulta = " + req.query.idMedico + ") "+
                "AND (Date_Format(dataConsulta,'%Y-%m-%d') = " + "'" + dataConsulta + "') ";
    };

    let sql =   "SELECT " + 
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

    connection.query(sql, 
        function(err, rows) {
            if (err) throw err;
            res.json(rows);
        }
    );
});

router.get('/paciente/:idPacienteConsulta', (req, res) => {
    let idPacienteConsulta: string = req.params.idPacienteConsulta;

    // let sql =   "SELECT * "+
    //             "FROM awConsultas "+
    //             "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") "+
    //               "AND (idPacienteConsulta = " + "'" + idPacienteConsulta + "') " + 
    //             "ORDER BY idConsulta";

    let sql = "SELECT " + 
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
            "WHERE (idEmpresaConsulta = " + req.query.idEmpresa + ") "+
                    "AND (idPacienteConsulta = " + "'" + idPacienteConsulta + "') " + 
            "ORDER BY dataConsulta DESC, horaConsulta DESC";

    connection.query(sql, 
        function(err, rows) {
            if (err) throw err;
            res.json(rows);
        }
    );
});
    
router.post('/', (req, res) => {
    var c = req.body;
    var sql = 'insert into '   +
                    'awConsultas (' + 
                        'idPacienteConsulta, idEmpresaConsulta, idMedicoConsulta, dataConsulta, horaConsulta, queixaPrincipalConsulta, ' +
                        'pesoConsulta, alturaConsulta, cabecaConsulta, historiaDoencaAtualConsulta, exameFisicoConsulta, ' +
                        'hipoteseDiagnosticaConsulta, condutaConsulta, prescricaoConsulta )'  +
                'values (' +
                        ' ?,?,?,?, ?,?,?,?, ?,?,?, ?,?,?)';
    
    connection.query(sql, [ c.idPacienteConsulta, c.idEmpresaConsulta, c.idMedicoConsulta, c.dataConsulta, c.horaConsulta, c.queixaPrincipalConsulta,
        c.pesoConsulta, c.alturaConsulta, c.cabecaConsulta, c.historiaDoencaAtualConsulta, c.exameFisicoConsulta, c.hipoteseDiagnosticaConsulta, 
        c.condutaConsulta, c.prescricaoConsulta ], 
        function(err, rows, fields) {
            if (err) throw err;
        res.json(rows);
    });
});

router.delete('/:idConsulta', (req, res) => {
    connection.query('delete from awConsultas where idConsulta = ?',[req.params.idConsulta], 
        function(err, rows, fields) {
            if (err) throw err;
            res.end('Deletado')
        }
    );
})

router.put('/', (req, res) => {
    var c = req.body;

    var sql =   'update awConsultas set ' + 
                    'queixaPrincipalConsulta=?, pesoConsulta=?, alturaConsulta=?, ' +
                    'cabecaConsulta=?, historiaDoencaAtualConsulta=?, exameFisicoConsulta=?, ' +
                    'hipoteseDiagnosticaConsulta=?, condutaConsulta=?, prescricaoConsulta=? ' +
                'where idConsulta=?';

    connection.query(sql, [ c.queixaPrincipalConsulta, c.pesoConsulta, c.alturaConsulta, 
                            c.cabecaConsulta, c.historiaDoencaAtualConsulta, c.exameFisicoConsulta,
                            c.hipoteseDiagnosticaConsulta, c.condutaConsulta, c.prescricaoConsulta, 
                            c.idConsulta ], 
        function(err, rows, fields) {
            if (err) throw err;
            res.json(rows);
        }
    );
});

router.put('/remarcacao', (req, res) => {
    var c = req.body;
    var sql =   'update awConsultas set ' + 
                    'idMedicoConsulta=?, dataConsulta=?, horaConsulta=? ' +
                'where idConsulta=?';

    connection.query(sql, [ c.idMedicoConsulta, c.dataConsulta, c.horaConsulta, c.idConsulta ], 
        function(err, rows, fields) {
            if (err) throw err;
            res.json(rows);
        }
    );
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