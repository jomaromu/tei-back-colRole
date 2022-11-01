"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
// Crear esquema
const Schema = mongoose_1.default.Schema;
const prioridadSchema = new Schema({
    editar: { type: Boolean, default: false },
    disponibles: [{ type: Schema.Types.ObjectId, ref: "prioridad" }],
});
const etapaSchema = new Schema({
    editar: { type: Boolean, default: false },
    disponibles: [{ type: Schema.Types.ObjectId, ref: "etapas" }],
});
const diseniadorSchema = new Schema({
    editar: { type: Boolean, default: false },
    disponibles: [{ type: Schema.Types.ObjectId, ref: "userWorker" }],
    verDistribucion: { type: Boolean, default: false },
});
const estadoSchema = new Schema({
    editar: { type: Boolean, default: false },
    disponibles: [{ type: Schema.Types.ObjectId, ref: "colores" }],
});
const sidebar = {
    bandeja: false,
    configuracion: false,
    sucursales: false,
    colaboradores: false,
    clientes: false,
    categorias: false,
    productos: false,
    roles: false,
    origen: false,
    prioridad: false,
    etapas: false,
    colores: false,
    metodos: false,
    modalidad: false,
    tipoArchivo: false,
};
const bandeja = {
    buscadorGeneral: false,
    crearPedido: false,
    borrarPedido: false,
    verID: false,
    verFecha: false,
    verVendedor: false,
    verCliente: false,
    verTelefono: false,
    verSucursal: false,
    verTotal: false,
    verSaldo: false,
    verPrioridad: false,
    verEtapa: false,
    verEstado: false,
    verDise: false,
    etapas: [],
    sucursales: [],
    verPropias: false,
};
const pedido = {
    informacion: {
        verInfo: false,
        verCliente: false,
        verTelefono: false,
        verCorreo: false,
        editarCliente: false,
        editarFechaEntrega: false,
        prioridad: prioridadSchema,
        etapa: etapaSchema,
        diseniador: diseniadorSchema,
        estado: estadoSchema,
        origen: {
            editar: false,
        },
        vendedor: {
            editar: false,
        },
        sucursal: {
            editar: false,
        },
    },
    productos: false,
    archivos: false,
    seguimiento: false,
    pagos: false,
};
const RestriccionesSchema = new Schema({
    sidebar: sidebar,
    bandeja: bandeja,
    pedido: pedido,
});
const roleColaboradorSchema = new Schema({
    idCreador: { type: Schema.Types.ObjectId, ref: "userWorker" },
    nombre: { type: String },
    estado: { type: Boolean, default: true },
    vendedor: { type: Boolean, default: false },
    diseniador: { type: Boolean, default: false },
    foranea: { type: Schema.Types.ObjectId, ref: "userWorker" },
    restricciones: RestriccionesSchema,
});
// validacion para único elemento
roleColaboradorSchema.plugin(mongoose_unique_validator_1.default, {
    message: "El {PATH}, ya existe!!",
});
module.exports = mongoose_1.default.model("roleColaborador", roleColaboradorSchema);
// const Restricciones = {
//   sidebar: {
//     bandeja: false,
//     configuracion: false,
//     sucursales: false,
//     colaboradores: false,
//     clientes: false,
//     categorias: false,
//     productos: false,
//     roles: false,
//     origen: false,
//     prioridad: false,
//     etapas: false,
//     colores: false,
//     metodos: false,
//     modalidad: false,
//     tipoArchivo: false,
//   },
//   bandeja: {
//     buscadorGeneral: false,
//     crearPedido: false,
//     borrarPedido: false,
//     verID: false,
//     verFecha: false,
//     verVendedor: false,
//     verCliente: false,
//     verTelefono: false,
//     verSucursal: false,
//     verTotal: false,
//     verSaldo: false,
//     verPrioridad: false,
//     verEtapa: false,
//     verEstado: false,
//     verDise: false,
//     etapas: [],
//     sucursales: [],
//     verPropias: false,
//   },
//   pedido: {
//     informacion: {
//       verInfo: false,
//       verCliente: false,
//       verTelefono: false,
//       verCorreo: false,
//       editarCliente: false,
//       editarFechaEntrega: false,
//       prioridad: {
//         editar: false,
//         disponibles: [],
//       },
//       etapa: {
//         editar: false,
//         disponibles: [],
//       },
//       diseniador: {
//         editar: false,
//         disponibles: [],
//         verDistribucion: false,
//       },
//       estado: {
//         editar: false,
//         disponibles: [],
//       },
//       origen: {
//         editar: false,
//       },
//       vendedor: {
//         editar: false,
//       },
//       sucursal: {
//         editar: false,
//       },
//     },
//     productos: false,
//     archivos: false,
//     seguimiento: false,
//     pagos: false,
//   },
// };
