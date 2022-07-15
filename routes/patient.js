const express = require('express');
const router = express.Router();
const mysql = require('../mysql/mysql');
const login = require('../middleware/login');

/// Retorna todos os pacientes
router.get('/', login.obrigatorio, (req, res, next) => { 
    
    const conn = mysql.connect();
        
        conn.query(
            'SELECT * FROM hospital.patients;',

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
                        idade: patient.idade,
                        
                    }   
                    })
                 };
                return res.status(200).send({response});
              
            }
        );
    
    
});


/// Insere um paciente
router.post('/',  login.obrigatorio, (req,res, next) => {  

    
        const conn = mysql.connect();
        conn.query(
            'INSERT INTO patients (nome, nome_da_mae, data_nascimento, endereco, idade) VALUES (?, ?, ?, ?, ?)',
            [req.body.nome, req.body.nome_da_mae, req.body.data_nascimento, req.body.endereco, req.body.idade],
            (error, result, field) => {
                conn.end();
                if(error) { return res.status(500).send({ error: error }) }
                
                    res.status(201).send({
                        message: 'Paciente inserido com sucesso',
                        id_patient: result.insertId,
                    });
                
            }
        )
    
   
});



/// Retorna os dados de um paciente
router.get('/:id_patient',  login.obrigatorio, (req, res, next) => {
    const conn = mysql.connect();
      
        conn.query(
            'SELECT * FROM patients WHERE id_patients = ?;',
            [req.params.id_patient],
            (error, result, field) => {
                conn.end();
                return res.status(200).send({
                    response: result       
                });
            }
        );
    
});


/// Atualiza os dados de um paciente
router.patch('/',  login.obrigatorio, (req,res, next) => {
    
    const conn = mysql.connect();
        conn.query(
            'UPDATE patients SET nome = ?,nome_da_mae = ?,data_nascimento = ?,endereco = ?,idade = ? WHERE id_patients = ?;',            
            [
                req.body.nome,
                req.body.nome_da_mae,
                req.body.data_nascimento,
                req.body.endereco,
                req.body.idade,
                req.body.id_patients],
            (error, result, field) => {
                conn.end();
                if(error) { return res.status(500).send({ error: error }) }
                
                    res.status(202).send({
                        message: 'Paciente alterado com sucesso',
                        
                    });
                
            }
        )
    
});
/// Deleta um paciente
router.delete('/',  login.obrigatorio, (req,res, next) => {
    const conn = mysql.connect();
        conn.query(
            `DELETE FROM patients WHERE id_patients = ?`,           
            
            [req.body.id_patients],
            (error, result, field) => {
                conn.end();
                if(error) { return res.status(500).send({ error: error }) }
                
                    res.status(202).send({
                        message: 'Paciente deletado com sucesso',
                        
                    });
                
            }
        )
    


});


module.exports = router;