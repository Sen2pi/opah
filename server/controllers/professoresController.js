const { executeWithRetry } = require("../config/utilsDb");

const getProfessores = (req, res) => {
  const sql = "SELECT * FROM Professores";
  executeWithRetry(sql, [])
    .then((results) => res.json(results))
    .catch((err) => res.status(500).send(err));
};

const getProfessorById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Professores WHERE id = ?";
  executeWithRetry(sql, [id])
    .then((result) => res.json(result[0]))
    .catch((err) => res.status(500).send(err));
};

const createProfessor = (req, res) => {
  const { UsuarioId, Competencias, Certificacoes } = req.body;
  const sql =
    "INSERT INTO Professores (UsuarioId, Competencias, Certificacoes) VALUES (?, ?, ?)";
  executeWithRetry(sql, [UsuarioId, Competencias, Certificacoes])
    .then((result) => res.json({ id: result.insertId }))
    .catch((err) => res.status(500).send(err));
};

const updateProfessor = (req, res) => {
  const { id } = req.params;
  const { UsuarioId, Competencias, Certificacoes } = req.body;
  const sql = `
  UPDATE Professores 
  SET 
    UsuarioId = COALESCE(?, UsuarioId), 
    Competencias = COALESCE(?, Competencias), 
    Certificacoes = COALESCE(?, Certificacoes) 
  WHERE id = ?`;

  executeWithRetry(sql, [UsuarioId, Competencias, Certificacoes, id])
    .then(() => res.json({ message: "Professor atualizado com sucesso" }))
    .catch((err) => res.status(500).send(err));
};

const deleteProfessor = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Professores WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Professor deletado com sucesso" }))
    .catch((err) => res.status(500).send(err));
};
module.exports = {
  deleteProfessor,
  updateProfessor,
  createProfessor,
  getProfessorById,
  getProfessores,
  // outras funções do controlador...
};
