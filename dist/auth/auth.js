"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarRole = exports.editarRole = exports.crearUsuario = exports.verificaToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SEED = require('../environment/environment');
// Globales
const environment_1 = require("../environment/environment");
// Modelos
const roleWorkerModel_1 = __importDefault(require("../models/roleWorkerModel"));
const verificaToken = (req, resp, next) => {
    const token = req.get('token') || '';
    // Comprobación del token
    jsonwebtoken_1.default.verify(token, environment_1.environmnet.SEED, (err, decoded) => {
        if (err) {
            return resp.json({
                ok: false,
                mensaje: `Token incorrecto`,
                err
            });
        }
        // Insertar en el Request el usuario
        req.usuario = decoded.usuario;
        next();
    });
};
exports.verificaToken = verificaToken;
const crearUsuario = (req, resp, next) => {
    const tokenRole = req.usuario.colaborador_role;
    if (tokenRole === 'SuperRole' || tokenRole === 'AdminRole') {
        next();
    }
    else {
        return resp.json({
            ok: false,
            mensaje: `No está autorizado para realizar esta operación`
        });
    }
};
exports.crearUsuario = crearUsuario;
const editarRole = (req, resp, next) => {
    const id = req.get('id');
    roleWorkerModel_1.default.findById(id, (err, roleDB) => {
        if (err) {
            return resp.json({
                ok: false,
                mensaje: `Error interno`,
                err
            });
        }
        if (!roleDB) {
            return resp.json({
                ok: false,
                mensaje: `No existe el role con ese ID`,
            });
        }
        if (roleDB.nivel === 0) {
            return resp.json({
                ok: false,
                mensaje: `Este role no es editable`,
            });
        }
        else {
            next();
        }
    });
};
exports.editarRole = editarRole;
const eliminarRole = (req, resp, next) => {
    const id = req.get('id');
    roleWorkerModel_1.default.findById(id, (err, roleDB) => {
        if (err) {
            return resp.json({
                ok: false,
                mensaje: `Error interno`,
                err
            });
        }
        if (!roleDB) {
            return resp.json({
                ok: false,
                mensaje: `No existe el role con ese ID`,
            });
        }
        if (roleDB.nivel === 0) {
            return resp.json({
                ok: false,
                mensaje: `Este role no se puede eliminar`,
            });
        }
        else {
            next();
        }
    });
};
exports.eliminarRole = eliminarRole;
