const express = require("express");
const router = express.Router();

// Importar os controladores
const faturasController = require("../controllers/faturasController");
const balanceteController = require("../controllers/balancetesController");
const modulosController = require("../controllers/modulosController");
const relatoriosController = require("../controllers/relatoriosController");
const consentimentosController = require("../controllers/consentimentosController");
const usuariosController = require("../controllers/usuariosController");
const aulasController = require("../controllers/aulasController");
const professoresController = require("../controllers/professoresController");
const alunosController = require("../controllers/alunosController");
const publicacoesController = require("../controllers/publicacoesController");


// Rotas para Faturas
router.get("/faturas", faturasController.getFaturas);
router.get("/faturas/:id", faturasController.getFaturaById);
router.post("/faturas", faturasController.createFatura);
router.put("/faturas/:id", faturasController.updateFatura);
router.delete("/faturas/:id", faturasController.deleteFatura);

// Rotas para Balancete
router.get("/balancete", balanceteController.getBalancetes);
router.get("/balancete/:id", balanceteController.getBalanceteById);
router.post("/balancete", balanceteController.createBalancete);
router.put("/balancete/:id", balanceteController.updateBalancete);
router.delete("/balancete/:id", balanceteController.deleteBalancete);

// Rotas para Módulos
router.get("/modulos", modulosController.getModulos);
router.get("/modulos/:id", modulosController.getModuloById);
router.post("/modulos", modulosController.createModulo);
router.put("/modulos/:id", modulosController.updateModulo);
router.delete("/modulos/:id", modulosController.deleteModulo);

// Rotas para Relatórios
router.get("/relatorios", relatoriosController.getRelatorios);
router.get("/relatorios/:id", relatoriosController.getRelatorioById);
router.post("/relatorios", relatoriosController.createRelatorio);
router.put("/relatorios/:id", relatoriosController.updateRelatorio);
router.delete("/relatorios/:id", relatoriosController.deleteRelatorio);

// Rotas para Consentimentos
router.get("/consentimentos", consentimentosController.getConsentimentos);
router.get("/consentimentos/:id", consentimentosController.getConsentimentoById);
router.post("/consentimentos", consentimentosController.createConsentimento);
router.put("/consentimentos/:id", consentimentosController.updateConsentimento);
router.delete("/consentimentos/:id", consentimentosController.deleteConsentimento);

// Rotas para Usuários
router.get("/usuarios", usuariosController.getUsuarios);
router.get("/usuarios/:id", usuariosController.getUsuarioById);
router.post("/usuarios", usuariosController.createUsuario);
router.put("/usuarios/:id", usuariosController.updateUsuario);
router.delete("/usuarios/:id", usuariosController.deleteUsuario);

// Rotas para Aulas
router.get("/aulas", aulasController.getAulas);
router.get("/aulas/:id", aulasController.getAulaById);
router.post("/aulas", aulasController.createAula);
router.put("/aulas/:id", aulasController.updateAula);
router.delete("/aulas/:id", aulasController.deleteAula);
router.get("/futuras", aulasController.getAulasFuturas);

// Rotas para Professores
router.get("/professores", professoresController.getProfessores);
router.get("/professores/:id", professoresController.getProfessorById);
router.post("/professores", professoresController.createProfessor);
router.put("/professores/:id", professoresController.updateProfessor);
router.delete("/professores/:id", professoresController.deleteProfessor);

// Rotas para Alunos
router.get("/alunos", alunosController.getAlunos);
router.get("/alunos/:id", alunosController.getAlunoById);
router.post("/alunos", alunosController.createAluno);
router.put("/alunos/:id", alunosController.updateAluno);
router.delete("/alunos/:id", alunosController.deleteAluno);

// Rotas para Publicações
router.get("/publicacoes", publicacoesController.getPublicacoes);
router.get("/publicacoes/:id", publicacoesController.getPublicacaoById);
router.post("/publicacoes", publicacoesController.createPublicacao);
router.put("/publicacoes/:id", publicacoesController.updatePublicacao);
router.delete("/publicacoes/:id", publicacoesController.deletePublicacao);
// Rota para obter as últimas publicações
router.get('/ultimas', publicacoesController.getUltimasPublicacoes);

module.exports = router;
