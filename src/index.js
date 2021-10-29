import admController from './controller/admController.js'
import clienteController from './controller/clienteController.js'
import emailController from './controller/emailController.js'
import enderecoController from './controller/enderecoController.js'
import itemController from './controller/itemController.js'
import pedidoController from './controller/pedidoController.js'
import produtoController from './controller/produtoController.js'
import recuperarsenhaController from './controller/recuperarsenhaController.js'
import vendaController from './controller/vendaController.js'

import express from 'express'
import cors from 'cors'

const server = express();
server.use(cors());
server.use(express.json());

server.use('/adm', admController);
server.use('/cliente', clienteController);
server.use('/email', emailController);
server.use('/endereco', enderecoController);
server.use('/item', itemController);
server.use('/pedido', pedidoController);
server.use('/produto', produtoController);
server.use('/recuperacaodesenha', recuperarsenhaController);
server.use('/venda', vendaController);

server.listen(process.env.PORT, 
               x=> console.log(`Subiu na lá na porta ${process.env.PORT}meu nobre`))