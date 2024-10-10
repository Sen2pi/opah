const { executeWithRetry } = require("../config/utilsDb");
const getAlunos = (req, res) => {
  const sql = "SELECT * FROM Alunos";
  executeWithRetry(sql, [])
    .then((results) => res.json(results))
    .catch((err) => res.status(500).send(err));
};

const getAlunoById = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM Alunos WHERE id = ?";
  executeWithRetry(sql, [id])
    .then((result) => res.json(result[0]))
    .catch((err) => res.status(500).send(err));
};

const createAluno = (req, res) => {
  const {
    Nome,
    NIF,
    NumeroUtente,
    Telefone,
    Endereco,
    ContactoEmergencia,
    AulaId,
    ConsentimentoInformado,
    Presenca,
    NomeEncEdu,
    ProfissaoEncEdu,
    EmailEncEdu,
    TelEncEdu,
    EscolaridadeEncEdu,
    GrauParentescoEncEdu,
    Escola,
    DoencasCronicas,
    ConhecimentoPrograma,
    IdParaConsentimentos,
  } = req.body;
  const sql =
    "INSERT INTO Alunos (Nome, NIF, NumeroUtente, Telefone, Endereco, ContactoEmergencia ,AulaId,ConsentimentoInformado, Presenca,  NomeEncEdu , ProfissaoEncEdu , EmailEncEdu ,TelEncEdu , EscolaridadeEncEdu , GrauParentescoEncEdu , Escola , DoencasCronicas ,ConhecimentoPrograma , IdParaConsentimentos) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  executeWithRetry(sql, [
    Nome,
    NIF,
    NumeroUtente,
    Telefone,
    Endereco,
    ContactoEmergencia,
    AulaId,
    ConsentimentoInformado,
    Presenca,
    NomeEncEdu,
    ProfissaoEncEdu,
    EmailEncEdu,
    TelEncEdu,
    EscolaridadeEncEdu,
    GrauParentescoEncEdu,
    Escola,
    DoencasCronicas,
    ConhecimentoPrograma,
    IdParaConsentimentos,
  ])
    .then((result) => res.json({ id: result.insertId }))
    .catch((err) => res.status(500).send(err));
};

const updateAluno = (req, res) => {
  const { id } = req.params;
  const {
    Nome,
    NIF,
    NumeroUtente,
    Telefone,
    Endereco,
    ContactoEmergencia,
    AulaId,
    ConsentimentoInformado,
    Presenca,
    NomeEncEdu,
    ProfissaoEncEdu,
    EmailEncEdu,
    TelEncEdu,
    EscolaridadeEncEdu,
    GrauParentescoEncEdu,
    Escola,
    DoencasCronicas,
    ConhecimentoPrograma,
    IdParaConsentimentos,
  } = req.body;
  const sql = `
  UPDATE Alunos 
  SET 
    Nome = COALESCE(?, Nome), 
    NIF = COALESCE(?, NIF), 
    NumeroUtente = COALESCE(?, NumeroUtente), 
    Telefone = COALESCE(?, Telefone), 
    Endereco = COALESCE(?, Endereco), 
    ContactoEmergencia = COALESCE(?, ContactoEmergencia), 
    AulaId = COALESCE(?, AulaId), 
    ConsentimentoInformado = COALESCE(?, ConsentimentoInformado), 
    Presenca = COALESCE(?, Presenca), 
    NomeEncEdu = COALESCE(?, NomeEncEdu), 
    ProfissaoEncEdu = COALESCE(?, ProfissaoEncEdu), 
    EmailEncEdu = COALESCE(?, EmailEncEdu), 
    TelEncEdu = COALESCE(?, TelEncEdu), 
    EscolaridadeEncEdu = COALESCE(?, EscolaridadeEncEdu), 
    GrauParentescoEncEdu = COALESCE(?, GrauParentescoEncEdu), 
    Escola = COALESCE(?, Escola), 
    DoencasCronicas = COALESCE(?, DoencasCronicas), 
    ConhecimentoPrograma = COALESCE(?, ConhecimentoPrograma) 
  WHERE id = ?`;
  executeWithRetry(sql, [
    Nome,
    NIF,
    NumeroUtente,
    Telefone,
    Endereco,
    ContactoEmergencia,
    AulaId,
    ConsentimentoInformado,
    Presenca,
    NomeEncEdu,
    ProfissaoEncEdu,
    EmailEncEdu,
    TelEncEdu,
    EscolaridadeEncEdu,
    GrauParentescoEncEdu,
    Escola,
    DoencasCronicas,
    ConhecimentoPrograma,
    IdParaConsentimentos,
    id,
  ])
    .then(() => res.json({ message: "Aluno atualizado com sucesso" }))
    .catch((err) => res.status(500).send(err));
};

const deleteAluno = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Alunos WHERE id = ?";
  executeWithRetry(sql, [id])
    .then(() => res.json({ message: "Aluno deletado com sucesso" }))
    .catch((err) => res.status(500).send(err));
};
module.exports = {
  deleteAluno,
  updateAluno,
  createAluno,
  getAlunoById,
  getAlunos,
  // outras funções do controlador...
};
