import * as express from 'express';

const connection = require('./mysql-connection');

const router = express.Router();

router.get('/', (req, res) => {
    let sql = "SELECT " + 
                    "idConsulta, idPaciente, dataConsulta, horaConsulta, motivoConsulta, " + 
                    "pesoConsulta, alturaConsulta, cabecaConsulta, infoConsulta, " + 
                    "prescricaoConsulta, " + 
                    "Date_Format(dataConsulta,'%d/%m/%Y') dataConsultaFrm, " +
                    "ct.nome,  ct.maeNome, ct.paiNome, ct.telefone " +
                "FROM awConsultas " +
                    "INNER JOIN awContatos ct " +
                        "ON awConsultas.idPaciente = ct.id " +
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
                    "idConsulta, idPaciente, dataConsulta, horaConsulta, motivoConsulta, " + 
                    "pesoConsulta, alturaConsulta, cabecaConsulta, infoConsulta,prescricaoConsulta, " + 
                    "Date_Format(dataConsulta,'%d/%m/%Y') dataConsultaFrm, " +
                    "ct.nome,  ct.maeNome, ct.paiNome, ct.telefone " +
                "FROM awConsultas " +
                    "INNER JOIN awContatos ct " +
                        "ON awConsultas.idPaciente = ct.id " +
                "WHERE idConsulta = " + "'" + idConsulta + "'" +
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
    let sql =   "SELECT " + 
                    "idConsulta, idPaciente, dataConsulta, horaConsulta, motivoConsulta, " + 
                    "pesoConsulta, alturaConsulta, cabecaConsulta, infoConsulta,prescricaoConsulta, " + 
                    "Date_Format(dataConsulta,'%d/%m/%Y') dataConsultaFrm, " +
                    "ct.nome,  ct.maeNome, ct.paiNome, ct.telefone " +
                "FROM awConsultas " +
                    "INNER JOIN awContatos ct " +
                        "ON awConsultas.idPaciente = ct.id " +
                "WHERE Date_Format(dataConsulta,'%Y-%m-%d') = " + "'" + dataConsulta + "'" +
                "ORDER BY Date_Format(dataConsulta,'%Y-%m-%d'), horaConsulta";  
    connection.query(sql, 
        function(err, rows) {
            if (err) throw err;
            res.json(rows);
        }
    );
});

router.get('/paciente/:idPaciente', (req, res) => {
    let idPaciente: string = req.params.idPaciente;
    let sql = "SELECT * FROM awConsultas WHERE idPaciente = " + "'" + idPaciente + "'" + " ORDER BY idConsulta";
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
                        'idPaciente, dataConsulta, horaConsulta, motivoConsulta, ' +
                        'pesoConsulta, alturaConsulta, cabecaConsulta, infoConsulta, ' +
                        'prescricaoConsulta, dataNascConsulta )'  +
                'values (' +
                        ' ?,?,?,?, ?,?,?,?, ?,?)';
    
    connection.query(sql, [ c.idPaciente, c.dataConsulta, c.horaConsulta, c.motivoConsulta,
        c.pesoConsulta, c.alturaConsulta, c.cabecaConsulta, c.infoConsulta,
        c.prescricaoConsulta, c.dataNascConsulta ], 
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
                    'idPaciente=?, dataConsulta=?, horaConsulta=?, motivoConsulta=?, ' +
                    'pesoConsulta=?, alturaConsulta=?, cabecaConsulta=?, infoConsulta=?, ' +
                    'prescricaoConsulta=?, dataNascConsulta=? '  +
                'where idConsulta=?';

    connection.query(sql, [ c.idPaciente, c.dataConsulta, c.horaConsulta, c.motivoConsulta,
                            c.pesoConsulta, c.alturaConsulta, c.cabecaConsulta, c.infoConsulta,
                            c.prescricaoConsulta, c.dataNascConsulta, c.idConsulta ], 
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