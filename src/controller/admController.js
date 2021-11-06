import db from '../db.js'

import crypto from 'crypto-js'

import  Sequelize  from 'sequelize';
const { Op, col, fn } = Sequelize;

import express from 'express'
const Router = express.Router
const app = Router();

app.get('/', async (req, resp) => {
    try {
        let r = await db.infod_ssc_adm.findAll({
            attributes: [
                ['ds_email', 'email'],
                ['ds_senha', 'senha'],
                ['ds_codigo_adm', 'codigoAdm']
            ]
        });
        resp.send(r);

    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


app.post('/login', async (req, resp) => {
    try {
        
        let { email, senha, codigo } = req.body;
        let cryptoSenha = crypto.SHA256(senha).toString(crypto.enc.Base64);
        

        let r = await db.infod_ssc_adm.findOne(
            {
                where: {
                    ds_email: email,
                    ds_senha: cryptoSenha,
                    ds_codigo_adm: codigo
                },
                raw: true
            }
        )

        if (email === "" || senha === "" || codigo === "") {
            return resp.send({ erro: 'Preencha todos os campos!' });
        }

        if (!r) {
            return resp.send({ erro: 'Credenciais inválidas.' })
        }
    
        delete r.ds_senha;
        resp.send(r);
    
    } catch(b) {
        resp.send({ erro: b.toString() })
    }
})


app.post('/cadastro', async (req, resp) => {
    try {
        
        let  { email, senha } = req.body;

        let cryptoSenha = crypto.SHA256(senha).toString(crypto.enc.Base64);

        if (email === "" || senha === "") {
            return resp.send({ erro: 'Preencha todos os campos!' });
        }

        if (!email.includes('@')) {
            return resp.send({ erro: 'Insira um email válido'})
        }
        

        let b = await db.infod_ssc_adm.create({
            ds_email: email,
            ds_senha: cryptoSenha
        })

        resp.send(b);
    
    } catch(b) {
        resp.send({ erro: b.toString() })
    }
})

export default app;