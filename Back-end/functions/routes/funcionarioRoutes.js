const express = require("express");
const {
  addFuncionario,
  getAllFuncionarios,
  getFuncionario,
  updateFuncionario,
  deleteFuncionario,
} = require("../controllers/funcionarioController");

const router = express.Router();

// http://localhost:3000/api/funcionario
router.post("/funcionario", addFuncionario);

// http://localhost:3000/api/funcionarios
router.get("/funcionarios", getAllFuncionarios);

// http://localhost:3000/api/funcionario/xxxx_funcionario_id
router.get("/funcionario/:id", getFuncionario);

// http://localhost:3000/api/funcionario/xxxx_funcionario_id
router.put("/funcionario/:id", updateFuncionario);

// http://localhost:3000/api/funcionario/xxxx_funcionario_id
router.delete("/funcionario/:id", deleteFuncionario);

module.exports = {
  routes: router,
};
