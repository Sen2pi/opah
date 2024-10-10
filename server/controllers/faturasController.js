const { executeWithRetry } = require("../config/utilsDb");

const getFaturas = (req, res) => {
  const sql = "SELECT * FROM Faturas";
  executeWithRetry(sql, [])
    .then((results) => res.json(results))
    .catch((err) => res.status(500).send(err));
};

const getFaturaById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Faturas WHERE id = ?";
  executeWithRetry(sql, [id])
    .then((result) => res.json(result[0]))
    .catch((err) => res.status(500).send(err));
};

const createFatura = (req, res) => {
  const { NumeroFatura, NifVendedor, Descricao, DataHora, Valor } = req.body;
  const sql =
    "INSERT INTO Faturas (NumeroFatura, NifVendedor, Descricao, DataHora, Valor) VALUES (?, ?, ?, ?, ?)";
  executeWithRetry(sql, [NumeroFatura, NifVendedor, Descricao, DataHora, Valor])
    .then((result) => res.json({ id: result.insertId }))
    .catch((err) => res.status(500).send(err));
};

const updateFatura = (req, res) => {
  const { id } = req.params;
  const { NumeroFatura, NifVendedor, Descricao, DataHora, Valor } = req.body;
  const sql = `
  UPDATE Faturas 
  SET 
    NumeroFatura = COALESCE(?, NumeroFatura), 
    NifVendedor = COALESCE(?, NifVendedor), 
    Descricao = COALESCE(?, Descricao), 
    DataHora = COALESCE(?, DataHora), 
    Valor = COALESCE(?, Valor) 
  WHERE id = ?`;

  executeWithRetry(sql, [
    NumeroFatura,
    NifVendedor,
    Descricao,
    DataHora,
    Valor,
    id,
  ])
    .then(() => res.json({ message: "Fatura atualizada com sucesso" }))
    .catch((err) => res.status(500).send(err));
};

const deleteFatura = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Faturas WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Fatura deletada com sucesso" }))
    .catch((err) => res.status(500).send(err));
};
module.exports = {
  getFaturas,
  getFaturaById,
  deleteFatura,
  updateFatura,
  createFatura,
  // outras funções do controlador...
};
