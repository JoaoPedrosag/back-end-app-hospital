const express = require('express');
const router = express.Router();
const mysql = require('../mysql/mysql');


/// Retorna todos os medicos
router.get('/', (req, res, next) => { 
    
    const conn = mysql.connect();
        
        conn.query(
            'SELECT * FROM medicos;',
            (error, result, field) => {
                conn.end();
                if(error) { return res.status(500).send({ error: error }) }

                const response = {
                    quantity: result.lenght,
                    doctors: result.map(doctors => {
                    return {
                        id_doctors: doctors.id_medicos,
                        nome_medico: doctors.nome_medico,
                        crm: doctors.crm,
                        especialidade: doctors.especialidade,                      
                        
                    }   
                    })
                 };
                return res.status(200).send({response});
              
            }
        );
    
    
});
/// Insere um medico
router.post('/', (req,res, next) => {  

    const conn = mysql.connect();
       
        conn.query(
            'INSERT INTO medicos (nome_medico, crm, especialidade) VALUES (?, ?, ?)',
            [req.body.nome_medico,req.body.crm, req.body.especialidade],
            (error, result, field) => {
                conn.end();
                if(error) { return res.status(500).send({ error: error }) }
                
                    res.status(201).send({
                        message: 'Médico inserido com sucesso',
                        id_medicos: result.insertId,
                    });
                
            }
        )
    
   
});



module.exports = router;