const express = require('express');
const router = express.Router();
const mysql = require('../mysql/mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/cadastro', (req, res) => {
    const conn = mysql.connect();
        conn.query('SELECT * FROM hospital.usuarios WHERE email = ?', [req.body.email],
         (error, results) => {
            
            if(error) { return res.status(500).send({ error: error }) }
            if(results.length > 0) {
                return res.status(409).send({ mensagem: 'Usuário já existe' })
            } else {
                bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
                    if(errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                    conn.query(
                        `INSERT INTO usuarios (email, senha) VALUES (?, ?)`,
                        [req.body.email, hash],
                        
                        (error, results) => {
                            conn.end();
                            
                            response = {
                                message: 'Usuário cadastrado com sucesso',
                                usuarioCriado: {
                                   id_usuario: results.insertId,
                                    email: req.body.email,
                                }
                            }
                            if(error) { return res.status(500).send({ error: error }) }
                            return res.status(201).send(response);
                        }
                    
                    );
                })
            }
            
        })
        

    
});

router.post('/login', (req, res, next) => {
    const conn = mysql.connect();
        
        conn.query('SELECT * FROM usuarios WHERE email = ?', [req.body.email], 
        (error, results) => {
            if(results.length < 1) {
                return res.status(404).send({ mensagem: 'Usuário não encontrado' })
            }
            bcrypt.compare(req.body.senha, results[0].senha, (errBcrypt, result) => {
                if(errBcrypt) { return res.status(401).send({ mensagem: 'Falha na autenticação' }) }
                if(result) {
                    const token = jwt.sign({
                        id_usuario: results[0].id_usuario,
                        email: results[0].email
                    },
                    process.env.JWT_KEY, {
                        expiresIn: "1d"
                    });
                    return res.status(200).send({
                        mensagem: 'Sucesso',
                        token: token
                    })
                } 
                    return res.status(401).send({ mensagem: 'Falha na autenticação' })
            })
            conn.end();
        });
    
}) 


module.exports = router;