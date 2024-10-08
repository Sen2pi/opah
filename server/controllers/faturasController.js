const { executeWithRetry } = require("../config/utilsDb");

exports.getFaturas = (req, res) => {
  const sql = "SELECT * FROM Faturas";
  executeWithRetry(sql, [])
    .then(results => res.json(results))
    .catch(err => res.status(500).send(err));
};

exports.getFaturaById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Faturas WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(result => res.json(result[0]))
    .catch(err => res.status(500).send(err));
};

exports.createFatura = (req, res) => {
  const { Numero, DataEmissao, ValorTotal, UsuarioId, Descricao } = req.body;
  const sql = "INSERT INTO Faturas (Numero, DataEmissao, ValorTotal, UsuarioId, Descricao) VALUES (?, ?, ?, ?, ?)";
  executeWithRetry(sql, [Numero, DataEmissao, ValorTotal, UsuarioId, Descricao])
    .then(result => res.json({ id: result.insertId }))
    .catch(err => res.status(500).send(err));
};

exports.updateFatura = (req, res) => {
  const { id } = req.params;
  const { Numero, DataEmissao, ValorTotal, UsuarioId, Descricao } = req.body;
  const sql = "UPDATE Faturas SET Numero = ?, DataEmissao = ?, ValorTotal = ?, UsuarioId = ?, Descricao = ? WHERE id = ?";
  executeWithRetry(sql, [Numero, DataEmissao, ValorTotal, UsuarioId, Descricao, id])
    .then(() => res.json({ message: "Fatura atualizada com sucesso" }))
    .catch(err => res.status(500).send(err));
};

exports.deleteFatura = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Faturas WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Fatura deletada com sucesso" }))
    .catch(err => res.status(500).send(err));
};
