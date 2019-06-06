import * as express from 'express';

const connection = require('./mysql-connection');

const router = express.Router();

router.get('/', (req, res) => {
    connection.query('select * from awContatos order by nome', function(err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});

router.get('/:nome', (req, res) => {
    let sNome: string = req.params.nome;
    let sql = "SELECT * FROM awContatos WHERE nome LIKE " + "'%" + sNome + "%'" + " ORDER BY nome";
    connection.query(sql, 
      function(err, rows) {
        if (err) throw err;
        res.json(rows);
      }
    );
});

router.get('/codigo/:codigo', (req, res) => {
    let sCodigo: string = req.params.codigo;
    let sql = "SELECT * FROM awContatos WHERE codigo = " + "'" + sCodigo + "'";
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
                    'awContatos (' + 
                        'codigo, nome, telefone, endereco, numero, complemento, ' +
                        'bairro, cidade, estado, cep, paiNome, paiTelefone, ' +
                        'paiProfissao, maeNome, maeTelefone, maeProfissao )'  +
                    'values (' +
                        '?,?,?,?, ?,?,?,?, ?,?,?,? ,?,?,?,? )';

    connection.query(sql, [ c.codigo, c.nome, c.telefone, c.endereco, c.numero, c.complemento,
                            c.bairro, c.cidade, c.estado, c.cep, c.paiNome, c.paiTelefone, 
                            c.paiProfissao, c.maeNome, c.maeTelefone, c.maeProfissao ], 
        function(err, rows, fields) {
            if (err) throw err;
            res.json(rows);
        }
    );
});

router.delete('/:codigo', (req, res) => {
    connection.query('delete from awContatos where codigo = ?',[req.params.codigo], function(err, rows, fields) {
        if (err) throw err;
        res.end('Deletado')
    });
})

router.put('/', (req, res) => {
    var c = req.body;
    var sql = 'update awContatos set ' + 
                'nome=?, telefone=?, endereco=?, numero=?, complemento=?, ' +
                'bairro=?, cidade=?, estado=?, cep=?, paiNome=?, paiTelefone=?, ' +
                'paiProfissao=?, maeNome=?, maeTelefone=?, maeProfissao=? '  +
                'where codigo=?';

    connection.query(sql, [ c.nome, c.telefone, c.endereco, c.numero, c.complemento,
                            c.bairro, c.cidade, c.estado, c.cep, c.paiNome, c.paiTelefone, 
                            c.paiProfissao, c.maeNome, c.maeTelefone, c.maeProfissao, c.codigo ], 
    function(err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});

// router.post('/', controller.postAutocom)
// router.get('/cnpj/:cnpj', controller.getAutocomCnpj);

module.exports = router;