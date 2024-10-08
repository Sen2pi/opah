const { executeWithRetry } = require("../config/utilsDb");

// Obter as últimas publicações
const getUltimasPublicacoes = (req, res) => {
  const sql = "SELECT * FROM Publicacoes ORDER BY DataHora DESC LIMIT 10";
  executeWithRetry(sql, [])
  .then((results) => res.json(results))
  .catch((err) => res.status(500).send(err));
};

const getPublicacoes = (req, res) => {
  const sql = "SELECT * FROM Publicacoes";
  executeWithRetry(sql, [])
    .then((results) => res.json(results))
    .catch((err) => res.status(500).send(err));
};

const getPublicacaoById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Publicacoes WHERE id = ?";
  executeWithRetry(sql, [id])
    .then((result) => res.json(result[0]))
    .catch((err) => res.status(500).send(err));
};

const createPublicacao = (req, res) => {
  const { Titulo, FotoOuVideo, Conteudo, DataHora, Local, Contacto } = req.body;
  const sql =
    "INSERT INTO Publicacoes (Titulo, FotoOuVideo, Conteudo, DataHora, Local, Contacto) VALUES (?, ?, ?, ?,?,?)";
  executeWithRetry(sql, [Titulo, FotoOuVideo, Conteudo, DataHora, Local, Contacto])
    .then((result) => res.json({ id: result.insertId }))
    .catch((err) => res.status(500).send(err));
};

const updatePublicacao = (req, res) => {
  const { id } = req.params;
  const { Titulo, FotoOuVideo, Conteudo, DataHora, Local, Contacto} = req.body;
  const sql =
    "UPDATE Publicacoes SET Titulo=?, FotoOuVideo=?, Conteudo=?, DataHora=?, Local=?, Contacto=? WHERE id = ?";
  executeWithRetry(sql, [Titulo, FotoOuVideo, Conteudo, DataHora, Local, Contacto, id])
    .then(() => res.json({ message: "Publicação atualizada com sucesso" }))
    .catch((err) => res.status(500).send(err));
};

const deletePublicacao = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Publicacoes WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Publicação deletada com sucesso" }))
    .catch((err) => res.status(500).send(err));
};
module.exports = {
  getPublicacaoById,
  getPublicacoes,
  createPublicacao,
  getUltimasPublicacoes,
  deletePublicacao,
  updatePublicacao
  // outras funções do controlador...
};