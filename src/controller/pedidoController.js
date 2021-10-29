import db from '../db.js'

import  Sequelize  from 'sequelize';
const { Op, col, fn } = Sequelize;

import { Router } from 'express'

const app = Router();

app.get('/', async (req, resp) => {
    try {
        let r = await db.infod_ssc_pedido.findAll({
            order: [[ 'id_venda', 'asc' ]],
            attributes: [
                ['id_venda', 'id da venda'],
                ['id_item', 'id do item'],
                ['vl_pedido', 'valor do pedido'],
                ['dt_pedido', 'data do pedido'],
                ['ds_entregue', 'descricao da entrega'],
                ['ds_acaminho', 'descricao do caminho'],
                ['ds_preparando', 'descricao do preparo']
            ]
        });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.post('/', async (req, resp) => {
    try {
        
        let { id_da_venda, id_do_item, valor_pedido, data_do_pedido, descricao_da_entrega, descricao_do_caminho, descricao_do_preparo } = req.body;
        let c = await db.infod_ssc_pedido.create(
         {
            
            id_venda: id_da_venda,
            id_item: id_do_item,
            vl_pedido: valor_pedido,
            dt_pedido: data_do_pedido,
            ds_entregue: descricao_da_entrega,
            ds_acaminho: descricao_do_caminho,
            ds_preparando: descricao_do_preparo        
         })

        resp.send(c);
    
    } catch(c) {
    resp.send({ erro: c.toString() })
    }
})

app.put('/:id', async (req, resp) => {
    try{
        let {   id_da_venda, id_do_item, valor_pedido, data_do_pedido, descricao_da_entrega, descricao_do_caminho, descricao_do_preparo} = req.body;
        let { id } = req.params;

        let b = await db.infod_ssc_pedido.update(
            {
                 
            id_venda: id_da_venda,
            id_item: id_do_item,
            vl_pedido: valor_pedido,
            dt_pedido: data_do_pedido,
            ds_entregue: descricao_da_entrega,
            ds_acaminho: descricao_do_caminho,
            ds_preparando: descricao_do_preparo
               
            },
            {
                where: { id_pedido: id }
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
        let r = await db.infod_ssc_pedido.destroy({ where: { id_pedido: id } })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

export default app;