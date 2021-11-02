import db from '../db.js'

import enviarEmail from '../email.js';

import  Sequelize  from 'sequelize';
const { Op, col, fn } = Sequelize;

import express from 'express'
const Router = express.Router
const app = Router();


app.post('/esqueciasenha', async (req, resp) => {
    try {
        const user = await db.infod_ssc_cliente.findOne({
            where: {
                ds_email: req.body.email   
            }
        });

        if (!user) {
            return resp.send({ erro: 'Email inválido' })
        }

        let code = getRandomInteger(1000, 9999);
        await db.infod_ssc_cliente.update({
            ds_codigo: code
        }, {
            where: { id_cliente: user.id_cliente }
        })

        enviarEmail(user.ds_email, 'Recuperação de Senha', `
            <h3> Recuperação de Senha </h3>
            <p> Você solicitou a recuperação de senha da sua conta. </p>
            <p> Entre com o código <b>${code}</b> para prosseguir com a recuperação.
        `)

        resp.send(user);

    } catch(b) {
        resp.send({ erro: b.toString() })
    }
})


app.post('/validarcodigo', async (req, resp) => {
    try {
        const user = await db.infod_ssc_cliente.findOne({
            where: {
                ds_email: req.body.email   
            }
        });

        if (!user) {
            return resp.send({ erro: 'Email inválido' })
        }

        if (user.ds_codigo !== req.body.codigo) {
            return resp.send({ erro: 'Código inválido' })
        }

        resp.send(user);

    } catch(b) {
        resp.send({ erro: b.toString() })
    }
})

app.put('/resetsenha', async (req, resp) => {
    const user = await db.infod_ssc_cliente.findOne({
        where: {
            ds_email: req.body.email   
        }
    });

    if (!user) {
        resp.send({ status: 'erro', mensagem: 'E-mail inválido.' });
    }


    if (user.ds_codigo !== req.body.codigo ||
        user.ds_codigo === '') {
        resp.send({ status: 'erro', mensagem: 'Código inválido.' });
    }

    await db.infod_ssc_cliente.update({
        ds_senha: req.body.novaSenha,
        ds_codigo: ''
    }, {
        where: { id_cliente: user.id_cliente }
    })

    resp.send({ status: 'ok', mensagem: 'Senha alterada.' });
})  


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


export default app;