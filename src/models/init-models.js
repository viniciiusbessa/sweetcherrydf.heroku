import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _infod_ssc_cliente from  "./infod_ssc_cliente.js";
import _infod_ssc_endereco from  "./infod_ssc_endereco.js";
import _infod_ssc_item from  "./infod_ssc_item.js";
import _infod_ssc_pedido from  "./infod_ssc_pedido.js";
import _infod_ssc_produto from  "./infod_ssc_produto.js";
import _infod_ssc_venda from  "./infod_ssc_venda.js";
import _insf_tb_produto from  "./insf_tb_produto.js";
import _insf_tb_usuario from  "./insf_tb_usuario.js";
import _insf_tb_usuario_endereco from  "./insf_tb_usuario_endereco.js";
import _insf_tb_usuario_endereco_uf from  "./insf_tb_usuario_endereco_uf.js";

export default function initModels(sequelize) {
  var infod_ssc_cliente = _infod_ssc_cliente.init(sequelize, DataTypes);
  var infod_ssc_endereco = _infod_ssc_endereco.init(sequelize, DataTypes);
  var infod_ssc_item = _infod_ssc_item.init(sequelize, DataTypes);
  var infod_ssc_pedido = _infod_ssc_pedido.init(sequelize, DataTypes);
  var infod_ssc_produto = _infod_ssc_produto.init(sequelize, DataTypes);
  var infod_ssc_venda = _infod_ssc_venda.init(sequelize, DataTypes);
  var insf_tb_produto = _insf_tb_produto.init(sequelize, DataTypes);
  var insf_tb_usuario = _insf_tb_usuario.init(sequelize, DataTypes);
  var insf_tb_usuario_endereco = _insf_tb_usuario_endereco.init(sequelize, DataTypes);
  var insf_tb_usuario_endereco_uf = _insf_tb_usuario_endereco_uf.init(sequelize, DataTypes);

  infod_ssc_venda.belongsTo(infod_ssc_cliente, { as: "id_cliente_infod_ssc_cliente", foreignKey: "id_cliente"});
  infod_ssc_cliente.hasMany(infod_ssc_venda, { as: "infod_ssc_vendas", foreignKey: "id_cliente"});
  infod_ssc_cliente.belongsTo(infod_ssc_endereco, { as: "id_endereco_infod_ssc_endereco", foreignKey: "id_endereco"});
  infod_ssc_endereco.hasMany(infod_ssc_cliente, { as: "infod_ssc_clientes", foreignKey: "id_endereco"});
  infod_ssc_venda.belongsTo(infod_ssc_endereco, { as: "id_endereco_entrega_infod_ssc_endereco", foreignKey: "id_endereco_entrega"});
  infod_ssc_endereco.hasMany(infod_ssc_venda, { as: "infod_ssc_vendas", foreignKey: "id_endereco_entrega"});
  infod_ssc_pedido.belongsTo(infod_ssc_item, { as: "id_item_infod_ssc_item", foreignKey: "id_item"});
  infod_ssc_item.hasMany(infod_ssc_pedido, { as: "infod_ssc_pedidos", foreignKey: "id_item"});
  infod_ssc_item.belongsTo(infod_ssc_produto, { as: "id_produto_infod_ssc_produto", foreignKey: "id_produto"});
  infod_ssc_produto.hasMany(infod_ssc_item, { as: "infod_ssc_items", foreignKey: "id_produto"});
  infod_ssc_pedido.belongsTo(infod_ssc_venda, { as: "id_venda_infod_ssc_venda", foreignKey: "id_venda"});
  infod_ssc_venda.hasMany(infod_ssc_pedido, { as: "infod_ssc_pedidos", foreignKey: "id_venda"});
  insf_tb_usuario_endereco.belongsTo(insf_tb_usuario, { as: "id_usuario_insf_tb_usuario", foreignKey: "id_usuario"});
  insf_tb_usuario.hasMany(insf_tb_usuario_endereco, { as: "insf_tb_usuario_enderecos", foreignKey: "id_usuario"});
  insf_tb_usuario_endereco_uf.belongsTo(insf_tb_usuario_endereco, { as: "id_usuario_endereco_insf_tb_usuario_endereco", foreignKey: "id_usuario_endereco"});
  insf_tb_usuario_endereco.hasMany(insf_tb_usuario_endereco_uf, { as: "insf_tb_usuario_endereco_ufs", foreignKey: "id_usuario_endereco"});

  return {
    infod_ssc_cliente,
    infod_ssc_endereco,
    infod_ssc_item,
    infod_ssc_pedido,
    infod_ssc_produto,
    infod_ssc_venda,
    insf_tb_produto,
    insf_tb_usuario,
    insf_tb_usuario_endereco,
    insf_tb_usuario_endereco_uf
  };
}
