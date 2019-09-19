import * as express from 'express';

const connection = require('./mysql-connection');

const router = express.Router();

router.get('/id/:idEmpresa', (req, res) => {
    let sql =   "SELECT * "+
                "FROM awEmpresas "+
                "WHERE (idEmpresa = " + req.params.idEmpresa + ")";
    connection.query(sql, 
        function(err, rows) {
            if (err) throw err;
            res.json(rows);
        }
    );
});

// router.post('/', controller.postAutocom)
// router.get('/cnpj/:cnpj', controller.getAutocomCnpj);

module.exports = router;