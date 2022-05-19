const express = require('express');
const router = express.Router();
const mysql = require('../mysql/mysql').pool;


/// Retorna todos os medicos
router.get('/', (req, res, next) => { 
    
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error }) }
        conn.query(
            'SELECT * FROM medicos;',
            (error, result, field) => {
                if(error) { return res.status(500).send({ error: error }) }

                const response = {
                    quantity: result.lenght,
                    doctors: result.map(doctors => {
                    return {
                        id_doctors: doctors.id_medicos,
                        nome_medico: doctors.nome_medico,
                        especialidade: doctors.especialidade,                      
                        
                    }   
                    })
                 };
                return res.status(200).send({response});
              
            }
        );
    });
    
});
/// Insere um medico
router.post('/', (req,res, next) => {  

    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO app_hospital.medicos (nome_medico, especialidade) VALUES (?, ?)',
            [req.body.nome_medico, req.body.especialidade],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error }) }
                
                    res.status(201).send({
                        message: 'Médico inserido com sucesso',
                        id_medicos: result.insertId,
                    });
                
            }
        )
    });
   
});



module.exports = router;