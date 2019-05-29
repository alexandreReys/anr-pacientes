import * as express from 'express';

const connection = require('./mysql-connection');

const router = express.Router();

router.get('/', (req, res) => {
    connection.query('select * from medicos order by nomeMedico', function(err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/:nomeMedico', (req, res) => {
    let nomeMedico: string = req.params.nomeMedico;

    let sql = "SELECT * FROM medicos WHERE nomeMedico LIKE " + "'%" + nomeMedico + "%'" + " ORDER BY nomeMedico";
    connection.query(sql, 
        function(err, rows) {
            if (err) throw err;
            res.json(rows);
        }
    );
});
router.get('/id/:idMedico', (req, res) => {
    let idMedico: string = req.params.idMedico;
    let sql = "select * from medicos WHERE idMedico = " + idMedico;
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
                    'medicos (' + 
                        'nomeMedico, telefoneMedico, enderecoMedico, numeroMedico, complementoMedico, ' +
                        'bairroMedico, cidadeMedico, estadoMedico, cepMedico, crmMedico, especialidadeMedico )'  +
                    'values (' +
                        '?,?,?,?,?,  ?,?,?,?,?,  ? )';

    connection.query(sql, [ c.nomeMedico, c.telefoneMedico, c.enderecoMedico, c.numeroMedico, c.complementoMedico,
                            c.bairroMedico, c.cidadeMedico, c.estadoMedico, c.cepMedico, c.crmMedico, c.especialidadeMedico ], 
        function(err, rows, fields) {
            if (err) throw err;
            res.json(rows);
        }
    );
});

router.delete('/:id', (req, res) => {
    connection.query('DELETE FROM medicos WHERE idMedico = ?',[req.params.id], function(err, rows, fields) {
        if (err) throw err;
        res.end('Deletado')
    });
})

router.put('/', (req, res) => {
    var c = req.body;
    var sql = 'update medicos set ' + 
                'nomeMedico=?, telefoneMedico=?, enderecoMedico=?, numeroMedico=?, complementoMedico=?, bairroMedico=?, ' +
                'cidadeMedico=?, estadoMedico=?, cepMedico=?, crmMedico=?, especialidadeMedico=? '  +
                'where idMedico=?';

    connection.query(sql, [ c.nomeMedico, c.telefoneMedico, c.enderecoMedico, c.numeroMedico, c.complementoMedico, c.bairroMedico, 
                            c.cidadeMedico, c.estadoMedico, c.cepMedico, c.crmMedico, c.especialidadeMedico, c.idMedico ], 
    function(err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});

// router.post('/', controller.postAutocom)
// router.get('/cnpj/:cnpj', controller.getAutocomCnpj);

module.exports = router;