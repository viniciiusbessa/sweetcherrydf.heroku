import db from '../db.js'

import  Sequelize  from 'sequelize';
const { Op, col, fn } = Sequelize;

import { Router } from 'express'

const app = Router();

app.get('/', async (req, resp) => {
    try {
        let r = await db.infod_ssc_item.findAll({
            order: [[ 'vl_item', 'asc' ]],
            attributes: [
                ['id_produto', 'id_do_produto'],
                ['vl_item', 'valor'],
                ['qtd_produto', 'quantidade_do_produto']
            ]
        }); 
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.post('/', async (req, resp) => {
    try {
        
        let { id_do_produto, valor, quantidade_do_produto} = req.body;

        let j = await db.infod_ssc_item.create({
            
            id_produto: id_do_produto,
            vl_item: valor,
            qtd_produto: quantidade_do_produto
           
        })
        resp.send(j);
    
    } catch(j) {
    resp.send({ erro: j.toString() })
    }
})

app.delete('/:id', async (req, resp) => {
    try {
        let { id } = req.params;
        let r = await db.infod_ssc_item.destroy({ where: { id_item: id } })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.put('/:id', async (req, resp) => {
    try{
        let {  id_do_produto, valor, quantidade_do_produto } = req.body;
        let { id } = req.params;

        let b = await db.infod_ssc_item.update(
            {
                id_produto: id_do_produto,
                vl_item: valor,
                qtd_produto: quantidade_do_produto
                
            },
            {
                where: { id_item: id }
            }
        )
        resp.sendStatus(200);
    } catch(b) {
        resp.send({ erro: b.toString() })
    }
})  

export default app;