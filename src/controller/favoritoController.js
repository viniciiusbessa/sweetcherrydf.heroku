import db from '../db.js'

import express from 'express'
const Router = express.Router
const app = Router();

app.get('/', async (req, resp) => {
    try {
        let r = await db.infod_ssc_favoritos.findAll();
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


app.post('/', async (req, resp) => {
    try {
        
        let { id_do_cliente, id_do_produto } = req.body;

        let b = await db.infod_ssc_favoritos.create({
            id_cliente: id_do_cliente,
            id_produto: id_do_produto
        })
        resp.send(b);
    
    } catch(b) {
        resp.send({ erro: b.toString() })
    }
})

app.delete('/id' , async ( req, resp ) => {
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
        let {  id_do_cliente, id_do_produto } = req.body;
        let { id } = req.params;

        let b = await db.infod_ssc_favoritos.update(
            { 
                id_cliente: id_do_cliente,
                id_produto: id_do_produto

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