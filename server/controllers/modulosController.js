const { executeWithRetry } = require("../config/utilsDb");

const getModulos = (req, res) => {
  const sql = "SELECT * FROM Modulos";
  executeWithRetry(sql, [])
    .then((results) => res.json(results))
    .catch((err) => res.status(500).send(err));
};

const getModuloById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Modulos WHERE id = ?";
  executeWithRetry(sql, [id])
    .then((result) => res.json(result[0]))
    .catch((err) => res.status(500).send(err));
};
const getModulosByProfessorId = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Modulos WHERE ProfessorId = ?";
  executeWithRetry(sql, [id])
    .then((result) => res.json(result))
    .catch((err) => res.status(500).send(err));
};
const createModulo = (req, res) => {
  const { Nome, Descricao, ProfessorId } = req.body;
  const sql = "INSERT INTO Modulos (Nome, Descricao, ProfessorId) VALUES (?, ?, ?)";
  executeWithRetry(sql, [Nome, Descricao, ProfessorId])
    .then((result) => res.json({ id: result.insertId }))
    .catch((err) => res.status(500).send(err));
};

const updateModulo = (req, res) => {
  const { id } = req.params;
  const { Nome, Descricao, ProfessorId } = req.body;
  const sql = `
  UPDATE Modulos 
  SET 
    Nome = COALESCE(?, Nome), 
    Descricao = COALESCE(?, Descricao) , ProfessorId = COALESCE(?, ProfessorId) 
  WHERE id = ?`;

  executeWithRetry(sql, [Nome, Descricao, ProfessorId, id])
    .then(() => res.json({ message: "Módulo atualizado com sucesso" }))
    .catch((err) => res.status(500).send(err));
};

const deleteModulo = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Modulos WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Módulo deletado com sucesso" }))
    .catch((err) => res.status(500).send(err));
};
module.exports = {
  deleteModulo,
  updateModulo,
  createModulo,
  getModuloById,
  getModulosByProfessorId,
  getModulos,
  // outras funções do controlador...
};
