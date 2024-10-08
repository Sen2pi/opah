const { executeWithRetry } = require("../config/utilsDb");

// Obter as últimas publicações
exports.getUltimasPublicacoes = (req, res) => {
    const query = 'SELECT * FROM Publicacoes ORDER BY DataHora DESC LIMIT 10';
    executeWithRetry(query, [])
        .then(results => {
            if (Array.isArray(results) && results.length > 0) {
                res.json(results);
            } else {
                res.status(404).json({ message: "Nenhuma publicação encontrada" });
            }
        })
        .catch(err => {
            console.error('Erro ao buscar as últimas publicações:', err);
            res.status(500).json({ message: "Erro ao buscar as publicações" });
        });
};

exports.getPublicacoes = (req, res) => {
    const sql = "SELECT * FROM Publicacoes";
    executeWithRetry(sql, [])
      .then(results => res.json(results))
      .catch(err => res.status(500).send(err));
  };
  
  exports.getPublicacaoById = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM Publicacoes WHERE id = ?";
    executeWithRetry(sql, [id])
      .then(result => res.json(result[0]))
      .catch(err => res.status(500).send(err));
  };
  
  exports.createPublicacao = (req, res) => {
    const { Titulo, Descricao, DataPublicacao, UsuarioId } = req.body;
    const sql = "INSERT INTO Publicacoes (Titulo, Descricao, DataPublicacao, UsuarioId) VALUES (?, ?, ?, ?)";
    executeWithRetry(sql, [Titulo, Descricao, DataPublicacao, UsuarioId])
      .then(result => res.json({ id: result.insertId }))
      .catch(err => res.status(500).send(err));
  };
  
  exports.updatePublicacao = (req, res) => {
    const { id } = req.params;
    const { Titulo, Descricao, DataPublicacao, UsuarioId } = req.body;
    const sql = "UPDATE Publicacoes SET Titulo = ?, Descricao = ?, DataPublicacao = ?, UsuarioId = ? WHERE id = ?";
    executeWithRetry(sql, [Titulo, Descricao, DataPublicacao, UsuarioId, id])
      .then(() => res.json({ message: "Publicação atualizada com sucesso" }))
      .catch(err => res.status(500).send(err));
  };
  
  exports.deletePublicacao = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM Publicacoes WHERE id = ?";
    executeWithRetry(sql, [id])
      .then(() => res.json({ message: "Publicação deletada com sucesso" }))
      .catch(err => res.status(500).send(err));
  };
