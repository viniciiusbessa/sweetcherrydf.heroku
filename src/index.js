import db from './db.js';
import express from 'express'
import cors from 'cors'
import { json } from 'sequelize/types';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/produto', async (req, resp) => {
    try {
        let r = await db.infod_ssc_produto.findAll( );
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


app.get('/estoque', async (req, resp) => {
    try {
        let r = await db.infod_ssc_estoque.findAll( );
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.get('/cliente', async (req, resp) => {
    try {
        let r = await db.infod_ssc_cliente.findAll( );
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})


app.get('/endereco', async (req, resp) => {
    try {
        let r = await db.infod_ssc_endereco.findAll( );
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.get('/item_venda', async (req, resp) => {
    try {
        let r = await db.infod_ssc_item_venda.findAll( );
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

app.get('/venda', async (req, resp) => {
    try {
        let r = await db.infod_ssc_venda.findAll( );
        resp.send(r);
    } catch (e) {
        resp.send({ erro: e.toString() })
    }
})

//Gets feitos e funcionando

app.post('/estoque', async (req, resp) => {
    try {
        
        let {disponivel, id_produto} = req.body;
        let c = await db.infod_ssc_produto.create({
            qtd_disponivel: disponivel,
            id_produto: id_produto
        })

        resp.send(c);
    
} catch(c) {
    resp.send({ erro: c.toString() })
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


app.post('/cliente', async (req, resp) => {
    try {
        
        let { id_endereco, nome_cliente, cpf, dt_nascimento, telefone, email, senha } = req.body;

        let b = await db.infod_ssc_produto.create({
            id_endereco: id_endereco,
            nm_cliente: nome_cliente,
            ds_cpf: cpf,
            dt_nascimento: dt_nascimento,
            nr_telefone: telefone,
            ds_email: email,
            ds_senha: senha
        })
        resp.send(b);
    
} catch(b) {
    resp.send({ erro: b.toString() })
}
})


app.post('/endereco', async (req, resp) => {
    try {
        
        let { endereco, numero_do_endereco, descricao_do_cep, nome_cidade, complemento } = req.body;

        let j = await db.infod_ssc_endereco.create({
            ds_endereco: endereco,
            nr_endereco: numero_do_endereco,
            ds_cep: descricao_do_cep,
            nm_cidade: nome_cidade,
            ds_complemeno: complemento
        })
        resp.send(j);
    
} catch(j) {
    resp.send({ erro: j.toString() })
}
})

app.post('/item_venda', async (req, resp) => {
    try {
        
        let { id_produto, id_venda } = req.body;

        let j = await db.infod_ssc_item_venda.create({
            id_produto: id_produto,
            id_venda: id_venda
        })
        resp.send(json);
    
} catch(j) {
    resp.send({ erro: j.toString() })
}


})
app.post('/', async (req, resp) => {
    try {
        
        let {  } = req.body;

        let b = await db.infod_ssc_produto.create({
            
        })
        resp.send(b);
    
} catch(b) {
    resp.send({ erro: b.toString() })
}
})




app.listen(process.env.PORT,
            x => console.log(`Subiu lá baiano na porta ${process.env.PORT}`))