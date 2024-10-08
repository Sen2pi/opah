const { executeWithRetry } = require("../config/utilsDb");
exports.getAlunos = (req, res) => {
  const sql = "SELECT * FROM Alunos";
  executeWithRetry(sql, [])
    .then(results => res.json(results))
    .catch(err => res.status(500).send(err));
};

exports.getAlunoById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Alunos WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(result => res.json(result[0]))
    .catch(err => res.status(500).send(err));
};

exports.createAluno = (req, res) => {
  const { Nome, NIF, NumeroUtente, Telefone, AulaId, Presenca } = req.body;
  const sql = "INSERT INTO Alunos (Nome, NIF, NumeroUtente, Telefone, AulaId, Presenca) VALUES (?, ?, ?, ?, ?, ?)";
  executeWithRetry(sql, [Nome, NIF, NumeroUtente, Telefone, AulaId, Presenca])
    .then(result => res.json({ id: result.insertId }))
    .catch(err => res.status(500).send(err));
};

exports.updateAluno = (req, res) => {
  const { id } = req.params;
  const { Nome, NIF, NumeroUtente, Telefone, AulaId, Presenca } = req.body;
  const sql = "UPDATE Alunos SET Nome = ?, NIF = ?, NumeroUtente = ?, Telefone = ?, AulaId = ?, Presenca = ? WHERE id = ?";
  executeWithRetry(sql, [Nome, NIF, NumeroUtente, Telefone, AulaId, Presenca, id])
    .then(() => res.json({ message: "Aluno atualizado com sucesso" }))
    .catch(err => res.status(500).send(err));
};

exports.deleteAluno = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Alunos WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Aluno deletado com sucesso" }))
    .catch(err => res.status(500).send(err));
};
