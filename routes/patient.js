const express = require('express');
const router = express.Router();
const mysql = require('../mysql/mysql').pool;


/// Retorna todos os pacientes
router.get('/', (req, res, next) => { 
    
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({error: error }) }
        conn.query(
            'SELECT * FROM patients;',
            (error, result, field) => {
                if(error) { return res.status(500).send({ error: error }) }

                const response = {
                    quantity: result.lenght,
                    patients: result.map(patient => {
                    return {
                        id_patient: patient.id_patients,
                        nome: patient.nome,
                        nome_da_mae: patient.nome_da_mae,
                        data_de_nascimento: patient.data_de_nascimento,
                        endereco: patient.endereco,
                        data_cadastro: patient.data_cadastro,
                        
                    }   
                    })
                 };
                return res.status(200).send({response});
              
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
                        id_patient: result.insertId,
                    });
                
            }
        )
    });
   
});



/// Retorna os dados de um paciente
router.get('/:id_patient', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM patients WHERE id_patients = ?;',
            [req.params.id_patient],
            (error, result, field) => {
                return res.status(200).send({
                    response: result       
                });
            }
        );
    });
});


/// Atualiza os dados de um paciente
router.patch('/', (req,res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE patients 
            SET nome = ?, 
            nome_da_mae = ?, 
            data_nascimento = ?,
            endereco = ?
            WHERE id_patients = ?`,
            
            
            [
                req.body.nome,
                req.body.nome_da_mae,
                req.body.data_nascimento,
                req.body.endereco,
                req.body.id_patients],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error }) }
                
                    res.status(202).send({
                        message: 'Paciente alterado com sucesso',
                        
                    });
                
            }
        )
    });
});
/// Deleta um paciente
router.delete('/', (req,res, next) => {
    mysql.getConnection((error, conn) => {
        if(error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM patients WHERE id_patients = ?`,           
            
            [req.body.id_patients],
            (error, result, field) => {
                conn.release();
                if(error) { return res.status(500).send({ error: error }) }
                
                    res.status(202).send({
                        message: 'Paciente deletado com sucesso',
                        
                    });
                
            }
        )
    });


});


module.exports = router;