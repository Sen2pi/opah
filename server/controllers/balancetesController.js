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
const getBalanceteCalculations = (req, res) => {
  const { year, month } = req.params;

  const sqlEntradasMes = `
    SELECT SUM(Montante) AS totalEntradasMes 
    FROM Balancete 
    WHERE EntradaSaida = 'Entrada' AND MONTH(DataHora) = ? AND YEAR(DataHora) = ?`;

  const sqlSaidasMes = `
    SELECT SUM(Montante) AS totalSaidasMes 
    FROM Balancete 
    WHERE EntradaSaida = 'Saida' AND MONTH(DataHora) = ? AND YEAR(DataHora) = ?`;

  const sqlEntradasAno = `
    SELECT SUM(Montante) AS totalEntradasAno 
    FROM Balancete 
    WHERE EntradaSaida = 'Entrada' AND YEAR(DataHora) = ?`;

  const sqlSaidasAno = `
    SELECT SUM(Montante) AS totalSaidasAno 
    FROM Balancete 
    WHERE EntradaSaida = 'Saida' AND YEAR(DataHora) = ?`;

  Promise.all([
    executeWithRetry(sqlEntradasMes, [month, year]),
    executeWithRetry(sqlSaidasMes, [month, year]),
    executeWithRetry(sqlEntradasAno, [year]),
    executeWithRetry(sqlSaidasAno, [year]),
  ])
    .then(([entradasMes, saidasMes, entradasAno, saidasAno]) => {
      const totalEntradasMes = entradasMes[0]?.totalEntradasMes || 0;
      const totalSaidasMes = saidasMes[0]?.totalSaidasMes || 0;
      const totalEntradasAno = entradasAno[0]?.totalEntradasAno || 0;
      const totalSaidasAno = saidasAno[0]?.totalSaidasAno || 0;

      const totalMes = totalEntradasMes - totalSaidasMes;
      const totalAno = totalEntradasAno - totalSaidasAno;

      res.json({
        totalEntradasMes,
        totalSaidasMes,
        totalMes,
        totalEntradasAno,
        totalSaidasAno,
        totalAno,
      });
    })
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
  getBalanceteCalculations,
  // outras funções do controlador...
};
