const { executeWithRetry } = require("../config/utilsDb");

const getRelatorios = (req, res) => {
  const sql = "SELECT * FROM Relatorios";
  executeWithRetry(sql, [])
    .then(results => res.json(results))
    .catch(err => res.status(500).send(err));
};

const getRelatorioById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Relatorios WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(result => res.json(result[0]))
    .catch(err => res.status(500).send(err));
};

const createRelatorio = (req, res) => {
  const { ModuloId, NumeroParticipantes, DataInicio, DataFim, Descricao } = req.body;
  const sql = "INSERT INTO Relatorios (ModuloId, NumeroParticipantes, DataInicio, DataFim, Descricao) VALUES (?, ?, ?, ?, ?)";
  executeWithRetry(sql, [ModuloId, NumeroParticipantes, DataInicio, DataFim, Descricao])
    .then(result => res.json({ id: result.insertId }))
    .catch(err => res.status(500).send(err));
};

const updateRelatorio = (req, res) => {
  const { id } = req.params;
  const { ModuloId, NumeroParticipantes, DataInicio, DataFim, Descricao } = req.body;
  const sql = `
  UPDATE Relatorios 
  SET 
    ModuloId = COALESCE(?, ModuloId), 
    NumeroParticipantes = COALESCE(?, NumeroParticipantes), 
    DataInicio = COALESCE(?, DataInicio), 
    DataFim = COALESCE(?, DataFim), 
    Descricao = COALESCE(?, Descricao) 
  WHERE id = ?`;

  executeWithRetry(sql, [ModuloId, NumeroParticipantes, DataInicio, DataFim, Descricao, id])
    .then(() => res.json({ message: "Relatório atualizado com sucesso" }))
    .catch(err => res.status(500).send(err));
};

const deleteRelatorio = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Relatorios WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Relatório deletado com sucesso" }))
    .catch(err => res.status(500).send(err));
};
module.exports = {
  getRelatorios,
  deleteRelatorio,
  updateRelatorio,
  createRelatorio,
  getRelatorioById
  // outras funções do controlador...
};