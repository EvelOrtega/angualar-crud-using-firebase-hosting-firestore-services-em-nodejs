const firebase = require("../db");
const Funcionario = require("../models/funcionario");
const fireStore = firebase.firestore();

const addFuncionario = async (req, res, next) => {
  try {
    const data = req.body;
    await fireStore.collection("funcionarios").doc().set(data);
    res.status(201).json({ message: "Registro feito com sucesso!" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllFuncionarios = async (req, res, next) => {
  try {
    const funcionarios = await fireStore.collection("funcionarios");
    const data = await funcionarios.get();
    const arr = [];
    if (data.empty) {
      res.status(200).json({ message: "Nenhum registro encontrado" });
    } else {
      let total = 0;
      data.forEach((item) => {
        const funcionario = new Funcionario(
          item.id,
          item.data().nomeCompleto,
          item.data().idade,
          item.data().contato,
          item.data().departamento
        );
        arr.push(funcionario);
        total = total + 1;
      });
      res.status(200).send(arr);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getFuncionario = async (req, res, next) => {
  try {
    const id = req.params.id;
    const funcionario = await fireStore.collection("funcionarios").doc(id);
    const data = await funcionario.get();
    if (!data.exists) {
      res.status(404).json({ message: "Registro não encontrado" });
    } else {
      res.status(200).json(data.data());
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateFuncionario = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const funcionario = await fireStore.collection("funcionarios").doc(id);
    await funcionario.update(data);
    res.status(204).json({ message: "Registro atualizado com sucesso" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteFuncionario = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("Deleting funcionario= %s", id);
    await fireStore.collection("funcionarios").doc(id).delete();
    res.status(204).json({ message: "Registro deletado com sucesso" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addFuncionario,
  getAllFuncionarios,
  getFuncionario,
  updateFuncionario,
  deleteFuncionario,
};
