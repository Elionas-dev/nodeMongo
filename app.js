// config inicial 

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const port = 3000;
// forma de ler JSON
app.use(
    express.urlencoded({
        extended:true,
    }),
);

app.use(express.json());

// rotas da API
const PersonRoutes = require('./routes/PersonRoutes');
const JobRoutes = require('./routes/JobRouters');

app.use('/person', PersonRoutes);
app.use('/job', JobRoutes);

// rota inicial / endpoint

app.get('/', (req, res) => {
    // mostrar req

    res.json({message: 'Oi parceiro'});
});

// entregar uma porta

mongoose.connect(

    'mongodb://localhost:27017/test'

).then(() => {
    
    console.log('Conectamos o MongoDB');
    app.listen(port)

}).catch((err) => console.log(err));