const { executeWithRetry } = require("../config/utilsDb");

exports.getModulos = (req, res) => {
  const sql = "SELECT * FROM Modulos";
  executeWithRetry(sql, [])
    .then(results => res.json(results))
    .catch(err => res.status(500).send(err));
};

exports.getModuloById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Modulos WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(result => res.json(result[0]))
    .catch(err => res.status(500).send(err));
};

exports.createModulo = (req, res) => {
  const { Nome, Descricao } = req.body;
  const sql = "INSERT INTO Modulos (Nome, Descricao) VALUES (?, ?)";
  executeWithRetry(sql, [Nome, Descricao])
    .then(result => res.json({ id: result.insertId }))
    .catch(err => res.status(500).send(err));
};

exports.updateModulo = (req, res) => {
  const { id } = req.params;
  const { Nome, Descricao } = req.body;
  const sql = "UPDATE Modulos SET Nome = ?, Descricao = ? WHERE id = ?";
  executeWithRetry(sql, [Nome, Descricao, id])
    .then(() => res.json({ message: "Módulo atualizado com sucesso" }))
    .catch(err => res.status(500).send(err));
};

exports.deleteModulo = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Modulos WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Módulo deletado com sucesso" }))
    .catch(err => res.status(500).send(err));
};
