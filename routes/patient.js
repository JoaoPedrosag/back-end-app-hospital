const express = require('express');
const router = express.Router();
const mysql = require('./mysql/mysql').pool;


/// Retorna todos os pacientes
router.get('/', (req, res, next) => { 
    
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM patients;',
            (error, result, field) => {
                return res.status(200).send({
                    response: result       
                });
            }
        );
    });
    
});


/// Insere um paciente
router.post('/', (req,res, next) => {  

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO app_hospital.patients (nome, nome_da_mae, data_nascimento, endereco, data_cadastro) VALUES (?, ?, ?, ?, ?)',
            [req.body.nome, req.body.nome_da_mae, req.body.data_nascimento, req.body.endereco, req.body.data_cadastro],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error }) }
                
                    res.status(201).send({
                        message: 'Paciente inserido com sucesso',
                        id_produto: result.insertId,
                    });
                
            }
        )
    });
   
});



/// Retorna os dados de um paciente
router.get('/:id_patient', (req, res, next) => {
    const id = req.params.id_patient;
    if(id === 'special') {
        res.status(200).send({
        message: 'Use the GET request id patient',
        id: id
        });
    } else {res.status(200).send({
        message: 'Use the GET request id patient',
        id: id
    });
}
});


/// Atualiza os dados de um paciente
router.patch('/', (req,res, next) => {
    res.status(201).send({
        message: 'Use the PATH request patient'
    });
});
/// Deleta um paciente
router.delete('/', (req,res, next) => {
    res.status(201).send({
        message: 'Use the Delete request patient'
    })


});


module.exports = router;