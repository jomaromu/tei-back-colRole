import { Response } from "express";
import { CallbackError } from "mongoose";
const mongoose = require("mongoose");

// Interfaces
import { RoleColModel, Restricciones } from "../interfaces/role";

// Modelo
import roleWorkerModel from "../models/roleWorkerModel";

export class RoleColClass {
  constructor() {}

  // Nuevo role
  nuevoRole(req: any, resp: Response): void {
    const idCreador = new mongoose.Types.ObjectId(req.usuario._id);
    const nombre = req.body.nombre;
    const vendedor = req.body.vendedor;
    const diseniador = req.body.diseniador;
    const restricciones = req.body.restricciones;

    const nuevoRole = new roleWorkerModel({
      idCreador,
      nombre,
      vendedor,
      diseniador,
      restricciones,
    });

    nuevoRole.save((err: CallbackError, roleDB: RoleColModel) => {
      if (err) {
        return resp.json({
          mensaje: `Error interno`,
          err,
        });
      } else {
        return resp.json({
          ok: true,
          mensaje: `Role ${nombre} creado`,
          roleDB,
        });
      }
    });
  }

  // Editar role
  editarRole(req: any, resp: Response): void {
    const id = req.get("id");
    const nombre: string = req.body.nombre;
    const estado: boolean = req.body.estado;
    const vendedor: boolean = req.body.vendedor;
    const diseniador: boolean = req.body.diseniador;

    const query = {
      nombre,
      estado,
      vendedor,
      diseniador,
    };

    roleWorkerModel.findById(id, (err: CallbackError, roleDB: any) => {
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

      roleWorkerModel.findByIdAndUpdate(
        id,
        query,
        { new: true },
        (err: CallbackError, roleDB: any) => {
          if (err) {
            return resp.json({
              ok: false,
              mensaje: `No se pudo editar el role`,
              err,
            });
          } else {
            return resp.json({
              ok: true,
              mensaje: `Role actualizado`,
              roleDB,
            });
          }
        }
      );
    });
  }

  editarRestricciones(req: any, resp: Response): void {
    const id = req.get("id");
    const restricciones: Restricciones = req.body.restricciones;

    const query = {
      restricciones,
    };

    roleWorkerModel.findByIdAndUpdate(
      id,
      query,
      { new: true },
      (err: any, roleDB: any) => {
        if (err) {
          return resp.json({
            ok: false,
            mensaje: `No se pudo editar el role`,
            err,
          });
        } else {
          return resp.json({
            ok: true,
            mensaje: `Role actualizado`,
            roleDB,
          });
        }
      }
    );
  }

  // Obtener role por ID
  obtenerRoleID(req: any, resp: Response): void {
    const id = req.get("id");

    roleWorkerModel.findById(id, (err: CallbackError, roleDB: Document) => {
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
  obtenerTodos(req: any, resp: Response): void {
    roleWorkerModel
      .find({})
      .populate("idCreador")
      .exec((err: CallbackError, rolesDB: Array<RoleColModel>) => {
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
  eliminarRole(req: any, resp: Response): void {
    const id = req.get("id");

    roleWorkerModel.findByIdAndDelete(
      id,
      {},
      (err: CallbackError, roleDB: any) => {
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
      }
    );
  }
}
