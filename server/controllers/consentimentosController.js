const { executeWithRetry } = require("../config/utilsDb");

const getConsentimentos = (req, res) => {
  const sql = "SELECT * FROM Consentimentos";
  executeWithRetry(sql, [])
    .then(results => res.json(results))
    .catch(err => res.status(500).send(err));
};

const getConsentimentoById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Consentimentos WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(result => res.json(result[0]))
    .catch(err => res.status(500).send(err));
};

const createConsentimento = (req, res) => {
  const { ConsentimentoImagem, ConsentimentoEducativo, ConsentimentoDados } = req.body;
  const sql = "INSERT INTO Consentimentos (  ConsentimentoImagem, ConsentimentoEducativo, ConsentimentoDados) VALUES ( ?, ?, ?)";
  executeWithRetry(sql, [ ConsentimentoImagem, ConsentimentoEducativo, ConsentimentoDados])
    .then(result => res.json({ id: result.insertId }))
    .catch(err => res.status(500).send(err));
};

const updateConsentimento = (req, res) => {
  const { id } = req.params;
  const {   ConsentimentoImagem, ConsentimentoEducativo, ConsentimentoDados } = req.body;
  const sql = `
  UPDATE Consentimentos 
  SET 
    ConsentimentoImagem = COALESCE(?, ConsentimentoImagem), 
    ConsentimentoEducativo = COALESCE(?, ConsentimentoEducativo), 
    ConsentimentoDados = COALESCE(?, ConsentimentoDados) 
  WHERE id = ?`;

  executeWithRetry(sql, [  ConsentimentoImagem, ConsentimentoEducativo, ConsentimentoDados, id])
    .then(() => res.json({ message: "Consentimento atualizado com sucesso" }))
    .catch(err => res.status(500).send(err));
};

const deleteConsentimento = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Consentimentos WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Consentimento deletado com sucesso" }))
    .catch(err => res.status(500).send(err));
};
module.exports = {
  deleteConsentimento,
  updateConsentimento,
  createConsentimento,
  getConsentimentoById,
  getConsentimentos
  // outras funções do controlador...
};