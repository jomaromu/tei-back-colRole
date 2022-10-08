"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const Restricciones = {
    sidebar: {
        catalogo: false,
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
    },
};
// Crear esquema
const Schema = mongoose_1.default.Schema;
const roleColaboradorSchema = new Schema({
    idCreador: { type: Schema.Types.ObjectId, ref: "userWorker" },
    nombre: { type: String, unique: true },
    estado: { type: Boolean, default: true },
    vendedor: { type: Boolean, default: false },
    diseniador: { type: Boolean, default: false },
    restricciones: { type: Object, default: Restricciones },
});
// validacion para único elemento
roleColaboradorSchema.plugin(mongoose_unique_validator_1.default, {
    message: "El {PATH}, ya existe!!",
});
module.exports = mongoose_1.default.model("roleColaborador", roleColaboradorSchema);
