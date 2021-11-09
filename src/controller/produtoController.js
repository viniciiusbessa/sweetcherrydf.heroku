import db from '../db.js'


import  Sequelize from 'sequelize';
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


        if (nome === '' || preco === ''  || categoria === '' || avaliacao === '' || descricao === '' 
            || estoque === '' || imagem === '')
                return resp.send({ erro: 'Preencha todos os campos!' })


        if (nome.length <= 4)
            return resp.send({ erro: ' Insira mais que 4 caracteres no campo Nome!' })

        if (categoria.length <= 4)
            return resp.send({ erro: ' Insira mais que 4 caracteres no campo Categoria!' })

        if (descricao.length <= 10)
            return resp.send({ erro: ' Insira mais que 10 caracteres no campo Descrição!' })


        if (imagem.length <= 30 || !imagem.includes('https'))
            return resp.send({ erro: ' Insira um link válido no campo Imagem!' })



        if (preco <= 0 || avaliacao <= 0 || estoque <= 0)
            return resp.send({ erro: 'Insira apenas números positivos!' })



        if (isNaN(preco) === true)
            return resp.send({ erro: 'Campo Preço só recebe números!' })

        if (isNaN(avaliacao) === true)
            return resp.send({ erro: 'Campo Avaliação só recebe números!' })

        if (isNaN(estoque) === true)
            return resp.send({ erro: 'Campo Estoque só recebe números!' })



        let produtoRepetido = await db.infod_ssc_produto.findOne({ where: { nm_produto: nome } });
        if (produtoRepetido != null)
            return resp.send({ erro: ' Produto já existente' });



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


        if (nome === '' || preco === ''  || categoria === '' || avaliacao === '' || descricao === '' 
            || estoque === '' || imagem === '')
                return resp.send({ erro: 'Preencha todos os campos!' })


        if (nome.length <= 4)
            return resp.send({ erro: ' Insira mais que 4 caracteres no campo Nome!' })

        if (categoria.length <= 4)
            return resp.send({ erro: ' Insira mais que 4 caracteres no campo Categoria!' })

        if (descricao.length <= 10)
            return resp.send({ erro: ' Insira mais que 10 caracteres no campo Descrição!' })


        if (imagem.length <= 30 || !imagem.includes('https'))
            return resp.send({ erro: ' Insira um link válido no campo Imagem!' })



        if (preco <= 0 || avaliacao <= 0 || estoque <= 0)
            return resp.send({ erro: 'Insira apenas números positivos!' })

            

        if (isNaN(preco) === true)
            return resp.send({ erro: 'Campo Preço só recebe números!' })

        if (isNaN(avaliacao) === true)
            return resp.send({ erro: 'Campo Avaliação só recebe números!' })

        if (isNaN(estoque) === true)
            return resp.send({ erro: 'Campo Estoque só recebe números!' })
            


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

    const itemsPerPage = 3;
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
            ['vl_produto', 'preco'],
            ['nm_categoria', 'categoria'],
            ['ds_imagem', 'imagem'],
            ['qtd_disponivel_estoque', 'estoque'],
            ['ds_produto', 'descricao']
        ]
    });

    const total = await db.infod_ssc_produto.findOne({
        raw: true,
        where: {
            nm_categoria: req.query.categoria
        },
        attributes: [
            [fn('count', 1), 'qtd']
        ]
        });

        resp.send({
            items: produtos,
            total: total.qtd,
            totalPaginas: Math.ceil(total.qtd/3),
            pagina: Number(page)
        });
})


app.get('/busca', async(req, resp) => {
    try {
        let searching = req.query.search;
        if(searching.length < 3){
            return resp.send({erro: 'Digite no mínimo 3 caracteres'})
        }
        let r = await db.infod_ssc_produto.findAll(
            { where: {
                [Op.or]: [
                    { 'nm_produto': {[Op.like]: `%${searching}%` }}
                ]
            },
            attributes: [
                ['id_produto', 'id'],
                ['nm_produto', 'produto'],
                ['vl_produto', 'preco'],
                ['nm_categoria', 'categoria'],
                ['ds_imagem', 'imagem'],
                ['qtd_disponivel_estoque', 'estoque'],
                ['ds_produto', 'descricao']
            ]
         });
         resp.send(r);

    } catch (e) {
        resp.send({erro: e.toString()});
    }
})


export default app;