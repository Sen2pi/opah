const { executeWithRetry } = require("../config/utilsDb");

// Obter todas as aulas
const getAulas = (req, res) => {
  const sql = "SELECT * FROM Aulas";
  executeWithRetry(sql, [])
    .then((results) => res.json(results))
    .catch((err) => res.status(500).send(err));
};

// Obter aula por ID
const getAulaById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Aulas WHERE id = ?";
  executeWithRetry(sql, [id])
    .then((result) => {
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ message: "Aula não encontrada" });
      }
    })
    .catch((err) => res.status(500).send(err));
};

// Criar nova aula
const createAula = (req, res) => {
  const {
    Tema,
    DataHora,
    Descricao,
    ModuloId,
    ProfessorId,
    Objectivo,
    Duracao,
  } = req.body;
  const sql =
    "INSERT INTO Aulas (Tema, DataHora, Descricao, ModuloId, ProfessorId, Objectivo, Duracao) VALUES (?,?, ?,?, ?, ?, ?)";
  executeWithRetry(sql, [
    Tema,
    DataHora,
    Descricao,
    ModuloId,
    ProfessorId,
    Objectivo,
    Duracao,
  ])
    .then((result) => res.json({ id: result.insertId }))
    .catch((err) => res.status(500).send(err));
};

// Atualizar aula
const updateAula = (req, res) => {
  const { id } = req.params;
  const {
    Tema,
    DataHora,
    Descricao,
    ModuloId,
    ProfessorId,
    Objectivo,
    Duracao,
  } = req.body;
  const sql = `
  UPDATE Aulas 
  SET 
    Tema = COALESCE(?, Tema), 
    DataHora = COALESCE(?, DataHora), 
    Descricao = COALESCE(?, Descricao), 
    ModuloId = COALESCE(?, ModuloId), 
    ProfessorId = COALESCE(?, ProfessorId), 
    Objectivo = COALESCE(?, Objectivo), 
    Duracao = COALESCE(?, Duracao) 
  WHERE id = ?`;
  executeWithRetry(sql, [
    Tema,
    DataHora,
    Descricao,
    ModuloId,
    ProfessorId,
    Objectivo,
    Duracao,
    id,
  ])
    .then(() => res.json({ message: "Aula atualizada com sucesso" }))
    .catch((err) => res.status(500).send(err));
};

// Deletar aula
const deleteAula = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Aulas WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Aula deletada com sucesso" }))
    .catch((err) => res.status(500).send(err));
};

// Obter aulas futuras (DataHora > agora + 1 hora)
const getAulasFuturas = (req, res) => {
  const sql = "SELECT * FROM Aulas WHERE DataHora > NOW()";
  console.log("Executing SQL query:", sql); // Log the SQL query
  executeWithRetry(sql, [])
    .then((results) => {
      console.log("Query results:", results); // Log the results
      if (results.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhuma aula futura encontrada" });
      }
      res.json(results);
    })
    .catch((err) => {
      console.error("Erro ao buscar aulas futuras:", err);
      res.status(500).json({ message: "Erro ao buscar aulas futuras" });
    });
};

module.exports = {
  getAulasFuturas,
  deleteAula,
  updateAula,
  createAula,
  getAulaById,
  getAulas,
};
