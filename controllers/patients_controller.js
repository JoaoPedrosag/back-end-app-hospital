const mysql = require('../mysql/mysql');
const login = require('../middleware/login');

exports.insertPatient = login.obrigatorio, (req,res, next) => {  
    const {nome, nome_da_mae, data_nascimento, endereco, idade} = req.body;
    const conn = mysql.connect();
        conn.query(
            'INSERT INTO app_hospital.patients (nome, nome_da_mae, data_nascimento, endereco, data_cadastro) VALUES (?, ?, ?, ?, ?)',
            [nome, nome_da_mae, data_nascimento, endereco, data_cadastro, idade],
            (error, result, field) => {
                
                if(error) { return res.status(500).send({ error: error }) }
                
                    res.status(201).send({
                        message: 'Paciente inserido com sucesso',
                        id_patient: result.insertId,
                    });
                        conn.end();
            }
            
    )
    
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
