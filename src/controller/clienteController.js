import db from '../db.js'
import crypto from 'crypto-js'

import  Sequelize  from 'sequelize';
const { Op, col, fn } = Sequelize;

import { Router } from 'express'

const app = Router();

app.get('/', async (req, resp) => {
    try {
        let r = await db.infod_ssc_cliente.findAll({
            attributes: [
                ['id_endereco', 'Endereco'],
                ['nm_cliente', 'Nome do cliente'],
                ['ds_cpf', 'CPF'],
                ['dt_nascimento', 'Data de nascimento'],
                ['nr_telefone', 'Número de telefone'],
                ['ds_email', 'Email'],
                ['ds_senha', 'Senha']
            ]
        });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.post('/', async (req, resp) => {
    try {
        
        let { id_do_endereco, nome_cliente, cpf, dtnascimento, telefone, email, senha } = req.body;

        let b = await db.infod_ssc_cliente.create({
            id_endereco: id_do_endereco,
            nm_cliente: nome_cliente,
            ds_cpf: cpf,
            dt_nascimento: dtnascimento,
            nr_telefone: telefone,
            ds_email: email,
            ds_senha: crypto.SHA256(senha).toString(crypto.enc.Base64)
        })
        resp.send(b);
    
} catch(b) {
    resp.send({ erro: b.toString() })
}
})

app.put('/:id', async (req, resp) => {
    try{
        let {  endereco, nome_cliente, cpf, dtnascimento, telefone, email, senha } = req.body;
        let { id } = req.params;

        let b = await db.infod_ssc_cliente.update(
            {
                id_endereco: endereco,
                nm_cliente: nome_cliente,
                ds_cpf: cpf,
                dt_nascimento: dtnascimento,
                nr_telefone: telefone,
                ds_email: email,
                ds_senha: senha

            },
            {
                where: { id_cliente: id }
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
        let r = await db.infod_ssc_cliente.destroy({ where: { id_cliente: id } })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.post('/login', async (req, resp) => {
    try {
        let { email, senha } = req.body;
        let cryptoSenha = crypto.SHA256(senha).toString(crypto.enc.Base64);

        let r = await db.infod_ssc_cliente.findOne(
            {
                where: {
                    ds_email: email,
                    ds_senha: cryptoSenha
                },
                raw: true
            }
        )

        if (email === "" && senha === "") {
            return resp.send({ erro: 'Preencha todos os campos!' });
        }

        if (r === null) {
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
        
        let  { nome, email, senha } = req.body;

        if (nome === "" && email === "" && senha === "") {
            return resp.send({ erro: 'Preencha todos os campos!' });
        }

        if (!email.includes('@')) {
            return resp.send({ erro: 'Insira um email válido'})
        }

        let b = await db.infod_ssc_cliente.create({
            nm_cliente: nome,
            ds_email: email,
            ds_senha: crypto.SHA256(senha).toString(crypto.enc.Base64)
        })

        resp.send(b);
    
} catch(b) {
    resp.send({ erro: b.toString() })
}
})

export default app;