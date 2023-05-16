import { json } from "express";
import { pool } from "../db.js";

export const getUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo ha ido mal al obtener usuarios" });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
      req.params.id,
    ]);

    if (rows.length <= 0)
      return res.status(404).json({
        message: "Usuario no encontrado",
      });

    res.json(rows[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo ha ido mal al obtener el usuario" });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const {
      username,
      password,
      perfil,
      nombre,
      apellidos,
      telefono,
      activo,
      codigo_cliente,
    } = req.body;

    const [rows] = await pool.query(
      "INSERT INTO usuarios (username, password, perfil, nombre, apellidos, telefono, activo, codigo_cliente) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        username,
        password,
        perfil,
        nombre,
        apellidos,
        telefono,
        activo,
        codigo_cliente,
      ]
    );
    res.send({ id: rows.insertId, nombre, apellidos });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo ha ido mal al crear el usuario" });
  }
};

export const updateUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellidos, telefono, activo, codigo_cliente, fecha_baja } =
    req.body;

  try {
    const [result] = await pool.query(
      "UPDATE usuarios SET nombre = IFNULL(?, nombre), apellidos = IFNULL(?, apellidos), telefono = IFNULL(?, telefono), activo = IFNULL(?, activo), fecha_baja = IFNULL(?, fecha_baja), codigo_cliente = IFNULL(?, codigo_cliente) WHERE id = ?",
      [nombre, apellidos, telefono, activo, fecha_baja, codigo_cliente, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    const [rows] = await pool.query("SELECT * FROM usuarios WHERE id = ?", [
      id,
    ]);

    res.json(rows[0]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Algo ha ido mal al actualizar el usuario" });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM usuarios WHERE id = ?", [
      req.params.id,
    ]);

    if (result.affectedRows <= 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.sendStatus(204);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Algo ha ido mal al eliminar el usuario" });
  }
};
