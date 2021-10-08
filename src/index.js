import db from './db.js';
import express from 'express'
import cors from 'cors'

const app = express();
app.use(cors());

app.get('/produto', async (req, resp) => {
    try {
        let r = await db.infod_ssc_produto.findAll({ order: [[ 'id_produto', 'desc' ]] });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


app.get('/estoque', async (req, resp) => {
    try {
        let r = await db.infod_ssc_estoque.findAll({ order: [[ 'id_estoque', 'desc' ]] });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.get('/cliente', async (req, resp) => {
    try {
        let r = await db.infod_ssc_cliente.findAll({ order: [[ 'id_cliente', 'desc' ]] });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


app.get('/endereco', async (req, resp) => {
    try {
        let r = await db.infod_ssc_endereco.findAll({ order: [[ 'id_endereco', 'desc' ]] });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.get('/item_venda', async (req, resp) => {
    try {
        let r = await db.infod_ssc_item_venda.findAll({ order: [[ 'id_item_venda', 'desc' ]] });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.get('/venda', async (req, resp) => {
    try {
        let r = await db.infod_ssc_venda.findAll({ order: [[ 'id_venda', 'desc' ]] });
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

// Gets feitos e funcionando


app.post('/estoque', async (req, resp) => {
    try {
        
        let { disponivel, id_produto} = req.body

        let b = await db.infod_ssc_produto.create({
            qtd_disponivel: disponivel,
            id_produto: id_produto
        })

        resp.send(b);
    
} catch(b) {
    resp.send({ erro: b.toString() })
}
})


app.post('/produto', async (req, resp) => {
    try {
        
        let { nome, preco, categoria, descricao, avaliacao, imagem } = req.body;

        let b = await db.infod_ssc_produto.create({
            nm_produto: nome,
            vl_produto: preco,
            nm_categoria: categoria,
            ds_produto: descricao,
            ds_avaliacao: avaliacao,
            ds_imagem: imagem
        })
        resp.send(b);
    
} catch(b) {
    resp.send({ erro: b.toString() })
}
})

app.listen(process.env.PORT,
            x => console.log(`Server up at port ${process.env.PORT}`))