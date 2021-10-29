import db from '../db.js'

import { Router } from 'express'

const app = Router();

app.get('/', async (req, resp) => {
    try {
        let r = await db.infod_ssc_adm.findAll({
            attributes: [
                ['ds_email', 'email'],
                ['ds_senha', 'senha']
            ]
        });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


app.post('/', async (req, resp) => {
    try {
        
        let { email, senha } = req.body;

        let b = await db.infod_ssc_adm.create({
            ds_email: email,
            ds_senha: senha
        })
        resp.send(b);
    
    } catch(b) {
        resp.send({ erro: b.toString() })
    }
})

export default app;