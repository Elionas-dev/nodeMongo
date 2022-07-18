const router = require('express').Router();
const Job = require('../models/Job');

// Create - criação
router.post('/', async (req, res) => {

    //req.body
    const {company,office,salary,approved} = req.body;

    const job = {
        company,
        office,
        salary,
        approved
    };

    if(!job) {
        res.status(422).json({error: 'O nome é obrigatório!'});
        return
    };

    try{
        // criando dados
        await Job.create(job)

        res.status(201).json({message: 'Job inserido com sucesso!!!'});
    }
    catch(error){
        res.status(500).json({error: error});
    }

});

// Read - leitura de dados

router.get('/', async (req, res) => {

    try{
        const jobs = await Job.find();

        res.status(200).json(jobs);

    } catch(error) {
        res.status(500).json({error: error});
    }

});

router.get('/:id', async (req, res) => {

    // extrair o dado da requisição, pela url = req.params
    const id = req.params.id;

    try{
        const job = await Job.findOne({_id: id});

        if(!job){
            res.status(422).json({message: 'Não foi encontrado!!!'});
            return
        }

        res.status(200).json(job);
    }catch(error) {
        res.status(500).json({error: error});
    }


});

// Update - atualização de dados (PUT, PACH)

router.patch('/:id', async (req,res) => {

    const id = req.params.id;
    const {company,office,salary,approved} = req.body;

    const job = {
        company,
        office,
        salary,
        approved
    };

    try {
        const updatedJob = await Job.updateOne({_id: id}, job);

        if(updatedJob.matchedCount === 0) {
            res.status(422).json({message: 'Não foi encontrado.'});
            return
        }

        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({error: error});
    }

});

// Delete - deletar dados

router.delete('/:id', async (req, res) =>{
 
    const id = req.params.id;
    const job = await Job.findOne({_id: id});

    if(!job){
        res.status(422).json({message: 'Não foi encontrado!!!'});
        return
    }

    try{
        await Job.deleteOne({_id: id});

        res.status(200).json({message: 'Removido com sucesso!!!'});
    }catch(error){
        res.status(500).json({error: error});
    }

});

module.exports = router;