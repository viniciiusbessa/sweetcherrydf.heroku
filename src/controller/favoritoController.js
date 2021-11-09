import db from '../db.js'


import express from 'express'
const Router = express.Router
const app = Router();
import Sequelize from 'sequelize';
const { Op, col, fn } = Sequelize;

app.get('/', async (req, resp) => {
    try {
        let r = await db.infod_ssc_favoritos.findAll({
            where: {id_cliente: Number(req.query.cliente)},
            attributes: [
                ['id_favorito', 'id_favorito'],
                [col('id_produto_infod_ssc_produto.id_produto'), 'id'],
                [col('id_produto_infod_ssc_produto.nm_produto'), 'produto'],
                [col('id_produto_infod_ssc_produto.vl_produto'), 'preco'],
                [col('id_produto_infod_ssc_produto.nm_categoria'), 'categoria'],
                [col('id_produto_infod_ssc_produto.ds_avaliacao'), 'avaliacao'],
                [col('id_produto_infod_ssc_produto.ds_produto'), 'descricao'],
                [col('id_produto_infod_ssc_produto.qtd_disponivel_estoque'), 'estoque'],
                [col('id_produto_infod_ssc_produto.ds_imagem'), 'imagem']
            ],
            order: [
                ['id_favorito', 'desc']
            ],
            include: [
                {
                    model: db.infod_ssc_produto,
                    as: 'id_produto_infod_ssc_produto',
                    required: true
                }
            ]
        });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


app.post('/', async (req, resp) => {
    try {
        
        let { cliente, produto } = req.body;

        let b = await db.infod_ssc_favoritos.create({
            id_cliente: cliente,
            id_produto: produto
        })
        resp.send(b);
    
    } catch(b) {
        resp.send({ erro: b.toString() })
    }
})

app.delete('/:id' , async ( req, resp ) => {
    try {
        let { id } = req.params;
        let r = await db.infod_ssc_favoritos.destroy({ where: { id_favorito: id } })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.put('/:id', async (req, resp) => {
    try{
        let { id_cliente, id_produto } = req.body;
        let { id } = req.params;

        let b = await db.infod_ssc_favoritos.update(
            { 
                id_cliente: id_cliente,
                id_produto: id_produto

            },
            {
                where: { id_favorito: id }
            }
        )
        resp.sendStatus(200);
    } catch(b) {
        resp.send({ erro: b.toString() })
    }
})  

export default app;