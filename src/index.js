import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());

app.get('/cliente-usuario/:clienteId', async (req, resp) => {
    try {
        let mensagens = await
            db.infod_ssc_cliente.findAll({
                where: {
                    id_cliente: req.params.clienteId
                },
                include: ['infoD_ssc_endereco'],
             });
        resp.send(mensagens);
    } catch (e) {
        resp.send(e.toString())
    }
})
    

app.listen(process.env.PORT,
            x => console.log(`Server up at port ${process.env.PORT}`))