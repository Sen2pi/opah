const { executeWithRetry } = require("../config/utilsDb");

const getUsuarios = (req, res) => {
  const sql = "SELECT * FROM Usuarios";
  executeWithRetry(sql, [])
    .then(results => res.json(results))
    .catch(err => res.status(500).send(err));
};

const getUsuarioById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Usuarios WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(result => res.json(result[0]))
    .catch(err => res.status(500).send(err));
};

const createUsuario = (req, res) => {
  const { Nome, Sobrenome, NIF, Telefone,  Email , Endereco, Cidade, NSS, TipoUtilizador, Password } = req.body;
  const sql = "INSERT INTO Usuarios (Nome, Sobrenome, NIF, Telefone , Email , Endereco , Cidade, NSS, TipoUtilizador, Password) VALUES (?, ?, ?, ?, ?,?,?,?,?,?)";
  executeWithRetry(sql, [Nome, Sobrenome, NIF,Telefone, Email,Endereco, Cidade, NSS, TipoUtilizador, Password])
    .then(result => res.json({ id: result.insertId }))
    .catch(err => res.status(500).send(err));
};

const updateUsuario = (req, res) => {
  const { id } = req.params;
  const { Nome, Sobrenome, NIF, Telefone,Email,Endereco, Cidade, NSS, TipoUtilizador, Password } = req.body;
  const sql = `
  UPDATE Usuarios 
  SET 
    Nome = COALESCE(?, Nome), 
    Sobrenome = COALESCE(?, Sobrenome), 
    NIF = COALESCE(?, NIF), 
    Telefone = COALESCE(?, Telefone), 
    Email = COALESCE(?, Email), 
    Endereco = COALESCE(?, Endereco), 
    Cidade = COALESCE(?, Cidade), 
    NSS = COALESCE(?, NSS), 
    TipoUtilizador = COALESCE(?, TipoUtilizador), 
    Password = COALESCE(?, Password) 
  WHERE id = ?`;

  executeWithRetry(sql, [Nome, Sobrenome, NIF,Telefone, Email,Endereco, Cidade, NSS, TipoUtilizador, Password, id])
    .then(() => res.json({ message: "Usuario atualizado com sucesso" }))
    .catch(err => res.status(500).send(err));
};

const deleteUsuario = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Usuarios WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Usuario deletado com sucesso" }))
    .catch(err => res.status(500).send(err));
};

module.exports = {
  deleteUsuario,
  updateUsuario,
  createUsuario,
  getUsuarioById,
  getUsuarios
};
