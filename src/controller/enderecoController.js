import db from '../db.js'

import  Sequelize  from 'sequelize';
const { Op, col, fn } = Sequelize;

import { Router } from 'express'

const app = Router();

app.get('/', async (req, resp) => {
    try {
        let r = await db.infod_ssc_endereco.findAll( );
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.post('/', async (req, resp) => {
    try {
        
        let { endereco, numero_do_endereco, descricao_do_cep, nome_cidade, complemento } = req.body;

        let j = await db.infod_ssc_endereco.create({
            ds_endereco: endereco,
            nr_endereco: numero_do_endereco,
            ds_cep: descricao_do_cep,
            nm_cidade: nome_cidade,
            ds_complemeno: complemento
        })
        resp.send(j);
    
} catch(j) {
    resp.send({ erro: j.toString() })
}
})

app.put('/:id', async (req, resp) => {
    try{
        let {  endereco, numero_do_endereco, descricao_do_cep, nome_cidade, complemento } = req.body;
        let { id } = req.params;

        let b = await db.infod_ssc_endereco.update(
            {
                ds_endereco: endereco,
                nr_endereco: numero_do_endereco,
                ds_cep: descricao_do_cep,
                nm_cidade: nome_cidade,
                ds_complemento: complemento
                
            },
            {
                where: { id_endereco: id }
            }
        )
        resp.sendStatus(200);
    } catch(b) {
        resp.send({ erro: b.toString() })
    }
})  

app.delete('/:id', async (req, resp) => {
    try {
        let { id } = req.params;
        let r = await db.infod_ssc_endereco.destroy({ where: { id_endereco: id } })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

export default app;