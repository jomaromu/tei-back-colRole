"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleColClass = void 0;
const mongoose = require("mongoose");
// Modelo
const roleWorkerModel_1 = __importDefault(require("../models/roleWorkerModel"));
class RoleColClass {
    constructor() { }
    // Nuevo role
    nuevoRole(req, resp) {
        const idCreador = new mongoose.Types.ObjectId(req.usuario._id);
        const foranea = new mongoose.Types.ObjectId(req.body.foranea);
        const nombre = req.body.nombre;
        const vendedor = req.body.vendedor;
        const diseniador = req.body.diseniador;
        const restricciones = req.body.restricciones;
        const nuevoRole = new roleWorkerModel_1.default({
            idCreador,
            foranea,
            nombre,
            vendedor,
            diseniador,
            restricciones,
        });
        nuevoRole.save((err, roleDB) => {
            if (err) {
                return resp.json({
                    mensaje: `Error interno`,
                    err,
                });
            }
            else {
                return resp.json({
                    ok: true,
                    mensaje: `Role ${nombre} creado`,
                    roleDB,
                });
            }
        });
    }
    // Editar role
    editarRole(req, resp) {
        const _id = new mongoose.Types.ObjectId(req.get("id"));
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        const nombre = req.body.nombre;
        const estado = req.body.estado;
        const vendedor = req.body.vendedor;
        const diseniador = req.body.diseniador;
        const query = {
            nombre,
            estado,
            vendedor,
            diseniador,
        };
        roleWorkerModel_1.default.findOne({ _id, foranea }, (err, roleDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            if (!roleDB) {
                return resp.json({
                    ok: false,
                    mensaje: `No existe el role con ese ID`,
                });
            }
            if (!query.nombre) {
                query.nombre = roleDB.nombre;
            }
            roleWorkerModel_1.default.findOneAndUpdate({ _id, foranea }, query, { new: true }, (err, roleDB) => {
                if (err) {
                    return resp.json({
                        ok: false,
                        mensaje: `No se pudo editar el role`,
                        err,
                    });
                }
                else {
                    return resp.json({
                        ok: true,
                        mensaje: `Role actualizado`,
                        roleDB,
                    });
                }
            });
        });
    }
    editarRestricciones(req, resp) {
        const _id = new mongoose.Types.ObjectId(req.get("id"));
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        const restricciones = req.body.restricciones;
        const query = {
            restricciones,
        };
        roleWorkerModel_1.default.findOneAndUpdate({ _id, foranea }, query, { new: true }, (err, roleDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `No se pudo editar el role`,
                    err,
                });
            }
            else {
                return resp.json({
                    ok: true,
                    mensaje: `Role actualizado`,
                    roleDB,
                });
            }
        });
    }
    // Obtener role por ID
    obtenerRoleID(req, resp) {
        const _id = new mongoose.Types.ObjectId(req.get("id"));
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        roleWorkerModel_1.default.findOne({ _id, foranea }, (err, roleDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error al búscar role o no existe`,
                    err,
                });
            }
            return resp.json({
                ok: true,
                roleDB,
            });
        });
    }
    // Obtener todos los roles
    obtenerTodos(req, resp) {
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        roleWorkerModel_1.default
            .find({ foranea })
            .populate("idCreador")
            .exec((err, rolesDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error al búscar role o no existe`,
                    err,
                });
            }
            return resp.json({
                ok: true,
                rolesDB,
            });
        });
    }
    // Eliminar un role por ID
    eliminarRole(req, resp) {
        const _id = new mongoose.Types.ObjectId(req.get("id"));
        const foranea = new mongoose.Types.ObjectId(req.get("foranea"));
        roleWorkerModel_1.default.findOneAndDelete({ _id, foranea }, {}, (err, roleDB) => {
            if (err) {
                return resp.json({
                    ok: false,
                    mensaje: `Error interno`,
                    err,
                });
            }
            return resp.json({
                ok: true,
                roleDB,
            });
        });
    }
}
exports.RoleColClass = RoleColClass;
