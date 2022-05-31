const mysql = require('../mysql/mysql').pool;
const login = require('../middleware/login');

exports.insertPatient = login.obrigatorio, (req,res, next) => {  

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
};

exports.getAllPacients =  login.obrigatorio, (req, res, next) => { 
    
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
    
}
