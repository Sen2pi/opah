const { executeWithRetry } = require("../config/utilsDb");

// Obter todas as aulas
exports.getAulas = (req, res) => {
  const sql = "SELECT * FROM Aulas";
  executeWithRetry(sql, [])
    .then(results => res.json(results))
    .catch(err => res.status(500).send(err));
};

// Obter aula por ID
exports.getAulaById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Aulas WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(result => {
      if (result.length > 0) {
        res.json(result[0]);
      } else {
        res.status(404).json({ message: "Aula não encontrada" });
      }
    })
    .catch(err => res.status(500).send(err));
};

// Criar nova aula
exports.createAula = (req, res) => {
  const { Tema, DataHora, Descricao, ModuloId, ProfessorId } = req.body;
  const sql = "INSERT INTO Aulas (Tema, DataHora, Descricao, ModuloId, ProfessorId) VALUES (?, ?, ?, ?, ?)";
  executeWithRetry(sql, [Tema, DataHora, Descricao, ModuloId, ProfessorId])
    .then(result => res.json({ id: result.insertId }))
    .catch(err => res.status(500).send(err));
};

// Atualizar aula
exports.updateAula = (req, res) => {
  const { id } = req.params;
  const { Tema, DataHora, Descricao, ModuloId, ProfessorId } = req.body;
  const sql = "UPDATE Aulas SET Tema = ?, DataHora = ?, Descricao = ?, ModuloId = ?, ProfessorId = ? WHERE id = ?";
  executeWithRetry(sql, [Tema, DataHora, Descricao, ModuloId, ProfessorId, id])
    .then(() => res.json({ message: "Aula atualizada com sucesso" }))
    .catch(err => res.status(500).send(err));
};

// Deletar aula
exports.deleteAula = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Aulas WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Aula deletada com sucesso" }))
    .catch(err => res.status(500).send(err));
};

// Obter aulas futuras (DataHora > agora + 1 hora)
exports.getAulasFuturas = (req, res) => {
  const sql = "SELECT * FROM Aulas WHERE DataHora > NOW() + INTERVAL 1 HOUR";
  executeWithRetry(sql, [])
    .then(results => {
      if (Array.isArray(results) && results.length > 0) {
        res.json(results);
      } else {
        res.status(404).json({ message: "Nenhuma aula futura encontrada" });
      }
    })
    .catch(err => {
      console.error('Erro ao buscar aulas futuras:', err);
      res.status(500).json({ message: "Erro ao buscar aulas futuras" });
    });
};
