const { executeWithRetry } = require("../config/utilsDb");

const getBalancetes = (req, res) => {
  const sql = "SELECT * FROM Balancete";
  executeWithRetry(sql, [])
    .then((results) => res.json(results))
    .catch((err) => res.status(500).send(err));
};

const getBalanceteById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Balancete WHERE id = ?";
  executeWithRetry(sql, [id])
    .then((result) => res.json(result[0]))
    .catch((err) => res.status(500).send(err));
};

const createBalancete = (req, res) => {
  const { DataHora, montante, entrada_saida, fatura } = req.body; // Match the case
  const sql =
    "INSERT INTO Balancete (DataHora, Montante, EntradaSaida, FaturaId) VALUES (?, ?, ?, ?)";
  executeWithRetry(sql, [DataHora, montante, entrada_saida, fatura])
    .then((result) => res.json({ id: result.insertId }))
    .catch((err) => res.status(500).send(err));
};

const updateBalancete = (req, res) => {
  const { id } = req.params;
  const { DataHora, Montante, EntradaSaida, FaturaId } = req.body;
  const sql = `
  UPDATE Balancete 
  SET 
    DataHora = COALESCE(?,DataHora), 
    Montante = COALESCE(?, Montante), 
    EntradaSaida = COALESCE(?, EntradaSaida), 
    FaturaId = COALESCE(?, FaturaId) 
  WHERE id = ?`;

  executeWithRetry(sql, [DataHora, Montante, EntradaSaida, FaturaId, id])
    .then(() => res.json({ message: "Balancete atualizado com sucesso" }))
    .catch((err) => res.status(500).send(err));
};

const deleteBalancete = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Balancete WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Balancete deletado com sucesso" }))
    .catch((err) => res.status(500).send(err));
};

module.exports = {
  deleteBalancete,
  updateBalancete,
  createBalancete,
  getBalanceteById,
  getBalancetes,
  // outras funções do controlador...
};
