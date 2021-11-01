import db from '../db.js'

import  Sequelize  from 'sequelize';
const { Op, col, fn } = Sequelize;

import express from 'express'
const Router = express.Router
const app = Router();

app.get('/', async (req, resp) => {
    try {
        let r = await db.infod_ssc_venda.findAll( );
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.post('/', async (req, resp) => {
    try {
        
        let { id_cliente, id_endereco_entrega, descricao_da_entrega, descricao_do_frete, nome_do_destinatario, forma_pagamento, data_da_venda, descricao_do_pagamento, numero_do_cartao, quantidade_de_parcelas, descricao_codigo_seguranca } = req.body;

        let j = await db.infod_ssc_venda.create({

            id_cliente: id_cliente,
            id_endereco_entrega: id_endereco_entrega,
            ds_entrega: descricao_da_entrega ,
            ds_frete: descricao_do_frete,
            nm_destinatario: nome_do_destinatario,
            tp_forma_pagamento: forma_pagamento,
            dt_venda: data_da_venda,
            ds_pagamento: descricao_do_pagamento,
            nr_cartao: numero_do_cartao,
            qtd_parcelas: quantidade_de_parcelas,
            ds_codigo_seguranca: descricao_codigo_seguranca

        })
        resp.send(j);
    
} catch(j) {
    resp.send({ erro: j.toString() })
}
})

app.put('/:id', async (req, resp) => {
    try{
        let {  id_cliente, id_endereco_entrega, descricao_da_entrega, descricao_do_frete, nome_do_destinatario, forma_pagamento, data_da_venda, descricao_do_pagamento, numero_do_cartao, quantidade_de_parcelas, descricao_codigo_seguranca } = req.body;
        let { id } = req.params;

        let b = await db.infod_ssc_venda.update(
            {
                
            id_cliente: id_cliente,
            id_endereco_entrega: id_endereco_entrega,
            ds_entrega: descricao_da_entrega ,
            ds_frete: descricao_do_frete,
            nm_destinatario: nome_do_destinatario,
            tp_forma_pagamento: forma_pagamento,
            dt_venda: data_da_venda,
            ds_pagamento: descricao_do_pagamento,
            nr_cartao: numero_do_cartao,
            qtd_parcelas: quantidade_de_parcelas,
            ds_codigo_seguranca: descricao_codigo_seguranca
            
            },
            {
                where: { id_venda: id }
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
        let r = await db.infod_ssc_venda.destroy({ where: { id_venda: id } })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

export default app;