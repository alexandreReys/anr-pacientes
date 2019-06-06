import * as express from 'express';

const connection = require('./mysql-connection');

const router = express.Router();

router.get('/', (req, res) => {
    connection.query('select * from awConsultas order by idConsulta', function(err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
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
                            c.prescricaoConsulta, c.dataNascConsulta ], 
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