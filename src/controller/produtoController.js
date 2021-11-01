import db from '../db.js'


import  Sequelize  from 'sequelize';
const { Op, col, fn } = Sequelize;

import express from 'express'
const Router = express.Router
const app = Router();


app.get('/', async (req, resp) => {
    try {
        let r = await db.infod_ssc_produto.findAll({
            order: [[ 'id_produto', 'desc' ]],
            attributes: [
                ['id_produto', 'id'],
                ['nm_produto', 'produto'],
                ['vl_produto', 'preco'],
                ['nm_categoria', 'categoria'],
                ['ds_avaliacao', 'avaliacao'],
                ['ds_produto', 'descricao'],
                ['qtd_disponivel_estoque', 'estoque'],
                ['ds_imagem', 'imagem']
            ]
        });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.post('/', async (req, resp) => {
    try {
        
        let { nome, preco, categoria, avaliacao, descricao, estoque, imagem } = req.body;

        if (nome === ''  || preco === ''  || descricao === '' || imagem === '')
            return resp.send({ erro: 'Preencha todos os campos!' })

        let b = await db.infod_ssc_produto.create({
            nm_produto: nome,
            vl_produto: preco,
            nm_categoria: categoria,
            ds_avaliacao: avaliacao,
            ds_produto: descricao,
            qtd_disponivel_estoque: estoque,
            ds_imagem: imagem
        })
        resp.send(b);
    
    } catch(b) {
        resp.send({ erro: b.toString() })
    }
})

app.delete('/:id', async (req, resp) => {
    try {
        let { id } = req.params;
        let r = await db.infod_ssc_produto.destroy({ where: { id_produto: id } })
        resp.sendStatus(200);
        
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.put('/:id', async (req, resp) => {
    try{
        let { nome, preco, categoria, avaliacao, descricao, estoque, imagem } = req.body;
        let { id } = req.params;

        let b = await db.infod_ssc_produto.update(
            {
                nm_produto: nome,
                vl_produto: preco,
                nm_categoria: categoria,
                ds_avaliacao: avaliacao,
                ds_produto: descricao,
                qtd_disponivel_estoque: estoque,
                ds_imagem: imagem
            },
            {
                where: { id_produto: id }
            }
        )
        resp.sendStatus(200);
    } catch(b) {
        resp.send({ erro: b.toString() })
    }
})








app.get('/cate', async (req, resp) => {
    try {
        let produtos;
        if (req.query.categoria) {
            produtos = await db.infod_ssc_produto.findAll({ 
                where: {
                    nm_categoria: req.query.categoria
                },
                order: [[ 'id_produto', 'desc' ]],
                attributes: [
                    ['id_produto', 'id'],
                    ['nm_produto', 'produto'],
                    ['vl_produto', 'preco'],
                    ['nm_categoria', 'categoria'],
                    ['ds_avaliacao', 'avaliacao'],
                    ['ds_produto', 'descricao'],
                    ['qtd_disponivel_estoque', 'estoque'],
                    ['ds_imagem', 'imagem']
                ] 
            });
        } else {
            produtos = await db.infod_ssc_produto.findAll({
                order: [[ 'id_produto', 'desc' ]] 
            });
        }

        resp.send(produtos);

    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})
  

app.get('/v3', async (req, resp) => {
    let page = req.query.page || 0;
    if (page <= 0) page = 1;

    const itemsPerPage = 6;
    const skipItems    = (page-1) * itemsPerPage;

    const produtos = await db.infod_ssc_produto.findAll({
        where: {
            nm_categoria: req.query.categoria
        },
        limit: itemsPerPage,
        offset: skipItems,
        order: [[ 'nm_produto', 'asc' ]],
        attributes: [
            ['id_produto', 'id'],
            ['nm_produto', 'produto'],
            ['ds_produto', 'descricao'],
            ['vl_produto', 'preco'],
            ['ds_produto', 'imagem']
        ]
    });

    const total = await db.infod_ssc_produto.findOne({
        raw: true,
        attributes: [
            [fn('count', 1), 'qtd']
        ]
        });

        resp.send({
            items: produtos,
            total: total.qtd,
            totalPaginas: Math.ceil(total.qtd/6),
            pagina: Number(page)
        });
})


export default app;