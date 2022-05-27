const express = require('express');
const router = express.Router();
const mysql = require('../mysql/mysql').pool;
const bcrypt = require('bcrypt');

router.post('/cadastro', (req, res) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if(errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
            conn.query(
                `INSERT INTO usuarios (email, senha) VALUES (?, ?)`,
                [req.body.email, hash],
                (error, results) => {
                    conn.release();
                    response = {
                        message: 'Usuário cadastrado com sucesso',
                        usuarioCriado: {
                            id_usuario: results.insertId,
                            email: req.body.email,
                        }
                    }
                    if(error) { return res.status(500).send({ error: error }) }
                    return res.status(201).send({response});
                }
            );
        })

    });
})


module.exports = router;