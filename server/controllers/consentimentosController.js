const { executeWithRetry } = require("../config/utilsDb");

exports.getConsentimentos = (req, res) => {
  const sql = "SELECT * FROM Consentimentos";
  executeWithRetry(sql, [])
    .then(results => res.json(results))
    .catch(err => res.status(500).send(err));
};

exports.getConsentimentoById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Consentimentos WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(result => res.json(result[0]))
    .catch(err => res.status(500).send(err));
};

exports.createConsentimento = (req, res) => {
  const { ConsentimentoImagem, ConsentimentoEducativo, ConsentimentoDados, AlunoId } = req.body;
  const sql = "INSERT INTO Consentimentos (ConsentimentoImagem, ConsentimentoEducativo, ConsentimentoDados, AlunoId) VALUES (?, ?, ?, ?)";
  executeWithRetry(sql, [ConsentimentoImagem, ConsentimentoEducativo, ConsentimentoDados, AlunoId])
    .then(result => res.json({ id: result.insertId }))
    .catch(err => res.status(500).send(err));
};

exports.updateConsentimento = (req, res) => {
  const { id } = req.params;
  const { ConsentimentoImagem, ConsentimentoEducativo, ConsentimentoDados, AlunoId } = req.body;
  const sql = "UPDATE Consentimentos SET ConsentimentoImagem = ?, ConsentimentoEducativo = ?, ConsentimentoDados = ?, AlunoId = ? WHERE id = ?";
  executeWithRetry(sql, [ConsentimentoImagem, ConsentimentoEducativo, ConsentimentoDados, AlunoId, id])
    .then(() => res.json({ message: "Consentimento atualizado com sucesso" }))
    .catch(err => res.status(500).send(err));
};

exports.deleteConsentimento = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Consentimentos WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Consentimento deletado com sucesso" }))
    .catch(err => res.status(500).send(err));
};
