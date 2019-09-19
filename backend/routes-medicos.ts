import * as express from 'express';

const connection = require('./mysql-connection');

const router = express.Router();

router.get('/', (req, res) => {
    let sql = "SELECT * "+
                "FROM awMedicos "+
                "WHERE (idEmpresa = " + req.query.idEmpresa + ") "+
                "ORDER BY nomeMedico";

    connection.query(sql, 
        function(err, rows, fields) {
            if (err) throw err;
            res.json(rows);
        }
    );
});

router.get('/:nomeMedico', (req, res) => {
    let sql =   "SELECT * "+
                "FROM awMedicos "+
                "WHERE (idEmpresa = " + req.query.idEmpresa + ") " +
                  "AND (nomeMedico LIKE " + "'%" + req.params.nomeMedico + "%') " + 
                "ORDER BY nomeMedico";

    connection.query(sql, 
        function(err, rows) {
            if (err) throw err;
            res.json(rows);
        }
    );
});

router.get('/id/:idMedico', (req, res) => {
    let sql =   "SELECT * "+
                "FROM awMedicos "+
                "WHERE (idEmpresa = " + req.query.idEmpresa + ") " +
                  "AND (idMedico = " + req.params.idMedico + ") ";

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
                    'awMedicos (' + 
                        'idEmpresa, nomeMedico, telefoneMedico, enderecoMedico, numeroMedico, complementoMedico, ' +
                        'bairroMedico, cidadeMedico, estadoMedico, cepMedico, crmMedico, especialidadeMedico )'  +
                    'values (' +
                        '?,?,?,?,?,  ?,?,?,?,?,  ?,? )';

    connection.query(sql, [ c.idEmpresa, c.nomeMedico, c.telefoneMedico, c.enderecoMedico, c.numeroMedico, c.complementoMedico,
                            c.bairroMedico, c.cidadeMedico, c.estadoMedico, c.cepMedico, c.crmMedico, c.especialidadeMedico ], 
        function(err, rows, fields) {
            if (err) throw err;
            res.json(rows);
        }
    );
});

router.delete('/:id', (req, res) => {
    connection.query('DELETE FROM awMedicos WHERE (idMedico = ?)',[req.params.id], function(err, rows, fields) {
        if (err) throw err;
        res.end('Deletado')
    });
})

router.put('/', (req, res) => {
    var c = req.body;
    var sql = 'update awMedicos set ' + 
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