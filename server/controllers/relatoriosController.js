const { executeWithRetry } = require("../config/utilsDb");

exports.getRelatorios = (req, res) => {
  const sql = "SELECT * FROM Relatorios";
  executeWithRetry(sql, [])
    .then(results => res.json(results))
    .catch(err => res.status(500).send(err));
};

exports.getRelatorioById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Relatorios WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(result => res.json(result[0]))
    .catch(err => res.status(500).send(err));
};

exports.createRelatorio = (req, res) => {
  const { Titulo, Conteudo, DataRelatorio, UsuarioId } = req.body;
  const sql = "INSERT INTO Relatorios (Titulo, Conteudo, DataRelatorio, UsuarioId) VALUES (?, ?, ?, ?)";
  executeWithRetry(sql, [Titulo, Conteudo, DataRelatorio, UsuarioId])
    .then(result => res.json({ id: result.insertId }))
    .catch(err => res.status(500).send(err));
};

exports.updateRelatorio = (req, res) => {
  const { id } = req.params;
  const { Titulo, Conteudo, DataRelatorio, UsuarioId } = req.body;
  const sql = "UPDATE Relatorios SET Titulo = ?, Conteudo = ?, DataRelatorio = ?, UsuarioId = ? WHERE id = ?";
  executeWithRetry(sql, [Titulo, Conteudo, DataRelatorio, UsuarioId, id])
    .then(() => res.json({ message: "Relatório atualizado com sucesso" }))
    .catch(err => res.status(500).send(err));
};

exports.deleteRelatorio = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Relatorios WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Relatório deletado com sucesso" }))
    .catch(err => res.status(500).send(err));
};
