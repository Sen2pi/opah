// controllers/publicacoesController.js
const connection = require('../config/db'); // Importar a conexão do banco de dados

const getUltimasPublicacoes = (req, res) => {
    const query = 'SELECT * FROM Publicacoes ORDER BY DataHora DESC LIMIT 10';

    connection.query(query, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Erro ao buscar as publicações" });
        }
        
        // Verifique se os resultados são um array antes de retornar
        if (Array.isArray(results)) {
            res.json(results); // Retornar resultados em formato JSON
        } else {
            res.status(500).json({ message: "Formato de dados inesperado" });
        }
    });
};

module.exports = { getUltimasPublicacoes };
