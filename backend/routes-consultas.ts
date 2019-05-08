import * as express from 'express';

const connection = require('./mysql-connection');

const router = express.Router();

router.get('/', (req, res) => {
    connection.query('select * from consultas order by idConsulta', function(err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/paciente/:idPaciente', (req, res) => {
    let idPaciente: string = req.params.idPaciente;
    let sql = "SELECT * FROM consultas WHERE idPaciente = " + "'" + idPaciente + "'" + " ORDER BY idConsulta";
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
                    'consultas (' + 
                        'idPaciente, dataConsulta, horaConsulta, motivoConsulta, ' +
                        'pesoConsulta, alturaConsulta, cabecaConsulta, infoConsulta, ' +
                        'prescricaoConsulta )'  +
                'values (' +
                        ' ?,?,?,?, ?,?,?,?, ?)';
    
    connection.query(sql, [ c.idPaciente, c.dataConsulta, c.horaConsulta, c.motivoConsulta,
        c.pesoConsulta, c.alturaConsulta, c.cabecaConsulta, c.infoConsulta,
        c.prescricaoConsulta ], 
        function(err, rows, fields) {
            if (err) throw err;
        res.json(rows);
    });
});

router.delete('/:idConsulta', (req, res) => {
    connection.query('delete from consultas where idConsulta = ?',[req.params.idConsulta], 
        function(err, rows, fields) {
            if (err) throw err;
            res.end('Deletado')
        }
    );
})

router.put('/', (req, res) => {
    var c = req.body;
    var sql =   'update consultas set ' + 
                    'idPaciente=?, dataConsulta=?, horaConsulta=?, motivoConsulta=?, ' +
                    'pesoConsulta=?, alturaConsulta=?, cabecaConsulta=?, infoConsulta=?, ' +
                    'prescricaoConsulta=? '  +
                'where idConsulta=?';

    connection.query(sql, [ c.idPaciente, c.dataConsulta, c.horaConsulta, c.motivoConsulta,
                            c.pesoConsulta, c.alturaConsulta, c.cabecaConsulta, c.infoConsulta,
                            c.prescricaoConsulta ], 
        function(err, rows, fields) {
            if (err) throw err;
            res.json(rows);
        }
    );
});

// router.get('/:nome', (req, res) => {
//     let sNome: string = req.params.nome;
//     let sql = "SELECT * FROM consultas WHERE nome LIKE " + "'%" + sNome + "%'" + " ORDER BY nome";
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