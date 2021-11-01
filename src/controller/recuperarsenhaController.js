import db from '../db.js'

import  Sequelize  from 'sequelize';
const { Op, col, fn } = Sequelize;

import express from 'express'
const Router = express.Router
const app = Router();

app.get('/', async (req, resp) => {
    try {
        let r = await db.insf_tb_usuario.findAll({
            attributes: [
                ['id_usuario', 'id'],
                ['nm_usuario', 'nome'],
                ['ds_email', 'email'],
                ['ds_codigo_rec', 'codigo'],
                ['ds_senha', 'senha'],
                ['dt_inclusao', 'datainclusao']
            ]
        });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


 app.post('/login', async (req, resp) => {
    const user = await db.insf_tb_usuario.findOne({
        where: {
            ds_email: req.body.email,
            ds_senha: req.body.senha
        }
    })

    if (!user) {
        resp.send({ status: 'erro', mensagem: 'Credenciais inválidas.' });

    } else {
        resp.send({ status: 'ok', nome: user.nm_usuario });
    }

 })


// app.post('/esqueciASenha', async (req, resp) => {
//     const user = await db.insf_tb_usuario.findOne({
//         where: {
//             ds_email: req.body.email   
//         }
//     });

//     if (!user) {
//         resp.send({ status: 'erro', mensagem: 'E-mail inválido.' });
//     }

//     let code = getRandomInteger(1000, 9999);
//     await db.insf_tb_usuario.update({
//         ds_codigo_rec: code
//     }, {
//         where: { id_usuario: user.id_usuario }
//     })

//     enviarEmail(user.ds_email, 'Recuperação de Senha', `
//         <h3> Recuperação de Senha </h3>
//         <p> Você solicitou a recuperação de senha da sua conta. </p>
//         <p> Entre com o código <b>${code}</b> para prosseguir com a recuperação.
//     `)

//     resp.send({ status: 'ok' });
// })


// app.post('/validarCodigo', async (req, resp) => {
// const user = await db.insf_tb_usuario.findOne({
//     where: {
//     ds_email: req.body.email   
//     }
// });

// if (!user) {
//     resp.send({ status: 'erro', mensagem: 'E-mail inválido.' });
// }

// if (user.ds_codigo_rec !== req.body.codigo) {
//     resp.send({ status: 'erro', mensagem: 'Código inválido.' });
// }

// resp.send({ status: 'ok', mensagem: 'Código validado.' });

// })

// app.put('/resetSenha', async (req, resp) => {
// const user = await db.insf_tb_usuario.findOne({
//     where: {
//     ds_email: req.body.email   
//     }
// });

// if (!user) {
//     resp.send({ status: 'erro', mensagem: 'E-mail inválido.' });
// }


// if (user.ds_codigo_rec !== req.body.codigo ||
//     user.ds_codigo_rec === '') {
//     resp.send({ status: 'erro', mensagem: 'Código inválido.' });
// }

// await db.insf_tb_usuario.update({
//     ds_senha: req.body.novaSenha,
//     ds_codigo_rec: ''
// }, {
//     where: { id_usuario: user.id_usuario }
// })

// resp.send({ status: 'ok', mensagem: 'Senha alterada.' });
// })  


app.delete('/:id', async (req, resp) => {
    try {
        let { id } = req.params;
        let r = await db.insf_tb_usuario.destroy({ where: { id_usuario: id } })
        resp.sendStatus(200);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}


export default app;