import * as express from 'express';

const connection = require('./mysql-connection');

const router = express.Router();

router.get('/', (req, res) => {
    let sql =   "SELECT "+
                    "id, idEmpresa, codigo, nome, telefone, endereco, "+
                    "numero, complemento, bairro, cidade, estado, cep, "+
                    "paiNome, paiTelefone, paiProfissao, maeNome, maeTelefone, "+
                    "maeProfissao, Date_Format(dataNasc,'%d/%m/%Y') dataNasc, "+
                    "sexo, email, certidaoNasc "+
                "FROM awContatos "+
                "WHERE (idEmpresa = " + req.query.idEmpresa + ") "+
                "ORDER BY nome";
    connection.query(sql, 
        function(err, rows, fields) {
            if (err) throw err;
            res.json(rows);
        }
    );
});

router.get('/:nome', (req, res) => {
    let sql =   "SELECT  "+
                    "id, idEmpresa, codigo, nome, telefone, endereco, "+
                    "numero, complemento, bairro, cidade, estado, cep, "+
                    "paiNome, paiTelefone, paiProfissao, maeNome, maeTelefone, "+
                    "maeProfissao, Date_Format(dataNasc,'%d/%m/%Y') dataNasc, "+
                    "sexo, email, certidaoNasc "+
                "FROM awContatos "+
                "WHERE (idEmpresa = " + req.query.idEmpresa + ") "+
                  "AND (nome LIKE " + "'%" + req.params.nome + "%') "+ 
                "ORDER BY nome";

    connection.query(sql, 
      function(err, rows) {
        if (err) throw err;
        res.json(rows);
      }
    );
});

router.get('/codigo/:codigo', (req, res) => {
    let sql = "SELECT * "+
                "FROM awContatos "+
                "WHERE (idEmpresa = " + req.query.idEmpresa + ") "+
                  "AND (codigo = " + "'" + req.params.codigo + "')";

    connection.query(sql, 
      function(err, rows) {
        if (err) throw err;
        res.json(rows);
      }
    );
});

router.get('/id/:id', (req, res) => {
    let sql =   "SELECT * "+
                "FROM awContatos "+
                "WHERE (idEmpresa = " + req.query.idEmpresa + ") "+
                  "AND (id = " + "'" + req.params.id + "')";

    // let sql = "SELECT idConsulta,idPaciente,dataConsulta,horaConsulta," +
    //                     "motivoConsulta,pesoConsulta,alturaConsulta,cabecaConsulta," +
    //                     "infoConsulta,prescricaoConsulta,prescricao2Consulta," +
    //                     "prescricao3Consulta,dataNascConsulta, " +
    //                     "DATE_FORMAT(dataConsulta,'%d/%m/%Y') as dataConsultaF " +
    //           "FROM awContatos " +
    //           "WHERE id = " + "'" + sId + "'";
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
                    'awContatos ( idEmpresa, ' + 
                        'codigo, nome, telefone, endereco, numero, complemento, ' +
                        'bairro, cidade, estado, cep, paiNome, paiTelefone, ' +
                        'paiProfissao, maeNome, maeTelefone, maeProfissao, ' +
                        'dataNasc, sexo, email, certidaoNasc )'  +
                    'values (' +
                        '?, ?,?,?,?, ?,?,?,?, ?,?,?,? ,?,?,?,?, ?,?,?,? )';

    connection.query(sql, [ c.idEmpresa, c.codigo, c.nome, c.telefone, c.endereco, c.numero, c.complemento,
                            c.bairro, c.cidade, c.estado, c.cep, c.paiNome, c.paiTelefone, 
                            c.paiProfissao, c.maeNome, c.maeTelefone, c.maeProfissao,
                            c.dataNasc, c.sexo, c.email, c.certidaoNasc ], 
        function(err, rows, fields) {
            if (err) throw err;
            res.json(rows);
        }
    );
});

router.delete('/:id', (req, res) => {
    connection.query('delete from awContatos where id = ?',[req.params.id], function(err, rows, fields) {
        if (err) throw err;
        res.end('Deletado')
    });
})

router.put('/', (req, res) => {
    var c = req.body;
    
    var sql = 'update awContatos set ' + 
                'nome=?, telefone=?, endereco=?, numero=?, complemento=?, ' +
                'bairro=?, cidade=?, estado=?, cep=?, paiNome=?, paiTelefone=?, ' +
                'paiProfissao=?, maeNome=?, maeTelefone=?, maeProfissao=?, '  +
                'dataNasc=?, sexo=?, email=?, certidaoNasc=?' +
                'where id=?';
    connection.query(sql, [ c.nome, c.telefone, c.endereco, c.numero, c.complemento,
                            c.bairro, c.cidade, c.estado, c.cep, c.paiNome, c.paiTelefone, 
                            c.paiProfissao, c.maeNome, c.maeTelefone, c.maeProfissao,
                            c.dataNasc, c.sexo, c.email, c.certidaoNasc, c.id ], 
    function(err, rows, fields) {
        if (err) throw err;
        res.json(rows);
    });
});

// router.post('/', controller.postAutocom)
// router.get('/cnpj/:cnpj', controller.getAutocomCnpj);

module.exports = router;