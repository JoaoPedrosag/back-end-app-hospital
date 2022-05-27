const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(express.urlencoded({ extended: false })); /// apenas dados simples
app.use(express.json());








/// rotas
const routePatient = require('./routes/patient');
const routeDoctors = require('./routes/doctors');
const routeUsers = require('./routes/users');



app.use(cors());

app.use(morgan('dev'));
app.use('/patient', routePatient);
app.use('/doctors', routeDoctors);
app.use('/users', routeUsers);


/// Quando não encontra a rota
app.use((req, res, next) => {
    const erro = new Error('Not found');
    erro.status = 404;
    next(erro);
});


app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            message: error.message
        }
    });
});



module.exports = app;
