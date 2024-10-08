const { executeWithRetry } = require("../config/utilsDb");

exports.getBalancetes = (req, res) => {
  const sql = "SELECT * FROM Balancete";
  executeWithRetry(sql, [])
    .then(results => res.json(results))
    .catch(err => res.status(500).send(err));
};

exports.getBalanceteById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Balancete WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(result => res.json(result[0]))
    .catch(err => res.status(500).send(err));
};

exports.createBalancete = (req, res) => {
  const { Descricao, ValorEntrada, ValorSaida, DataBalancete } = req.body;
  const sql = "INSERT INTO Balancete (Descricao, ValorEntrada, ValorSaida, DataBalancete) VALUES (?, ?, ?, ?)";
  executeWithRetry(sql, [Descricao, ValorEntrada, ValorSaida, DataBalancete])
    .then(result => res.json({ id: result.insertId }))
    .catch(err => res.status(500).send(err));
};

exports.updateBalancete = (req, res) => {
  const { id } = req.params;
  const { Descricao, ValorEntrada, ValorSaida, DataBalancete } = req.body;
  const sql = "UPDATE Balancete SET Descricao = ?, ValorEntrada = ?, ValorSaida = ?, DataBalancete = ? WHERE id = ?";
  executeWithRetry(sql, [Descricao, ValorEntrada, ValorSaida, DataBalancete, id])
    .then(() => res.json({ message: "Balancete atualizado com sucesso" }))
    .catch(err => res.status(500).send(err));
};

exports.deleteBalancete = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Balancete WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Balancete deletado com sucesso" }))
    .catch(err => res.status(500).send(err));
};
