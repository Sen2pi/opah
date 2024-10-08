const { executeWithRetry } = require("../config/utilsDb");

exports.getUsuarios = (req, res) => {
  const sql = "SELECT * FROM Usuarios";
  executeWithRetry(sql, [])
    .then(results => res.json(results))
    .catch(err => res.status(500).send(err));
};

exports.getUsuarioById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Usuarios WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(result => res.json(result[0]))
    .catch(err => res.status(500).send(err));
};

exports.createUsuario = (req, res) => {
  const { Nome, Sobrenome, NIF, Email, Password } = req.body;
  const sql = "INSERT INTO Usuarios (Nome, Sobrenome, NIF, Email, Password) VALUES (?, ?, ?, ?, ?)";
  executeWithRetry(sql, [Nome, Sobrenome, NIF, Email, Password])
    .then(result => res.json({ id: result.insertId }))
    .catch(err => res.status(500).send(err));
};

exports.updateUsuario = (req, res) => {
  const { id } = req.params;
  const { Nome, Sobrenome, NIF, Email, Password } = req.body;
  const sql = "UPDATE Usuarios SET Nome = ?, Sobrenome = ?, NIF = ?, Email = ?, Password = ? WHERE id = ?";
  executeWithRetry(sql, [Nome, Sobrenome, NIF, Email, Password, id])
    .then(() => res.json({ message: "Usuario atualizado com sucesso" }))
    .catch(err => res.status(500).send(err));
};

exports.deleteUsuario = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Usuarios WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Usuario deletado com sucesso" }))
    .catch(err => res.status(500).send(err));
};
