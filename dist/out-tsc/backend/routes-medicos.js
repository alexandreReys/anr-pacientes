import * as express from 'express';
var connection = require('./mysql-connection');
var router = express.Router();
router.get('/', function (req, res) {
    console.log('get /');
    connection.query('select * from medicos order by nomeMedico', function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.get('/:idMedico', function (req, res) {
    var idMedico = req.params.idMedico;
    console.log(idMedico);
    var sql = "select * from medicos WHERE idMedico = " + "'" + idMedico + "'";
    connection.query(sql, function (err, rows) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.post('/', function (req, res) {
    var c = req.body;
    var sql = 'insert into ' +
        'medicos (' +
        'nomeMedico, telefoneMedico, enderecoMedico, numeroMedico, complementoMedico, ' +
        'bairroMedico, cidadeMedico, estadoMedico, cepMedico, crmMedico, especialidadeMedico )' +
        'values (' +
        '?,?,?,?,?,  ?,?,?,?,?,  ? )';
    connection.query(sql, [c.nomeMedico, c.telefoneMedico, c.enderecoMedico, c.numeroMedico, c.complementoMedico,
        c.bairroMedico, c.cidadeMedico, c.estadoMedico, c.cepMedico, c.crmMedico, c.especialidadeMedico], function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.delete('/:id', function (req, res) {
    connection.query('delete from medicos where idMedico = ?', [req.params.idMedico], function (err, rows, fields) {
        if (err)
            throw err;
        res.end('Deletado');
    });
});
router.put('/', function (req, res) {
    var c = req.body;
    var sql = 'update medicos set ' +
        'nomeMedico=?, telefoneMedico=?, enderecoMedico=?, numeroMedico=?, complementoMedico=?, bairroMedico=?, ' +
        'cidadeMedico=?, estadoMedico=?, cepMedico=?, crmMedico=?, especialidadeMedico=? ' +
        'where idMedico=?';
    connection.query(sql, [c.nomeMedico, c.telefoneMedico, c.enderecoMedico, c.numeroMedico, c.complementoMedico, c.bairroMedico,
        c.cidadeMedico, c.estadoMedico, c.cepMedico, c.crmMedico, c.especialidadeMedico, c.idMedico], function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
// router.post('/', controller.postAutocom)
// router.get('/cnpj/:cnpj', controller.getAutocomCnpj);
module.exports = router;
//# sourceMappingURL=routes-medicos.js.map