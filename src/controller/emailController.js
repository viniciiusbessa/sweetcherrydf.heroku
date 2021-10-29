import axios from 'axios'

import enviarEmail from '../email.js';

import  Sequelize  from 'sequelize';
const { Op, col, fn } = Sequelize;

import { Router } from 'express'

const app = Router();

app.post('/enviar', async (req, resp) => {
    try {

        const response = await
        enviarEmail(req.body.para, req.body.assunto, req.body.mensagem);

        resp.send(response);

    } catch(e) {

        resp.send(e)
    }
})

app.get('/buscarbairro', async (req, resp) => {
    try{
        const api_key = 'b866c3722fa645f9acb1da4674663672';
        const { lat, lon } = req.query;

        let r = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${api_key}`);
        resp.send(r.data);

    } catch(e) {

        resp.send(e);

    }
})

export default app;