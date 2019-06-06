"use strict";
exports.__esModule = true;
var express = require("express");
var connection = require('./mysql-connection');
var router = express.Router();
router.get('/', function (req, res) {
    connection.query('select * from awContatos order by nome', function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.get('/:nome', function (req, res) {
    var sNome = req.params.nome;
    var sql = "SELECT * FROM awContatos WHERE nome LIKE " + "'%" + sNome + "%'" + " ORDER BY nome";
    connection.query(sql, function (err, rows) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.get('/codigo/:codigo', function (req, res) {
    var sCodigo = req.params.codigo;
    var sql = "SELECT * FROM awContatos WHERE codigo = " + "'" + sCodigo + "'";
    connection.query(sql, function (err, rows) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router.post('/', function (req, res) {
    var c = req.body;
    var sql = 'insert into ' +
        'awContatos (' +
        'codigo, nome, telefone, endereco, numero, complemento, ' +
        'bairro, cidade, estado, cep, paiNome, paiTelefone, ' +
        'paiProfissao, maeNome, maeTelefone, maeProfissao )' +
        'values (' +
        '?,?,?,?, ?,?,?,?, ?,?,?,? ,?,?,?,? )';
    connection.query(sql, [c.codigo, c.nome, c.telefone, c.endereco, c.numero, c.complemento,
        c.bairro, c.cidade, c.estado, c.cep, c.paiNome, c.paiTelefone,
        c.paiProfissao, c.maeNome, c.maeTelefone, c.maeProfissao], function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
router["delete"]('/:codigo', function (req, res) {
    connection.query('delete from awContatos where codigo = ?', [req.params.codigo], function (err, rows, fields) {
        if (err)
            throw err;
        res.end('Deletado');
    });
});
router.put('/', function (req, res) {
    var c = req.body;
    var sql = 'update awContatos set ' +
        'nome=?, telefone=?, endereco=?, numero=?, complemento=?, ' +
        'bairro=?, cidade=?, estado=?, cep=?, paiNome=?, paiTelefone=?, ' +
        'paiProfissao=?, maeNome=?, maeTelefone=?, maeProfissao=? ' +
        'where codigo=?';
    connection.query(sql, [c.nome, c.telefone, c.endereco, c.numero, c.complemento,
        c.bairro, c.cidade, c.estado, c.cep, c.paiNome, c.paiTelefone,
        c.paiProfissao, c.maeNome, c.maeTelefone, c.maeProfissao, c.codigo], function (err, rows, fields) {
        if (err)
            throw err;
        res.json(rows);
    });
});
// router.post('/', controller.postAutocom)
// router.get('/cnpj/:cnpj', controller.getAutocomCnpj);
module.exports = router;
